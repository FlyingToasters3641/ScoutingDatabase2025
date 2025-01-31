import { useState } from "react";
import axios from 'axios';
import { Container, Row, Col } from "react-bootstrap";
import { APP_DATABASE_URL, TBA_DATABASE_URL, TBA_KEY } from "../../constant/constant";
import "./Events.css";

const Eventimport = () => {
    const [eventkey, setEventkey] = useState(""); // debug??, remove once working??
    const [eventDetails, setEventDetails] = useState(""); // debug, remove once working
    const [eventMatches, setEventMatches] = useState(""); // debug, remove once working
    const [eventTeams, setEventTeams] = useState(""); // debug, remove once working
    const [eventId, setEventID] = useState(""); // debug, remove once working

    let frcTbaEvent = [];
    let frcTbaMatchList = [];
    let frcTbaTeams = [];

    
    async function handleSubmit(event) {
        event.preventDefault();
        // alert(`Event Key entered: ${eventkey}`);

        // ############################################################
        // Get event details from TBA

        // /event/{event_key}
        const getEventData = axios.get(`${TBA_DATABASE_URL}/event/${eventkey}`, {
            headers: {
              'X-TBA-Auth-Key': `${TBA_KEY}`,
              'accept': 'application/json'
            }
          })
        .then(response => {
            frcTbaEvent = response.data;
            setEventDetails(frcTbaEvent);  // debug, remove once working
            // alert("getEventData:\n"+JSON.stringify(frcTbaEvent));

        })
        .catch(error => console.error('Error fetching data:', error))
        .finally(console.log("TBA: Event Details collected"));

        // Get matches at event from TBA
        // /event/{event_key}/matches/simple
        const getEventMatchData = axios.get(`${TBA_DATABASE_URL}/event/${eventkey}/matches/simple`, {
            headers: {
              'X-TBA-Auth-Key': `${TBA_KEY}`,
              'accept': 'application/json'
            }
          })
        .then(response => {
            frcTbaMatchList = response.data;
            setEventMatches(response.data); // debug, remove once working
            // alert("getEventMatchData:\n"+JSON.stringify(frcTbaMatchList));
        })
        .catch(error => console.error('Error fetching data:', error))
        .finally(console.log("TBA: Event Matches collected"));

        // Get teams at event from TBA
        // /event/{event_key}/teams
        const getEventTeamsData = axios.get(`${TBA_DATABASE_URL}/event/${eventkey}/teams`, {
            headers: {
              'X-TBA-Auth-Key': `${TBA_KEY}`,
              'accept': 'application/json'
            }
          })
        .then(response => {
            frcTbaTeams = response.data;
            setEventTeams(response.data) // debug, remove once working
            // alert("getEventTeamsData:\n"+JSON.stringify(frcTbaTeams)); // debug, remove once working
        })
        .catch(error => console.error('Error fetching data:', error))
        .finally(console.log("TBA: Event Teams collected"));

        // Allow all the TBA calls to execute in parallel but complete before continuing 
        await getEventData;
        await getEventMatchData;
        await getEventTeamsData;

        // alert(JSON.stringify(ftcEvent));

        // Done with TBA data collection
        console.log("TBA Info collected");


        // ############################################################
        // Now Save the event information to our database

        // Save the event to the database and save the event ID for future use
        await axios.post(`${APP_DATABASE_URL}/events`, 
            {
                "name": frcTbaEvent.name, 
                "key": frcTbaEvent.key
            }, 
            { 
                headers: {'Content-Type': 'application/json'}
            }
        )
        .then(response => {
            frcTbaEvent.id = response.data.id;
            setEventID(frcTbaEvent.id); // debug, remove once working
            // alert("here"); // debug, remove once working
            // alert("ftcEvent.id:\n"+JSON.stringify(frcTbaEvent)); // debug, remove once working
        })
        .catch(error => console.error('Error saving data:', error));


        for (const match of frcTbaMatchList) {
            console.log(match);
            await axios.post(`${APP_DATABASE_URL}/match`, 
                {
                    "matchNumber": match.match_number,
                    "redOneTeamNumber": match.alliances.red.team_keys[0].substring(3),
                    "redTwoTeamNumber": match.alliances.red.team_keys[1].substring(3),
                    "redThreeTeamNumber": match.alliances.red.team_keys[2].substring(3),
                    "blueOneTeamNumber": match.alliances.blue.team_keys[0].substring(3),
                    "blueTwoTeamNumber": match.alliances.blue.team_keys[1].substring(3),
                    "blueThreeTeamNumber": match.alliances.blue.team_keys[2].substring(3),
                    "redScore": "0",
                    "blueScore": "0",
                    "redRankingPoints": 0,
                    "blueRankingPoints": 0,
                    "matchKey": match.key,
                    "event_id": frcTbaEvent.id
                }, 
                { 
                    headers: { 'Content-Type': 'application/json'}
                }
            )
            .then(console.log("Match added: " + match.match_number))   
            .catch(error => console.error('Error saving data:', error));
        }
        console.log("Matches added");





        



        // // Get teams at event from TBA
        // // /event/{event_key}/teams
        // await axios.get(`${TBA_DATABASE_URL}/event/${eventkey}/teams`, {
        //     headers: {
        //       'X-TBA-Auth-Key': `${TBA_KEY}`,
        //       'accept': 'application/json'
        //     }
        //   })
        // .then(response => setEventTeams(response.data))
        // .catch(error => console.error('Error fetching data:', error));


    //     // Get matches at event from TBA
    //     // /event/{event_key}/matches
    //     axios.get(`${TBA_DATABASE_URL}/event/${eventkey}/matches`, {
    //         headers: {
    //           'X-TBA-Auth-Key': `${TBA_KEY}`,
    //           'accept': 'application/json'
    //         }
    //       })
    //     .then(response => setEventMatches(response.data))
    //     .catch(error => console.error('Error fetching data:', error));

    //     // Get matches at event from TBA
    //     // /event/{event_key}/matches/simple
    //     axios.get(`${TBA_DATABASE_URL}/event/${eventkey}/matches/simple`, {
    //         headers: {
    //           'X-TBA-Auth-Key': `${TBA_KEY}`,
    //           'accept': 'application/json'
    //         }
    //       })
    //     .then(response => setEventMatchesSimple(response.data))
    //     .catch(error => console.error('Error fetching data:', error));
    }



    
    return (
        <Container>
            <Row>
                <Col><h1>Event Import</h1></Col>
                <hr></hr>
            </Row>
            <Row>
                <Col>
                    <h3>Import an Event from <a href="https://www.thebluealliance.com/" target="_blank" rel="noopener noreferrer">The Blue Alliance</a> using an Event Key:</h3>
                    <form onSubmit={handleSubmit}>
                        <label>Event Key:
                            <input 
                                type="text" 
                                value={eventkey}
                                onChange={(e) => setEventkey(e.target.value)}
                            />
                        </label>
                        <input className="btn btn-primary" type="submit" value="Submit"/>
                    </form>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>Event Key:{eventkey}|{eventDetails.name}|</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>eventId:<br></br><textarea value={eventId} className="resizable-textarea" /></p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>Event Detail:<br></br><textarea value={JSON.stringify(eventDetails)} className="resizable-textarea" /></p>
                    <p>Event Matches:<br></br><textarea value={JSON.stringify(eventMatches)} className="resizable-textarea" /></p>
                    <p>Event Teams:<br></br><textarea value={JSON.stringify(eventTeams)} className="resizable-textarea" /></p>
                    
                </Col>
            </Row>
        </Container>
    );

}

export default Eventimport;
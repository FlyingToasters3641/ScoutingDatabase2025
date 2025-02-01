import { useState } from "react";
import axios from 'axios';
import { Container, Row, Col } from "react-bootstrap";
import { APP_DATABASE_URL, TBA_DATABASE_URL, TBA_KEY } from "../../constant/constant";
import "./Events.css";

const Eventimport = () => {
    const [eventkey, setEventkey] = useState("2024milac");
    const [eventDetails, setEventDetails] = useState(""); // debug, remove once working
    const [eventMatches, setEventMatches] = useState(""); // debug, remove once working
    const [eventTeams, setEventTeams] = useState(""); // debug, remove once working
    const [eventId, setEventID] = useState(""); // debug, remove once working

    let frcTbaEvent = [];
    let frcTbaMatchList = [];
    let frcTbaTeamsList = [];

    
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
            frcTbaTeamsList = response.data;
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

        // Save the event to the database and keep the event ID for future use
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
            frcTbaEvent.event_id = response.data.id;
            setEventID(frcTbaEvent.event_id); // debug, remove once working
            // alert("here"); // debug, remove once working
            //alert("ftcEvent.id:\n"+JSON.stringify(frcTbaEvent)); // debug, remove once working
        })
        .catch(error => console.error('Error saving data:', error));


        // Save the matches to the database
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
                    "event_id": frcTbaEvent.event_id
                }, 
                { 
                    headers: { 'Content-Type': 'application/json'}
                }
            )
            .then(console.log("Match added: " + match.match_number))   
            .catch(error => console.error('Error saving data:', error));
        }
        console.log("Matches added");


        // TODO: Save the teams to the database
        for (const team of frcTbaTeamsList) {
            console.log(team);
            await axios.get(`${APP_DATABASE_URL}/teams/number/${team.team_number}`)
            // .then(response => console.log(response.data));
            .then(response => {
                if (response.data.length <= 0) {
                    axios.post(`${APP_DATABASE_URL}/teams`,
                        {
                            "teamNumber": team.team_number,
                            "nickname": team.nickname,
                            "city": team.city,
                            "state_prov": team.state_prov,
                            "country": team.country
                        },
                        {
                            headers: { 'Content-Type': 'application/json'}
                        }
                    )
                    .then(postresponse => {
                        console.log(postresponse.data)
                        // team.team_id = postresponse.data[0].id;
                        // console.log("New team_id added:" + team.team_id)
                    })
                    .catch(error => console.error('Error fetching data:', error))
                }
                else {
                    team.team_id = response.data[0].id;
                    console.log("pre team_id added:" + team.team_id)
                }

            });
            


            // // Enter event_id and tean_id to the EventTeam Database
            // await axios.post(`${APP_DATABASE_URL}/eventteams`,
            //     {
            //         "event_id": frcTbaEvent.event_id ,
            //         "team_id": team.team_id
            //     },
            //     {
            //         headers: { 'Content-Type': 'application/json'}
            //     }
            // )
            // .then(console.log("eventTable updated for the team"))
            // .catch(error => console.error('Error fetching data:', error));

           
        }
    
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
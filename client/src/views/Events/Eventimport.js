import { useState } from "react";
import axios from 'axios';
import { Container, Row, Col } from "react-bootstrap";
import { APP_DATABASE_URL, TBA_DATABASE_URL, TBA_KEY } from "../../constant/constant";
import "./Events.css";

const Eventimport = () => {
    const [eventkey, setEventkey] = useState("");
    const [eventTeams, setEventTeams] = useState("");
    const [eventMatches, setEventMatches] = useState("");


    const [eventDetails, setEventDetails] = useState("");
    const [eventId, setEventID] = useState("");

    
    async function handleSubmit(event) {
        event.preventDefault();
        // alert(`Event Key entered: ${eventkey}`);

        // ############################################################
        // Get event details from TBA
        // /event/{event_key}
        await axios.get(`${TBA_DATABASE_URL}/event/${eventkey}`, {
            headers: {
              'X-TBA-Auth-Key': `${TBA_KEY}`,
              'accept': 'application/json'
            }
          })
        .then(response => setEventDetails(response.data))
        .catch(error => console.error('Error fetching data:', error));

        // Save the event to the database
        await axios.post(
            `${APP_DATABASE_URL}/events`, 
            {
                name: `${event.name}`, 
                key: `${event.key}`
            }, 
            { 
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        .then(response => setEventID(response.data.id))
        .catch(error => console.error('Error saving data:', error));


        // ############################################################
        // Get matches at event from TBA
        // /event/{event_key}/matches/simple
        await axios.get(`${TBA_DATABASE_URL}/event/${eventkey}/matches/simple`, {
            headers: {
              'X-TBA-Auth-Key': `${TBA_KEY}`,
              'accept': 'application/json'
            }
          })
        .then(response => setEventMatches(response.data))
        .catch(error => console.error('Error fetching data:', error));

        console.log("Event Matches", eventMatches);

        // Save the matches to the database
        // eventMatches.forEach(match => {
        //     console.log("Match saved", match.key)
            // axios.post(`${APP_DATABASE_URL}/matches`, 
            //     {
            //         matchNumber: `${match.match_number}`, 
            //         redOneTeamNumber: `${match.alliances.red.team_keys[0]}`,
            //         redTwoTeamNumber: `${match.alliances.red.team_keys[1]}`,
            //         redThreeTeamNumber: `${match.alliances.red.team_keys[2]}`,
            //         blueOneTeamNumber: `${match.alliances.blue.team_keys[0]}`,
            //         blueTwoTeamNumber: `${match.alliances.blue.team_keys[1]}`,
            //         blueThreeTeamNumber: `${match.alliances.blue.team_keys[2]}`,
            //         event_id: `${eventId}`,
            //         matchKey: `${match.key}`
            //     }, 
            //     { 
            //         headers: {
            //             'Content-Type': 'application/json'
            //         }
            //     }
            // )
            // .then(console.log("Match saved", match.key))
            // .catch(error => console.error('Error saving data:', error));
            
        // });
        



        // Get teams at event from TBA
        // /event/{event_key}/teams
        await axios.get(`${TBA_DATABASE_URL}/event/${eventkey}/teams`, {
            headers: {
              'X-TBA-Auth-Key': `${TBA_KEY}`,
              'accept': 'application/json'
            }
          })
        .then(response => setEventTeams(response.data))
        .catch(error => console.error('Error fetching data:', error));


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
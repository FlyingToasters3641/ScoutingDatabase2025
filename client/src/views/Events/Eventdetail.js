import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import { Container, Row, Col } from "react-bootstrap";

const Eventdetail = () => {
    const [event, setEvent] = useState([]);
    const [team, setTeam] = useState([]);
    const [match, setMatch] = useState([]);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const eventid = searchParams.get('eventId');

    useEffect(() => {
        axios.get('http://localhost:3001/api/v1/events/' + eventid)
        //axios.get('https://super-sniffle-q4v55jpj9wcqrq-3001.app.github.dev/event/{event.key}')
        .then(response => setEvent(response.data))
        .catch(error => console.error('Error fetching data:', error));

        axios.get('http://localhost:3001/api/v1/eventteams/' + eventid)
        //axios.get('https://super-sniffle-q4v55jpj9wcqrq-3001.app.github.dev/api/v1/teams')
        .then(response => setTeam(response.data))
        .catch(error => console.error('Error fetching data:', error));

        axios.get('http://localhost:3001/api/v1/matches/' + eventid)
        //axios.get('https://super-sniffle-q4v55jpj9wcqrq-3001.app.github.dev/event/{event.key}')
        .then(response => setMatch(response.data))
        .catch(error => console.error('Error fetching data:', error));
        }, [eventid]);
    
    
    // ############################################################################################################
    // Todo: This function should be moved to a common file imported as it may be used elsewhere in the applicaiton.
    /**
     * This function is used to lookup a value in a multi-dimensional array
     * Posted on Tathyika.com (also refer for more codes there)
     * 
     * @version 1
     *
     * @param {Object} searchValue The value to search for the lookup (vertical).
     * @param {Array} array The multi-dimensional array to be searched.
     * @param {String} searchIndex The column-index of the array where to search.
     * @param {String} returnIndex The column-index of the array from where to get the returning matching value.
     * @return {Object} Returns the matching value found else returns null.
     */
    function arrayLookup(searchValue,array,searchIndex,returnIndex) {
        var returnVal = null;
        var i;
        for(i=0; i<array.length; i++) {
            if(array[i][searchIndex]===searchValue) {
                returnVal = array[i][returnIndex];
                break;
            }
        }
        return returnVal;
    }
    
    return (
        <Container>
            <Row>
                <Col md={12}>
                    <h1>{event.name}</h1>
                    <hr></hr>
                    <p>Search query: {eventid}</p>
                </Col>
            </Row>
            <Row>
                <Col md={7}>
                    <h2>Matches:</h2>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Match Key</th>
                                <th>Blue 1</th>
                                <th>Blue 2</th>
                                <th>Blue 3</th>
                                <th>Red 1</th>
                                <th>Red 2</th>
                                <th>Red 3</th>
                                <th>Blue Score</th>
                                <th>Red Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {match.map(match => (
                                <tr key={match.matchKey}>
                                    <td><Link to={`/matchdetails/?matchId=${match.id}`}>{match.matchKey}</Link></td>
                                    <td class="bg-primary bg-opacity-10"><Link to={`/team/?teamId=${arrayLookup(match.blueOneTeamNumber, team, "teamNumber", "id")}`}>{match.blueOneTeamNumber}</Link></td>
                                    <td class="bg-primary bg-opacity-10"><Link to={`/team/?teamId=${arrayLookup(match.blueTwoTeamNumber, team, "teamNumber", "id")}`}>{match.blueTwoTeamNumber}</Link></td>
                                    <td class="bg-primary bg-opacity-10"><Link to={`/team/?teamId=${arrayLookup(match.blueThreeTeamNumber, team, "teamNumber", "id")}`}>{match.blueThreeTeamNumber}</Link></td>
                                    <td class="bg-danger bg-opacity-10"><Link to={`/team/?teamId=${arrayLookup(match.redOneTeamNumber, team, "teamNumber", "id")}`}>{match.redOneTeamNumber}</Link></td>
                                    <td class="bg-danger bg-opacity-10"><Link to={`/team/?teamId=${arrayLookup(match.redTwoTeamNumber, team, "teamNumber", "id")}`}>{match.redTwoTeamNumber}</Link></td>
                                    <td class="bg-danger bg-opacity-10"><Link to={`/team/?teamId=${arrayLookup(match.redThreeTeamNumber, team, "teamNumber", "id")}`}>{match.redThreeTeamNumber}</Link></td>
                                    <td>{match.blueScore}</td>
                                    <td>{match.redScore}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Col>
                <Col md={5}>
                    <h2>Team List:</h2>
                    <table className="table"> 
                        <thead>
                            <tr>
                                <th>Teams Number</th>
                                <th>Team Name</th>
                            </tr>
                        </thead>
                        <tbody>
                        {team.map(team => (
                            <tr key={team.teamNumber}>
                                <td><Link to={`/team/?teamId=${team.id}`}>{team.teamNumber}</Link></td>
                                <td>{team.nickname}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </Col>
            </Row>
        </Container>
    );
}

export default Eventdetail;
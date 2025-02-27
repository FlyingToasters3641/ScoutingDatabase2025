import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import { Container, Row, Col } from "react-bootstrap";
import { APP_DATABASE_URL } from "../../constant/constant";
import { arrayLookup } from "../../utils/common";
import BackButton from '../common/BackButton';

const Eventdetail = () => {
    const [event, setEvent] = useState([]);
    const [team, setTeam] = useState([]);
    const [match, setMatch] = useState([]);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const eventid = searchParams.get('eventId');

    useEffect(() => {
        axios.get(`${APP_DATABASE_URL}/events/${eventid}`)
        .then(response => setEvent(response.data))
        .catch(error => console.error('Error fetching data:', error));

        axios.get(`${APP_DATABASE_URL}/eventteams/${eventid}`)
        .then(response => setTeam(response.data))
        .catch(error => console.error('Error fetching data:', error));

        axios.get(`${APP_DATABASE_URL}/matches/${eventid}`)
        .then(response => setMatch(response.data))
        .catch(error => console.error('Error fetching data:', error));
        }, []);
    
        const tdRight={
            textAlign:'right'
        };
    
    return (
        <Container>
            <Row>
                <Col md={1}><BackButton /></Col>
                <Col md={11}>
                    <h1>{event.name}</h1>
                </Col>
                <hr></hr>
                {/* <p>Search query: {eventid}</p> */}
            </Row>
            <Row>
                <Col md={1}>&nbsp;</Col>
                <Col md={11} style={tdRight}>
                    <Link to={`/dataimport`}><button type="button" class="btn btn-success">Import Data</button></Link>
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
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import BackButton from '../common/BackButton';
import { APP_DATABASE_URL } from "../../constant/constant";
import { Col, Container, Row } from "react-bootstrap";

const Team = () => {
    const [team, setTeam] = useState([]);
    const [matchdata, setMatchdata] = useState([]);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const teamid = searchParams.get('teamId');

    useEffect(() => {
        axios.get(`${APP_DATABASE_URL}/teams/${teamid}`)
        .then(response => setTeam(response.data))
        .catch(error => console.error('Error fetching data:', error));
        }, [teamid]);
    
    useEffect(() => {
        axios.get(`${APP_DATABASE_URL}/matchData/2025/teamMatches/${team.teamNumber}`)
        .then(response => setMatchdata(response.data))
        .catch(error => console.error('Error fetching data:', error));
    }, [team.teamNumber]);

    return (
        <Container>
            <Row>
                <Col md={1}><BackButton /></Col>
                <Col md={11}><h1> {team.teamNumber} - {team.nickname}</h1></Col>
            </Row>
            <Row><hr></hr></Row>
            <Row>
                <Col md={10}>
                    <h2>Matches</h2>
                    <hr></hr>
                    <table className="table">
                    <thead>
                            <tr>
                                <th>Match Key</th>
                                <th>Position</th>
                                <th>Robot Position</th>
                                <th>Auton Coral</th>
                                <th>Auton Processor</th>
                                <th>Auton Net</th>
                                <th>TeleOp Coral</th>
                                <th>TeleOp Processor</th>
                                <th>TeleOp Net</th>
                                <th>Alage Removed</th>
                                <th>Climb Position</th>
                                <th>Coral Pick-Up</th>
                                <th>Coral Pick-Up Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {matchdata.map(matchdata => (
                                <tr key= {matchdata.teamNumber}>
                                    <td>{matchdata.matchKey}</td>
                                    <td>{matchdata.allianceLocation}</td>
                                    <td>{matchdata.autonPosition}</td>
                                    <td>{matchdata.autonReefTotal}</td>
                                    <td>{matchdata.autonProcessorScored}</td>
                                    <td>{matchdata.autonNetScored}</td>
                                    <td>{matchdata.teleopReefTotal}</td>
                                    <td>{matchdata.teleopProcessorScored}</td>
                                    <td>{matchdata.teleopNetScored}</td>
                                    <td>{matchdata.totalAlgeaRemoved}</td>
                                    <td>{matchdata.bargeZonLocation}</td>
                                    <td>
                                        {matchdata.schemaVersion === '2025.2.0' 
                                            ? matchdata.totalCoralPickup 
                                            : (matchdata.totalCoralGroundPickup + matchdata.totalCoralStationPickup)}
                                    </td>
                                    <td>
                                        {matchdata.schemaVersion === '2025.2.0'
                                            ? `${matchdata.coralIntakeTypeGround ? 'G' : ''}${matchdata.coralIntakeTypeStation ? 'S' : ''}`
                                            : `${matchdata.totalCoralGroundPickup > 0 ? 'G' : ''}${matchdata.totalCoralStationPickup  > 0 ? 'S' : ''}`}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Col>
                <Col md={2}>
                    <h2>Team Information</h2>
                    <hr></hr>
                    <h5>Team Number:</h5>
                    <p>{team.teamNumber}</p>
                    <h5>Team Name:</h5>
                    <p>{team.nickname}</p>
                    <h5>Country:</h5>
                    <p>{team.country}</p>
                    <h5>State/Prov:</h5>
                    <p>{team.state_prov}</p>
                    <h5>City:</h5>
                    <p>{team.city}</p>
                </Col>
            </Row>
        </Container>
    );
}

export default Team;
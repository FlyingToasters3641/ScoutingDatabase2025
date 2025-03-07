import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import BackButton from '../common/BackButton';
import { Col, Container, Row } from "react-bootstrap";
import { APP_DATABASE_URL } from "../../constant/constant";
import { arrayLookup } from "../../utils/common";

const Matchdetails = () => {
    const [match, setMatch] = useState([]);
    const [matchdata, setMatchdata] = useState([]);
    const [team, setTeam] = useState([]);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const matchId = searchParams.get('matchId');

    useEffect(() => {
        axios.get(`${APP_DATABASE_URL}/match/${matchId}`)
        .then(response => setMatch(response.data))
        .catch(error => console.error('Error fetching data:', error));
        
        axios.get(`${APP_DATABASE_URL}/teams`)
        .then(response => setTeam(response.data))
        .catch(error => console.error('Error fetching data:', error));
        
        }, [matchId]);


    useEffect(() => {
        axios.get(`${APP_DATABASE_URL}/matchData/2025/matchkey/${match.matchKey}`)
        .then(response => setMatchdata(response.data))
        .catch(error => console.error('Error fetching data:', error));
        }, [match]);

    return (
        <Container>
            <Row>
                <Col md={1}><BackButton /></Col>
                <Col md={11}><h1> {match.matchKey}</h1></Col>
            </Row>
            <Row><hr></hr></Row>
            <Row>
                <Col>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Match Number</th>
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
                            <tr key={match.matchNumber}>
                                <td>{match.matchNumber}</td>
                                <td class="bg-primary bg-opacity-10"><Link to={`/team/?teamId=${arrayLookup(match.blueOneTeamNumber, team, "teamNumber", "id")}`}>{match.blueOneTeamNumber}</Link></td>
                                <td class="bg-primary bg-opacity-10"><Link to={`/team/?teamId=${arrayLookup(match.blueTwoTeamNumber, team, "teamNumber", "id")}`}>{match.blueTwoTeamNumber}</Link></td>
                                <td class="bg-primary bg-opacity-10"><Link to={`/team/?teamId=${arrayLookup(match.blueThreeTeamNumber, team, "teamNumber", "id")}`}>{match.blueThreeTeamNumber}</Link></td>
                                <td class="bg-danger bg-opacity-10"><Link to={`/team/?teamId=${arrayLookup(match.redOneTeamNumber, team, "teamNumber", "id")}`}>{match.redOneTeamNumber}</Link></td>
                                <td class="bg-danger bg-opacity-10"><Link to={`/team/?teamId=${arrayLookup(match.redTwoTeamNumber, team, "teamNumber", "id")}`}>{match.redTwoTeamNumber}</Link></td>
                                <td class="bg-danger bg-opacity-10"><Link to={`/team/?teamId=${arrayLookup(match.redThreeTeamNumber, team, "teamNumber", "id")}`}>{match.redThreeTeamNumber}</Link></td>
                                <td>{match.blueScore}</td>
                                <td>{match.redScore}</td>
                            </tr>
                        </tbody>
                    </table>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Link to={`/robotsummary/?matchId=${match.id}`}><button className="btn btn-primary">Robot Summary</button></Link>
                </Col>
            </Row>
            <Row>
                <Col>
                    <table className="table"> 
                        <thead>
                            <tr>
                                <th>Team Number</th>
                                <th>Scouter</th>
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
                                <th>Coral Ground Pick-Up</th>
                                <th>Coral Station Pick-Up</th>
                                <th>Algae Pick-Up</th>
                            </tr>
                        </thead>
                        <tbody>
                            {matchdata.map(matchdata => (
                                <tr key= {matchdata.teamNumber}>
                                    <td><Link to={`/team/?teamId=${arrayLookup(matchdata.teamNumber, team, "teamNumber", "id")}`}> {matchdata.teamNumber}</Link></td>
                                    <td>{matchdata.scouterName}</td>
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
                                    <td>{matchdata.totalCoralGroundPickup}</td>
                                    <td>{matchdata.totalCoralStationPickup}</td>
                                    <td>{matchdata.totalAlgaePickup}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Col>
            </Row>
        </Container>
    );
}

export default Matchdetails;
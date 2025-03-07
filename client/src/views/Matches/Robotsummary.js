import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import BackButton from '../common/BackButton';
import { Col, Container, Row } from "react-bootstrap";
import { APP_DATABASE_URL } from "../../constant/constant";
import { arrayLookup } from "../../utils/common";

const Robotsummary = () => {
    const [match, setMatch] = useState([]);
    const [teamAverageBlueOne, setTeamAverageBlueOne] = useState([]);
    const [teamAverageBlueTwo, setTeamAverageBlueTwo] = useState([]);
    const [teamAverageBlueThree, setTeamAverageBlueThree] = useState([]);
    const [teamAverageRedOne, setTeamAverageRedOne] = useState([]);
    const [teamAverageRedTwo, setTeamAverageRedTwo] = useState([]);
    const [teamAverageRedThree, setTeamAverageRedThree] = useState([]);
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
        axios.get(`${APP_DATABASE_URL}/matchData/2025/team/${match.blueOneTeamNumber}`)
        .then(response => setTeamAverageBlueOne(response.data))
        .catch(error => console.error('Error fetching data:', error));

        axios.get(`${APP_DATABASE_URL}/matchData/2025/team/${match.blueTwoTeamNumber}`)
        .then(response => setTeamAverageBlueTwo(response.data))
        .catch(error => console.error('Error fetching data:', error));

        axios.get(`${APP_DATABASE_URL}/matchData/2025/team/${match.blueThreeTeamNumber}`)
        .then(response => setTeamAverageBlueThree(response.data))
        .catch(error => console.error('Error fetching data:', error));

        axios.get(`${APP_DATABASE_URL}/matchData/2025/team/${match.redOneTeamNumber}`)
        .then(response => setTeamAverageRedOne(response.data))
        .catch(error => console.error('Error fetching data:', error));

        axios.get(`${APP_DATABASE_URL}/matchData/2025/team/${match.redTwoTeamNumber}`)
        .then(response => setTeamAverageRedTwo(response.data))
        .catch(error => console.error('Error fetching data:', error));

        axios.get(`${APP_DATABASE_URL}/matchData/2025/team/${match.redThreeTeamNumber}`)
        .then(response => setTeamAverageRedThree(response.data))
        .catch(error => console.error('Error fetching data:', error));
        
    }, [match]);

    return (
        <Container>
            <Row>
                <Col md={1}><BackButton /></Col>
                <Col md={11}><h1> Match {match.matchNumber} Robot Summary</h1></Col>
            </Row>
            <Row><hr></hr></Row>
            <Row>
                <Col>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Blue 1</th>
                                <th>Blue 2</th>
                                <th>Blue 3</th>
                                <th>Red 1</th>
                                <th>Red 2</th>
                                <th>Red 3</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="bg-primary bg-opacity-10"><Link to={`/team/?teamId=${arrayLookup(match.blueOneTeamNumber, team, "teamNumber", "id")}`}>{match.blueOneTeamNumber}</Link></td>
                                <td class="bg-primary bg-opacity-10"><Link to={`/team/?teamId=${arrayLookup(match.blueTwoTeamNumber, team, "teamNumber", "id")}`}>{match.blueTwoTeamNumber}</Link></td>
                                <td class="bg-primary bg-opacity-10"><Link to={`/team/?teamId=${arrayLookup(match.blueThreeTeamNumber, team, "teamNumber", "id")}`}>{match.blueThreeTeamNumber}</Link></td>
                                <td class="bg-danger bg-opacity-10"><Link to={`/team/?teamId=${arrayLookup(match.redOneTeamNumber, team, "teamNumber", "id")}`}>{match.redOneTeamNumber}</Link></td>
                                <td class="bg-danger bg-opacity-10"><Link to={`/team/?teamId=${arrayLookup(match.redTwoTeamNumber, team, "teamNumber", "id")}`}>{match.redTwoTeamNumber}</Link></td>
                                <td class="bg-danger bg-opacity-10"><Link to={`/team/?teamId=${arrayLookup(match.redThreeTeamNumber, team, "teamNumber", "id")}`}>{match.redThreeTeamNumber}</Link></td>
                            </tr>
                        </tbody>
                    </table>
                </Col>
            </Row>
            <Row>
                <Col>
                    <table className="table"> 
                        <thead>
                            <tr>
                                <th>Team Number</th>
                                <th>Auton Coral</th>
                                <th>Auton Net</th>
                                <th>Auton Processor</th>
                                <th>TeleOp Coral</th>
                                <th>TeleOp Net</th>
                                <th>TeleOp Processor</th>
                            </tr>
                        </thead>
                        <tbody>
                                <tr class="bg-primary bg-opacity-10">
                                    <td>{match.blueOneTeamNumber}</td>
                                    <td>{teamAverageBlueOne.autonReefTotal}</td>
                                    <td>{teamAverageBlueOne.autonNetScored}</td>
                                    <td>{teamAverageBlueOne.autonProcessorScored}</td>
                                    <td>{teamAverageBlueOne.teleopReefTotal}</td>
                                    <td>{teamAverageBlueOne.teleopNetScored}</td>
                                    <td>{teamAverageBlueOne.teleopProcessorScored}</td>
                                </tr>
                                <tr class="bg-primary bg-opacity-10">
                                    <td>{match.blueTwoTeamNumber}</td>
                                    <td>{teamAverageBlueTwo.autonReefTotal}</td>
                                    <td>{teamAverageBlueTwo.autonNetScored}</td>
                                    <td>{teamAverageBlueTwo.autonProcessorScored}</td>
                                    <td>{teamAverageBlueTwo.teleopReefTotal}</td>
                                    <td>{teamAverageBlueTwo.teleopNetScored}</td>
                                    <td>{teamAverageBlueTwo.teleopProcessorScored}</td>
                                </tr>
                                <tr class="bg-primary bg-opacity-10">
                                    <td>{match.blueThreeTeamNumber}</td>
                                    <td>{teamAverageBlueThree.autonReefTotal}</td>
                                    <td>{teamAverageBlueThree.autonNetScored}</td>
                                    <td>{teamAverageBlueThree.autonProcessorScored}</td>
                                    <td>{teamAverageBlueThree.teleopReefTotal}</td>
                                    <td>{teamAverageBlueThree.teleopNetScored}</td>
                                    <td>{teamAverageBlueThree.teleopProcessorScored}</td>
                                </tr>
                                <tr class="bg-danger bg-opacity-10">
                                    <td>{match.redOneTeamNumber}</td>
                                    <td>{teamAverageRedOne.autonReefTotal}</td>
                                    <td>{teamAverageRedOne.autonNetScored}</td>
                                    <td>{teamAverageRedOne.autonProcessorScored}</td>
                                    <td>{teamAverageRedOne.teleopReefTotal}</td>
                                    <td>{teamAverageRedOne.teleopNetScored}</td>
                                    <td>{teamAverageRedOne.teleopProcessorScored}</td>
                                </tr>
                                <tr class="bg-danger bg-opacity-10">
                                    <td>{match.redTwoTeamNumber}</td>
                                    <td>{teamAverageRedTwo.autonReefTotal}</td>
                                    <td>{teamAverageRedTwo.autonNetScored}</td>
                                    <td>{teamAverageRedTwo.autonProcessorScored}</td>
                                    <td>{teamAverageRedTwo.teleopReefTotal}</td>
                                    <td>{teamAverageRedTwo.teleopNetScored}</td>
                                    <td>{teamAverageRedTwo.teleopProcessorScored}</td>
                                </tr>
                                <tr class="bg-danger bg-opacity-10">
                                    <td>{match.redThreeTeamNumber}</td>
                                    <td>{teamAverageRedThree.autonReefTotal}</td>
                                    <td>{teamAverageRedThree.autonNetScored}</td>
                                    <td>{teamAverageRedThree.autonProcessorScored}</td>
                                    <td>{teamAverageRedThree.teleopReefTotal}</td>
                                    <td>{teamAverageRedThree.teleopNetScored}</td>
                                    <td>{teamAverageRedThree.teleopProcessorScored}</td>
                                </tr>
                        </tbody>
                    </table>
                </Col>
            </Row>
            <Row>
                <Col>
                    <table className="table"> 
                        <thead>
                            <tr>
                                <th>Team Number</th>
                                <th>Algae Pick-Up</th>
                                <th>Alage Removed</th>
                                <th>Climb Position</th>
                                <th>Coral Ground Pick-Up</th>
                                <th>Coral Station Pick-Up</th>
                            </tr>
                        </thead>
                        <tbody>
                                <tr class="bg-primary bg-opacity-10">
                                    <td >{match.blueOneTeamNumber}</td>
                                    <td>{teamAverageBlueOne.totalAlgaePickup}</td>
                                    <td>{teamAverageBlueOne.totalAlgeaRemoved}</td>
                                    <td>{teamAverageBlueOne.bargeZonLocation}</td>
                                    <td>{teamAverageBlueOne.totalCoralGroundPickup}</td>
                                    <td>{teamAverageBlueOne.totalCoralStationPickup}</td>
                                </tr>
                                <tr class="bg-primary bg-opacity-10">
                                    <td>{match.blueTwoTeamNumber}</td>
                                    <td>{teamAverageBlueTwo.totalAlgaePickup}</td>
                                    <td>{teamAverageBlueTwo.totalAlgeaRemoved}</td>
                                    <td>{teamAverageBlueTwo.bargeZonLocation}</td>
                                    <td>{teamAverageBlueTwo.totalCoralGroundPickup}</td>
                                    <td>{teamAverageBlueTwo.totalCoralStationPickup}</td>
                                </tr>
                                <tr class="bg-primary bg-opacity-10">
                                    <td>{match.blueThreeTeamNumber}</td>
                                    <td>{teamAverageBlueThree.totalAlgaePickup}</td>
                                    <td>{teamAverageBlueThree.totalAlgeaRemoved}</td>
                                    <td>{teamAverageBlueThree.bargeZonLocation}</td>
                                    <td>{teamAverageBlueThree.totalCoralGroundPickup}</td>
                                    <td>{teamAverageBlueThree.totalCoralStationPickup}</td>
                                </tr>
                                <tr class="bg-danger bg-opacity-10">
                                    <td>{match.redOneTeamNumber}</td>
                                    <td>{teamAverageRedOne.totalAlgaePickup}</td>
                                    <td>{teamAverageRedOne.totalAlgeaRemoved}</td>
                                    <td>{teamAverageRedOne.bargeZonLocation}</td>
                                    <td>{teamAverageRedOne.totalCoralGroundPickup}</td>
                                    <td>{teamAverageRedOne.totalCoralStationPickup}</td>
                                </tr>
                                <tr class="bg-danger bg-opacity-10">
                                    <td>{match.redTwoTeamNumber}</td>
                                    <td>{teamAverageRedTwo.totalAlgaePickup}</td>
                                    <td>{teamAverageRedTwo.totalAlgeaRemoved}</td>
                                    <td>{teamAverageRedTwo.bargeZonLocation}</td>
                                    <td>{teamAverageRedTwo.totalCoralGroundPickup}</td>
                                    <td>{teamAverageRedTwo.totalCoralStationPickup}</td>
                                </tr>
                                <tr class="bg-danger bg-opacity-10">
                                    <td>{match.redThreeTeamNumber}</td>
                                    <td>{teamAverageRedThree.totalAlgaePickup}</td>
                                    <td>{teamAverageRedThree.totalAlgeaRemoved}</td>
                                    <td>{teamAverageRedThree.bargeZonLocation}</td>
                                    <td>{teamAverageRedThree.totalCoralGroundPickup}</td>
                                    <td>{teamAverageRedThree.totalCoralStationPickup}</td>
                                </tr>
                        </tbody>
                    </table>
                </Col>
            </Row>
        </Container>
    );
}

export default Robotsummary;
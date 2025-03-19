import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import BackButton from '../common/BackButton';
import { Col, Container, Row } from "react-bootstrap";
import { APP_DATABASE_URL } from "../../constant/constant";
import { arrayLookup } from "../../utils/common";

import { AppContext } from "../common/AppContext.js";

const Robotsummary = () => {
    const { appData } = useContext(AppContext);

    const [match, setMatch] = useState([]);
    const teamAverageDefault = [{avgAutonReefTotal: null, avgAutonNetScored: null, avgAutonProcessorScored: -1, avgTeleopReefTotal: -1, avgTeleopNetScored: -1, avgTeleopProcessorScored: -1, avgTotalAlgaePickup: -1, avgTotalAlgeaRemoved: -1, avgTotalCoralGroundPickup: -1, avgTotalCoralStationPickup: -1, catBargeZonLocation: '',}];
    const [teamAverageBlueOne, setTeamAverageBlueOne] = useState(teamAverageDefault);
    const [teamAverageBlueTwo, setTeamAverageBlueTwo] = useState(teamAverageDefault);
    const [teamAverageBlueThree, setTeamAverageBlueThree] = useState(teamAverageDefault);
    const [teamAverageRedOne, setTeamAverageRedOne] = useState(teamAverageDefault);
    const [teamAverageRedTwo, setTeamAverageRedTwo] = useState(teamAverageDefault);
    const [teamAverageRedThree, setTeamAverageRedThree] = useState(teamAverageDefault);
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
        if(match){
        axios.get(`${APP_DATABASE_URL}/matchData/2025/${appData.currentEventID}/team/${match.blueOneTeamNumber}`)
        .then(response => setTeamAverageBlueOne(response.data))
        .catch(error => console.error('Error fetching data:', error));

        axios.get(`${APP_DATABASE_URL}/matchData/2025/${appData.currentEventID}/team/${match.blueTwoTeamNumber}`)
        .then(response => setTeamAverageBlueTwo(response.data))
        .catch(error => console.error('Error fetching data:', error));

        axios.get(`${APP_DATABASE_URL}/matchData/2025/${appData.currentEventID}/team/${match.blueThreeTeamNumber}`)
        .then(response => setTeamAverageBlueThree(response.data))
        .catch(error => console.error('Error fetching data:', error));

        axios.get(`${APP_DATABASE_URL}/matchData/2025/${appData.currentEventID}/team/${match.redOneTeamNumber}`)
        .then(response => setTeamAverageRedOne(response.data))
        .catch(error => console.error('Error fetching data:', error));

        axios.get(`${APP_DATABASE_URL}/matchData/2025/${appData.currentEventID}/team/${match.redTwoTeamNumber}`)
        .then(response => setTeamAverageRedTwo(response.data))
        .catch(error => console.error('Error fetching data:', error));

        axios.get(`${APP_DATABASE_URL}/matchData/2025/${appData.currentEventID}/team/${match.redThreeTeamNumber}`)
        .then(response => setTeamAverageRedThree(response.data))
        .catch(error => console.error('Error fetching data:', error));
        }
    }, [match]);

    return (
        <Container>
            <Row>
                <Col md={1}><BackButton /></Col>
                <Col md={11}><h1> Match {match.matchNumber} Robot Summary</h1></Col>
            </Row>
            <Row><hr></hr><p>Event Year: {appData.currentEventYear}; Event Key: {appData.currentEventKey}; Event Id (serverDV): {appData.currentEventID}; <em><b>{appData.name}</b></em></p>
            </Row>
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
                                <td className="bg-primary bg-opacity-10"><Link to={`/team/?teamId=${arrayLookup(match.blueOneTeamNumber, team, "teamNumber", "id")}`}>{match.blueOneTeamNumber}</Link></td>
                                <td className="bg-primary bg-opacity-10"><Link to={`/team/?teamId=${arrayLookup(match.blueTwoTeamNumber, team, "teamNumber", "id")}`}>{match.blueTwoTeamNumber}</Link></td>
                                <td className="bg-primary bg-opacity-10"><Link to={`/team/?teamId=${arrayLookup(match.blueThreeTeamNumber, team, "teamNumber", "id")}`}>{match.blueThreeTeamNumber}</Link></td>
                                <td className="bg-danger bg-opacity-10"><Link to={`/team/?teamId=${arrayLookup(match.redOneTeamNumber, team, "teamNumber", "id")}`}>{match.redOneTeamNumber}</Link></td>
                                <td className="bg-danger bg-opacity-10"><Link to={`/team/?teamId=${arrayLookup(match.redTwoTeamNumber, team, "teamNumber", "id")}`}>{match.redTwoTeamNumber}</Link></td>
                                <td className="bg-danger bg-opacity-10"><Link to={`/team/?teamId=${arrayLookup(match.redThreeTeamNumber, team, "teamNumber", "id")}`}>{match.redThreeTeamNumber}</Link></td>
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
                                <th>Match Cnt</th>
                                <th>Auton Coral L1</th>
                                <th>Auton Coral L4</th>
                                <th>Auton Coral</th>
                                <th>TeleOp Coral L4</th>
                                <th>TeleOp Coral</th>
                                <th>TeleOp Net</th>
                                <th>TeleOp Processor</th>
                            </tr>
                        </thead>
                        <tbody>
                                <tr className="bg-primary bg-opacity-10">
                                    <td>{match.blueOneTeamNumber}</td>
                                    <td>{teamAverageBlueOne[0].matchCount}</td>
                                    <td>{teamAverageBlueOne[0].avgAutonReefLevel1Total}</td>
                                    <td>{teamAverageBlueOne[0].avgAutonReefLevel4Total}</td>
                                    <td>{teamAverageBlueOne[0].avgAutonReefTotal}</td>
                                    <td>{teamAverageBlueOne[0].avgTeleopReefLevel4Total}</td>
                                    <td>{teamAverageBlueOne[0].avgTeleopReefTotal}</td>
                                    <td>{teamAverageBlueOne[0].avgTeleopNetScored}</td>
                                    <td>{teamAverageBlueOne[0].avgTeleopProcessorScored}</td>
                                </tr>
                                <tr className="bg-primary bg-opacity-10">
                                    <td>{match.blueTwoTeamNumber}</td>
                                    <td>{teamAverageBlueTwo[0].matchCount}</td>
                                    <td>{teamAverageBlueTwo[0].avgAutonReefLevel1Total}</td>
                                    <td>{teamAverageBlueTwo[0].avgAutonReefLevel4Total}</td>
                                    <td>{teamAverageBlueTwo[0].avgAutonReefTotal}</td>
                                    <td>{teamAverageBlueTwo[0].avgTeleopReefLevel4Total}</td>
                                    <td>{teamAverageBlueTwo[0].avgTeleopReefTotal}</td>
                                    <td>{teamAverageBlueTwo[0].avgTeleopNetScored}</td>
                                    <td>{teamAverageBlueTwo[0].avgTeleopProcessorScored}</td>
                                </tr>
                                <tr className="bg-primary bg-opacity-10">
                                    <td>{match.blueThreeTeamNumber}</td>
                                    <td>{teamAverageBlueThree[0].matchCount}</td>
                                    <td>{teamAverageBlueThree[0].avgAutonReefLevel1Total}</td>
                                    <td>{teamAverageBlueThree[0].avgAutonReefLevel4Total}</td>
                                    <td>{teamAverageBlueThree[0].avgAutonReefTotal}</td>
                                    <td>{teamAverageBlueThree[0].avgTeleopReefLevel4Total}</td>
                                    <td>{teamAverageBlueThree[0].avgTeleopReefTotal}</td>
                                    <td>{teamAverageBlueThree[0].avgTeleopNetScored}</td>
                                    <td>{teamAverageBlueThree[0].avgTeleopProcessorScored}</td>
                                </tr>
                                <tr className="bg-danger bg-opacity-10">
                                    <td>{match.redOneTeamNumber}</td>
                                    <td>{teamAverageRedOne[0].matchCount}</td>
                                    <td>{teamAverageRedOne[0].avgAutonReefLevel1Total}</td>
                                    <td>{teamAverageRedOne[0].avgAutonReefLevel4Total}</td>
                                    <td>{teamAverageRedOne[0].avgAutonReefTotal}</td>
                                    <td>{teamAverageRedOne[0].avgTeleopReefLevel4Total}</td>
                                    <td>{teamAverageRedOne[0].avgTeleopReefTotal}</td>
                                    <td>{teamAverageRedOne[0].avgTeleopNetScored}</td>
                                    <td>{teamAverageRedOne[0].avgTeleopProcessorScored}</td>
                                </tr>
                                <tr className="bg-danger bg-opacity-10">
                                    <td>{match.redTwoTeamNumber}</td>
                                    <td>{teamAverageRedTwo[0].matchCount}</td>
                                    <td>{teamAverageRedTwo[0].avgAutonReefLevel1Total}</td>
                                    <td>{teamAverageRedTwo[0].avgAutonReefLevel4Total}</td>
                                    <td>{teamAverageRedTwo[0].avgAutonReefTotal}</td>
                                    <td>{teamAverageRedTwo[0].avgTeleopReefLevel4Total}</td>
                                    <td>{teamAverageRedTwo[0].avgTeleopReefTotal}</td>
                                    <td>{teamAverageRedTwo[0].avgTeleopNetScored}</td>
                                    <td>{teamAverageRedTwo[0].avgTeleopProcessorScored}</td>
                                </tr>
                                <tr className="bg-danger bg-opacity-10">
                                    <td>{match.redThreeTeamNumber}</td>
                                    <td>{teamAverageRedThree[0].matchCount}</td>
                                    <td>{teamAverageRedThree[0].avgAutonReefLevel1Total}</td>
                                    <td>{teamAverageRedThree[0].avgAutonReefLevel4Total}</td>
                                    <td>{teamAverageRedThree[0].avgAutonReefTotal}</td>
                                    <td>{teamAverageRedThree[0].avgTeleopReefLevel4Total}</td>
                                    <td>{teamAverageRedThree[0].avgTeleopReefTotal}</td>
                                    <td>{teamAverageRedThree[0].avgTeleopNetScored}</td>
                                    <td>{teamAverageRedThree[0].avgTeleopProcessorScored}</td>
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
                                <th>Match Cnt</th>
                                <th>Algae Pick-Up</th>
                                <th>Alage Removed</th>
                                <th>Climb Position</th>
                                <th>Coral Ground Pick-Up</th>
                                <th>Coral Station Pick-Up</th>
                            </tr>
                        </thead>
                        <tbody>
                                <tr className="bg-primary bg-opacity-10">
                                    <td>{match.blueOneTeamNumber}</td>
                                    <td >{teamAverageBlueOne[0].matchCount}</td>
                                    <td>{teamAverageBlueOne[0].avgTotalAlgaePickup}</td>
                                    <td>{teamAverageBlueOne[0].avgTotalAlgeaRemoved}</td>
                                    <td>{teamAverageBlueOne[0].catBargeZonLocation}</td>
                                    <td>{teamAverageBlueOne[0].avgTotalCoralGroundPickup}</td>
                                    <td>{teamAverageBlueOne[0].avgTotalCoralStationPickup}</td>
                                </tr>
                                <tr className="bg-primary bg-opacity-10">
                                    <td>{match.blueTwoTeamNumber}</td>
                                    <td>{teamAverageBlueTwo[0].matchCount}</td>
                                    <td>{teamAverageBlueTwo[0].avgTotalAlgaePickup}</td>
                                    <td>{teamAverageBlueTwo[0].avgTotalAlgeaRemoved}</td>
                                    <td>{teamAverageBlueTwo[0].catBargeZonLocation}</td>
                                    <td>{teamAverageBlueTwo[0].avgTotalCoralGroundPickup}</td>
                                    <td>{teamAverageBlueTwo[0].avgTotalCoralStationPickup}</td>
                                </tr>
                                <tr className="bg-primary bg-opacity-10">
                                    <td>{match.blueThreeTeamNumber}</td>
                                    <td>{teamAverageBlueThree[0].matchCount}</td>
                                    <td>{teamAverageBlueThree[0].avgTotalAlgaePickup}</td>
                                    <td>{teamAverageBlueThree[0].avgTotalAlgeaRemoved}</td>
                                    <td>{teamAverageBlueThree[0].catBargeZonLocation}</td>
                                    <td>{teamAverageBlueThree[0].avgTotalCoralGroundPickup}</td>
                                    <td>{teamAverageBlueThree[0].avgTotalCoralStationPickup}</td>
                                </tr>
                                <tr className="bg-danger bg-opacity-10">
                                    <td>{match.redOneTeamNumber}</td>
                                    <td>{teamAverageRedOne[0].matchCount}</td>
                                    <td>{teamAverageRedOne[0].avgTotalAlgaePickup}</td>
                                    <td>{teamAverageRedOne[0].avgTotalAlgeaRemoved}</td>
                                    <td>{teamAverageRedOne[0].catBargeZonLocation}</td>
                                    <td>{teamAverageRedOne[0].avgTotalCoralGroundPickup}</td>
                                    <td>{teamAverageRedOne[0].avgTotalCoralStationPickup}</td>
                                </tr>
                                <tr className="bg-danger bg-opacity-10">
                                    <td>{match.redTwoTeamNumber}</td>
                                    <td>{teamAverageRedTwo[0].matchCount}</td>
                                    <td>{teamAverageRedTwo[0].avgTotalAlgaePickup}</td>
                                    <td>{teamAverageRedTwo[0].avgTotalAlgeaRemoved}</td>
                                    <td>{teamAverageRedTwo[0].catBargeZonLocation}</td>
                                    <td>{teamAverageRedTwo[0].avgTotalCoralGroundPickup}</td>
                                    <td>{teamAverageRedTwo[0].avgTotalCoralStationPickup}</td>
                                </tr>
                                <tr className="bg-danger bg-opacity-10">
                                    <td>{match.redThreeTeamNumber}</td>
                                    <td>{teamAverageRedThree[0].matchCount}</td>
                                    <td>{teamAverageRedThree[0].avgTotalAlgaePickup}</td>
                                    <td>{teamAverageRedThree[0].avgTotalAlgeaRemoved}</td>
                                    <td>{teamAverageRedThree[0].catBargeZonLocation}</td>
                                    <td>{teamAverageRedThree[0].avgTotalCoralGroundPickup}</td>
                                    <td>{teamAverageRedThree[0].avgTotalCoralStationPickup}</td>
                                </tr>
                        </tbody>
                    </table>
                </Col>
            </Row>
        </Container>
    );
}

export default Robotsummary;
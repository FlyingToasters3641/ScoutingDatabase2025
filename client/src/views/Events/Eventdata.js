import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import BackButton from '../common/BackButton';
import { APP_DATABASE_URL } from "../../constant/constant";
import { arrayLookup } from "../../utils/common";
import { Col, Container, Row } from "react-bootstrap";
import DataTable from '../../components/DataTableNetBase.js';

const Eventdata = () => {
    const [event, setEvent] = useState([]);
    const teamAverageDefault = [{
        teamNumber: null,
        matchCount: -1,
        avgAutonReefTotal: -1,
        avgAutonNetScored: -1,
        avgAutonProcessorScored: -1,
        avgTeleopReefTotal: -1,
        avgTeleopNetScored: -1,
        avgTeleopProcessorScored: -1,
        avgTotalAlgaePickup: -1,
        avgTotalAlgeaRemoved: -1,
        avgTotalCoralGroundPickup: -1,
        avgTotalCoralStationPickup: -1,
        catBargeZonLocation: "",
        avgAutonProcessorMissed: -1,
        avgAutonNetMissed: -1,
    }];
    // const [matchData, setMatchData] = useState([]);
    const [teamAverage, setTeamAverage] = useState([]);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const eventid = searchParams.get('eventId');

    useEffect(() => {
        axios.get(`${APP_DATABASE_URL}/events/${eventid}`)
        .then(response => setEvent(response.data))
        .catch(error => console.error('Error fetching data:', error));
    }, [eventid]);

    useEffect(() => {
        axios.get(`${APP_DATABASE_URL}/matchData/2025/eventkey/${event.key}`)
        .then(response => setTeamAverage(response.data))
        .catch(error => console.error('Error fetching data:', error));
    }, [event]);

    // useEffect(() => {
    //     if(teamAverage){
    //     axios.get(`${APP_DATABASE_URL}/matchData/2025/team/${matchData.teamNumber}`)
    //     .then(response => setTeamAverage(response.data))
    //     .catch(error => console.error('Error fetching data:', error));
    // }
    // }, [teamAverage]);


    return (
        <Container>
            <Row>
                <Col md={1}><BackButton /></Col>
                <Col md={11}>
                    <h1>{event.name} Pick List</h1>
                </Col>
            </Row>
            <Row><hr></hr></Row>
            <Row>
                <DataTable
                    data={teamAverage}
                    options={{
                        columns: [
                            { data: 'teamNumber' },
                            { data: 'matchCount' },
                            { data: 'avgTotalReef' },
                            { data: 'avgTotalAlgeaRemoved' },
                            { data: 'catBargeZonLocation' },
                            { data: 'avgAutonReefTotal' },
                            { data: 'avgAutonProcessorScored' },
                            { data: 'avgAutonNetScored' },
                            { data: 'avgTeleopReefTotal' },
                            { data: 'avgTeleopProcessorScored' },
                            { data: 'avgTeleopNetScored' }
                        ],
                        responsive: true,
                    }}

                >
                    <thead>
                        <tr>
                            <th>Team Number</th>
                            <th>Total Matches</th>
                            <th>Total Coral</th>
                            {/* <th>Total Coral Missed</th> */}
                            {/* <th>Total Processor</th>
                            <th>Total Processor Missed</th> */}
                            {/* <th>Total Net</th>
                            <th>Total Net Missed</th> */}
                            <th>Total Alage Removed</th>
                            <th>Climb Position</th>
                            <th>Auton Coral</th>
                            <th>Auton Processor</th>
                            <th>Auton Net</th>
                            <th>TeleOp Coral</th>
                            <th>TeleOp Processor</th>
                            <th>TeleOp Net</th>
                        </tr>
                    </thead>
                </DataTable>
                {/* <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Team Number</th>
                            <th>Total Matches</th>
                            <th>Total Coral</th>
                            <th>Total Coral Missed</th>
                            <th>Total Processor</th>
                            <th>Total Processor Missed</th>
                            <th>Total Net</th>
                            <th>Total Net Missed</th>
                            <th>Total Alage Removed</th>
                            <th>Climb Position</th>
                            <th>Auton Coral</th>
                            <th>Auton Processor</th>
                            <th>Auton Net</th>
                            <th>TeleOp Coral</th>
                            <th>TeleOp Processor</th>
                            <th>TeleOp Net</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teamAverage.map((matchData) => (
                            <tr key={matchData.teamNumber}>
                                <td>{matchData.teamNumber}</td>
                                <td>{matchData.matchCount}</td>
                                <td>{matchData.avgAutonReefTotal}</td>
                                <td>???</td>
                                <td>{matchData.avgAutonProcessorScored}</td>
                                <td>{matchData.avgAutonProcessorMissed}</td>
                                <td>{matchData.avgAutonNetScored}</td>
                                <td>{matchData.avgAutonNetMissed}</td>
                                <td>{matchData.avgTotalAlgeaRemoved}</td>
                                <td>{matchData.catBargeZonLocation}</td>
                                <td>{matchData.avgAutonReefTotal}</td>
                                <td>{matchData.avgAutonProcessorScored}</td>
                                <td>{matchData.avgAutonNetScored}</td>
                                <td>{matchData.avgTeleopReefTotal}</td>
                                <td>{matchData.avgTeleopProcessorScored}</td>
                                <td>{matchData.avgTeleopNetScored}</td>
                            </tr>
                        ))}
                    </tbody>
                </table> */}
            </Row>
        </Container>
    );
}

export default Eventdata;
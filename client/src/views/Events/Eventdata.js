import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import BackButton from '../common/BackButton';
import { APP_DATABASE_URL } from "../../constant/constant";
import { arrayLookup } from "../../utils/common";
import { Col, Container, Row } from "react-bootstrap";

const Eventdata = () => {
    const [event, setEvent] = useState([]);
    const [matchData, setMatchData] = useState([]);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const eventid = searchParams.get('eventId');

    useEffect(() => {
        axios.get(`${APP_DATABASE_URL}/events/${eventid}`)
        .then(response => setEvent(response.data))
        .catch(error => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        axios.get(`${APP_DATABASE_URL}/matchData/2025/eventkey/${event.key}`)
        .then(response => setMatchData(response.data))
        .catch(error => console.error('Error fetching data:', error));
    }, [event]);

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
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Team Number</th>
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
                            {matchData.map((matchData) => (
                                <tr key={matchData.teamNumber}>
                                    <td>{matchData.teamNumber}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
            </Row>
        </Container>
    );
}

export default Eventdata;
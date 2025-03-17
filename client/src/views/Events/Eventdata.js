import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import BackButton from '../common/BackButton';
import { APP_DATABASE_URL } from "../../constant/constant";
import { Col, Container, Row } from "react-bootstrap";
import DataTable from '../../components/DataTableNetBase.js';
import { FaEdit } from 'react-icons/fa'; // Import edit icon

const Eventdata = () => {
    const [event, setEvent] = useState([]);
    const [teamAverage, setTeamAverage] = useState([]);
    const [title, setTitle] = useState('Printable Pick List'); // State to handle title
    const [isEditing, setIsEditing] = useState(false); // State to handle editing
    const [newTitle, setNewTitle] = useState(title); // State to handle new title

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

    const handleTitleChange = (e) => {
        if (e.target.value.length <= 100) {
            setNewTitle(e.target.value);
        }
    };

    const saveTitle = () => {
        setTitle(newTitle);
        setIsEditing(false);
    };

    return (
        <Container fluid>
            <Row>
                <Col md={1}><BackButton /></Col>
                <Col md={11}>
                    <h1>{event.name} Pick List</h1>
                </Col>
            </Row>
            <Row><Col><hr></hr></Col></Row>
            <Row>
                <Col>
                    <h3>
                        {isEditing ? (
                            <input 
                                type="text" 
                                value={newTitle} 
                                onChange={handleTitleChange} 
                                onBlur={saveTitle} 
                                autoFocus 
                            />
                        ) : (
                            <>
                                {title} <FaEdit onClick={() => setIsEditing(true)} />
                            </>
                        )}
                    </h3>
                </Col>
            </Row>
            <Row>
                <DataTable
                    data={teamAverage}
                    options={{
                        columns: [
                            { data: 'teamNumber' },
                            { data: 'matchCount' },
                            { data: 'avgTotalReef' },
                            { data: 'totalCoralMissed' },
                            { data: 'totalProcessorScored' },
                            { data: 'totalNetScored' },
                            { data: 'totalNetMissed' },
                            { data: 'avgTotalAlgeaRemoved' },
                            { data: 'catBargeZonLocation' },
                            { data: 'avgAutonReefLevel1Total' },
                            { data: 'avgAutonReefLevel4Total' },
                            { data: 'avgAutonReefTotal' },
                            { data: 'avgAutonNetScored' },
                            { data: 'avgTeleopReefLevel1Total' },
                            { data: 'avgTeleopReefLevel3Total' },
                            { data: 'avgTeleopReefLevel4Total' },
                            { data: 'avgTeleopReefTotal' },
                            { data: 'avgTeleopNetScored' }
                        ],
                        responsive: false,
                    }}
                >
                    <thead>
                        <tr>
                            <th>Team Number</th>
                            <th>Total Matches</th>
                            <th>Total Coral</th>
                            <th>Total Coral Missed</th>
                            <th>Total Processor</th>
                            <th>Total Net</th>
                            <th>Total Net Missed</th>
                            <th>Total Alage Removed</th>
                            <th>Climb Position</th>
                            <th>Auton Coral L1</th>
                            <th>Auton Coral L4</th>
                            <th>Auton Coral</th>
                            <th>Auton Net</th>
                            <th>TeleOp Coral L1</th>
                            <th>TeleOp Coral L3</th>
                            <th>TeleOp Coral L4</th>
                            <th>TeleOp Coral</th>
                            <th>TeleOp Net</th>
                        </tr>
                    </thead>
                </DataTable>
            </Row>
        </Container>
    );
}

export default Eventdata;
import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
// import { useLocation } from 'react-router-dom';
import { AppContext } from "../common/AppContext.js";
import BackButton from '../common/BackButton';
import { APP_DATABASE_URL } from "../../constant/constant";
import { Col, Container, Row } from "react-bootstrap";
import DataTable from '../../components/DataTableNetBase.js';
import { FaEdit } from 'react-icons/fa'; // Import edit icon
import { Chips } from 'primereact/chips';

const Eventdata = () => {
    const { appData } = useContext(AppContext);
    // const [event, setEvent] = useState([]);
    const [teamAverage, setTeamAverage] = useState([]);
    const [title, setTitle] = useState('Printable Pick List'); // State to handle title
    const [isEditing, setIsEditing] = useState(false); // State to handle editing
    const [newTitle, setNewTitle] = useState(title); // State to handle new title

    const [chipsValue, setChipsValue] = useState([]);

    // const location = useLocation();
    // const searchParams = new URLSearchParams(location.search);
    // const eventid = searchParams.get('eventId');

    // useEffect(() => {
    //     axios.get(`${APP_DATABASE_URL}/events/${eventid}`)
    //     .then(response => setEvent(response.data))
    //     .catch(error => console.error('Error fetching data:', error));
    // }, [eventid]);

    useEffect(() => {
        const excludeList = chipsValue.length > 0 ? chipsValue.join(',') : "0"; // Convert array to comma-separated string
        axios.get(`${APP_DATABASE_URL}/matchData/2025/eventkey/${appData.currentEventKey}/exclude/${excludeList}`)
            .then(response => setTeamAverage(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, [chipsValue, appData.currentEventKey]);

    const handleTitleChange = (e) => {
        if (e.target.value.length <= 100) {
            setNewTitle(e.target.value);
        }
    };

    const saveTitle = () => {
        setTitle(newTitle);
        setIsEditing(false);
    };

    const tdRight = {
        textAlign: 'right'
    };

    return (
        <Container fluid>
            <Row>
                <Col md={1}><BackButton /></Col>
                <Col md={11}>
                    <h2>{appData.name} Pick List</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr></hr>
                    <p>Event Year: {appData.currentEventYear}; Event Key: {appData.currentEventKey}; Event Id (serverDV): {appData.currentEventID}; <em><b>{appData.name}</b></em></p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h4>
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
                    </h4>
                </Col>
                <Col style={tdRight}>
                    <h5>
                        Excluded Teams:&nbsp;
                        <Chips 
                            value={chipsValue} 
                            onChange={(e) => setChipsValue(e.value)}
                            keyfilter="int"  
                        />
                    </h5>
                </Col>
            </Row>
            <Row>
                <DataTable
                    data={teamAverage}
                    options={{
                        columns: [
                            { data: 'teamNumber' },
                            { data: 'matchCount' },
                            { data: 'avgTotalReef', searchable: false, },
                            { data: 'totalProcessorScored', searchable: false, },
                            { data: 'totalNetScored', searchable: false, },
                            { data: 'avgTotalAlgeaRemoved', searchable: false, },
                            { data: 'catBargeZonLocation' },
                            { data: 'avgAutonReefLevel1Total', searchable: false, },
                            { data: 'avgAutonReefLevel4Total', searchable: false, },
                            { data: 'avgAutonReefTotal', searchable: false, },
                            { data: 'avgAutonNetScored', searchable: false, },
                            { data: 'avgTeleopReefLevel1Total', searchable: false, },
                            { data: 'avgTeleopReefLevel3Total', searchable: false, },
                            { data: 'avgTeleopReefLevel4Total', searchable: false, },
                            { data: 'avgTeleopReefTotal', searchable: false, },
                            { data: 'avgTeleopNetScored', searchable: false, }
                        ],
                        responsive: false,
                    }}
                >
                    <thead>
                        <tr>
                            <th>Team Number</th>
                            <th>Total Matches</th>
                            <th>Total Coral</th>
                            <th>Total Processor</th>
                            <th>Total Net</th>
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
import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { useLocation, Link, useHistory } from 'react-router-dom';
import { AppContext } from "../common/AppContext.js";
import { Container, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { APP_DATABASE_URL } from "../../constant/constant";
import BackButton from '../common/BackButton';
import { RiTrophyLine, RiAddCircleLine } from "react-icons/ri";
import { MdOutlinePreview } from "react-icons/md";
import DataTable from '../../components/DataTableNetBase.js';

const Eventdetail = () => {
    const { appData } = useContext(AppContext);
    const [event, setEvent] = useState([]);
    const [team, setTeam] = useState([]);
    const [match, setMatch] = useState([]);
    const location = useLocation();
    const history = useHistory();
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
    }, [eventid]);

    const tdRight = {
        textAlign: 'right'
    };

    const handleViewItem = (pushTo) => {
        history.push(pushTo);
    };

    const renderTooltip = (props) => (<Tooltip {...props}>{props.text}</Tooltip>);

    return (
        <Container>
            <Row>
                <Col md={1}><BackButton /></Col>
                <Col md={11}>
                    <h2>{event.name}</h2>
                </Col>
                <hr></hr>
                <p>Event Year: {appData.currentEventYear}; Event Key: {appData.currentEventKey}; Event Id (serverDV): {appData.currentEventID}; <em><b>{appData.name}</b></em></p>
            </Row>
            <Row>
                <Col md={1}>&nbsp;</Col>
                <Col md={11} style={tdRight}>
                    <Link to={`/eventdata/?eventId=${event.id}`}><button type="button" className="btn btn-primary"><RiTrophyLine /> Pick List</button></Link>
                    &nbsp;
                    <Link to={`/dataimport`}><button type="button" className="btn btn-success"><RiAddCircleLine /> Import Data</button></Link>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <hr></hr>
                </Col>
            </Row>
            <Row>
                <Col md={7}>
                    <h2>Matches:</h2>
                    <DataTable 
                    data={match} 
                    options={{
                        columns: [
                            { data: 'matchKey', searchable: false, orderable: false, },
                            { data: 'matchKey' },
                            { data: 'blueOneTeamNumber', className: 'bg-primary bg-opacity-10', },
                            { data: 'blueTwoTeamNumber', className: 'bg-primary bg-opacity-10', },
                            { data: 'blueThreeTeamNumber', className: 'bg-primary bg-opacity-10', },
                            { data: 'redOneTeamNumber', className: 'bg-danger bg-opacity-10', },
                            { data: 'redTwoTeamNumber', className: 'bg-danger bg-opacity-10', },
                            { data: 'redThreeTeamNumber', className: 'bg-danger bg-opacity-10', },
                            { data: 'blueScore', searchable: false, orderable: false, },
                            { data: 'redScore', searchable: false, orderable: false, },
                        ],
                        responsive: true,
                        order: [], // Prevent initial sorting
                        // searching: true,
                        // info: false,
                        // scrollX: true,
                        // scrollY: '50vh',
                        // scrollCollapse: true,
                        // fixedColumns: true,
                        // fixedColumns: {
                        //     leftColumns: 1,
                        //     rightColumns: 1
                        // },
                    }}
                    slots={{
                        0: (data, row) => {
                            return (
                                <div onClick={() => handleViewItem(`/matchdetails/?matchId=${row.id}`)}><OverlayTrigger placement="top" overlay={renderTooltip({ text: 'View Match' })}><MdOutlinePreview size='2em' /></OverlayTrigger></div>
                            );
                        },
                    }}
                    >
                    <thead>
                            <tr>
                                <th>View</th>
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
                    </DataTable>
                </Col>
                <Col md={5}>
                    <h2>Team List:</h2>
                    <DataTable
                        data={team}
                        options={{
                            columns: [
                                { data: 'teamNumber', className: 'text-start' },
                                { data: 'nickname',  },
                                { data: 'id', searchable: false, orderable: false, defaultContent: '', className: 'text-end',},
                            ],
                            responsive: true,
                            order: [], // Prevent initial sorting
                        }}
                        slots={{
                            2: (data, row) => {
                                return (
                                    <div onClick={() => handleViewItem(`/team/?teamId=${data}`)}><OverlayTrigger placement="top" overlay={renderTooltip({ text: 'View Team' })}><MdOutlinePreview size='2em' /></OverlayTrigger></div>
                                );
                            },
                        }}
                    >
                        <thead>
                            <tr>
                                <th>Number</th>
                                <th>Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                    </DataTable>
                </Col>
            </Row>
        </Container>
    );
}

export default Eventdetail;
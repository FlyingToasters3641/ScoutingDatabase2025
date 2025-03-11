import React, { useState, useEffect, useContext  } from "react";
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom'
import { AppContext } from "../common/AppContext.js";
import { Container, Row, Col } from "react-bootstrap";
import { APP_DATABASE_URL } from "../../constant/constant";
import { RiAddCircleLine, RiEyeLine } from "react-icons/ri";

const Home = () => {
    const [events, setPosts] = useState([]);
    const { appData, setAppData } = useContext(AppContext);
    const history = useHistory();

    useEffect(() => {
        axios.get(`${APP_DATABASE_URL}/events`)
        .then(response => setPosts(response.data))
        .catch(error => console.error('Error fetching data:', error));
        }, []);

    const tdRight={
        textAlign:'right'
    };

    async function handleViewEvent(event) {
        await setAppData({
            ...appData,
            name: event.name,
            currentEventID: event.id,
            currentEventKey: event.key,
            currentEventYear: event.year
        });
        history.push(`/eventdetail/?eventId=${event.id}`);
    };


    return (
        <Container>
            <Row>
                <Col> 
                    <h2>The Flying Toaster's Scouting Database</h2>
                    <hr></hr>
                </Col>
            </Row>
            <Row>
                <Col>
                    <table className="table"> 
                        <thead>
                            <tr>
                                <th><h2>Event</h2></th>
                                <th>Event Key</th>
                                <th>Event Year</th>
                                <th style={tdRight}><Link to={`/eventimport`}><button className="btn btn-success"><RiAddCircleLine /> Add Event</button></Link></th>
                            </tr>
                        </thead>
                        <tbody>
                        {events.map(event => (
                            <tr key={event.id}>
                                <td>{event.name}</td>
                                <td>{event.key}</td>
                                <td>{event.year}</td>
                                <td style={tdRight}>
                                    <button className="btn btn-primary" onClick={() => handleViewEvent(event)}><RiEyeLine /> View</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </Col>
            </Row>
            <Row>
                <Col><p>Currently Selected: {appData.name}</p></Col>
            </Row>
        </Container>
    );
}

export default Home;
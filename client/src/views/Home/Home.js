import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Container, Row, Col } from "react-bootstrap";
import { APP_DATABASE_URL } from "../../constant/constant";

const Home = () => {
    const [events, setPosts] = useState([]);

    useEffect(() => {
        axios.get(`${APP_DATABASE_URL}/events`)
        .then(response => setPosts(response.data))
        .catch(error => console.error('Error fetching data:', error));
        }, []);


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
                                <th><h2>Events</h2></th>
                            </tr>
                        </thead>
                        <tbody>
                        {events.map(event => (
                            <tr key={event.id}>
                                <td><Link to={`/eventdetail/?eventId=${event.id}`}>{event.name} - ({event.key})</Link></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;
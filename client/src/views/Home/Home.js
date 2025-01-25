import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Container, Row, Col } from "react-bootstrap";

const Home = () => {
    const [events, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/v1/events')
        //axios.get('https://super-sniffle-q4v55jpj9wcqrq-3001.app.github.dev/users')
        .then(response => setPosts(response.data))
        .catch(error => console.error('Error fetching data:', error));
        }, []);


    return (
        <Container>
            <Row>
                <Col md={12}> 
                    <h2>The Flying Toaster's Scouting Database</h2>
                    <hr></hr>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <table className="table"> 
                        <thead>
                            <tr>
                                <th><h2>Events</h2></th>
                            </tr>
                        </thead>
                        <tbody>
                        {events.map(event => (
                            <tr>
                                <Link to={`/eventdetail/?eventId=${event.id}`}>{event.name} - ({event.key})</Link>
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
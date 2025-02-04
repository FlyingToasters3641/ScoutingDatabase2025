import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import BackButton from '../common/BackButton';
import { APP_DATABASE_URL } from "../../constant/constant";
import { Col, Container, Row } from "react-bootstrap";

const Team = () => {
    const [team, setTeam] = useState([]);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const teamid = searchParams.get('teamId');

    useEffect(() => {
        axios.get(`${APP_DATABASE_URL}/teams/${teamid}`)
        .then(response => setTeam(response.data))
        .catch(error => console.error('Error fetching data:', error));
        }, [teamid]);

    return (
        <Container>
            <Row>
                <Col md={1}><BackButton /></Col>
                <Col md={11}><h1> {team.teamNumber} - {team.nickname}</h1><br></br>
                <h2>{team.city} - {team.state_prov} - {team.country}</h2></Col>
            </Row>
            <Row><hr></hr></Row>
        </Container>
    );
}

export default Team;
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import BackButton from '../common/BackButton';
import { Col, Container, Row } from "react-bootstrap";
import { APP_DATABASE_URL } from "../../constant/constant";

const Matchdetails = () => {
    const [match, setMatch] = useState([]);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const matchId = searchParams.get('matchId');

    useEffect(() => {
        axios.get(`${APP_DATABASE_URL}/match/${matchId}`)
        .then(response => setMatch(response.data))
        .catch(error => console.error('Error fetching data:', error));
        }, [matchId]);

    return (
        <Container>
            <Row>
                <Col md={1}><BackButton /></Col>
                <Col md={11}><h1> {match.matchKey}</h1></Col>
            </Row>
            <Row><hr></hr></Row>
            <Row>
                <Col>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Match Number</th>
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
                        <tbody>
                            <tr key={match.matchNumber}>
                                <td>{match.matchNumber}</td>
                                <td class="bg-primary bg-opacity-10">{match.blueOneTeamNumber}</td>
                                <td class="bg-primary bg-opacity-10">{match.blueTwoTeamNumber}</td>
                                <td class="bg-primary bg-opacity-10">{match.blueThreeTeamNumber}</td>
                                <td class="bg-danger bg-opacity-10">{match.redOneTeamNumber}</td>
                                <td class="bg-danger bg-opacity-10">{match.redTwoTeamNumber}</td>
                                <td class="bg-danger bg-opacity-10">{match.redThreeTeamNumber}</td>
                                <td>{match.blueScore}</td>
                                <td>{match.redScore}</td>
                            </tr>
                        </tbody>
                    </table>
                </Col>
            </Row>
        </Container>
    );
}

export default Matchdetails;
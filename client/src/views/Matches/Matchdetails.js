import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import BackButton from '../common/BackButton';
import { Col, Container, Row } from "react-bootstrap";
import { APP_DATABASE_URL } from "../../constant/constant";
import { arrayLookup } from "../../utils/common";
import { FaCircleInfo } from "react-icons/fa6";

const Matchdetails = () => {
    const [match, setMatch] = useState(null);
    const [matchdata, setMatchdata] = useState([]);
    const [team, setTeam] = useState([]);
    
    let matchId = null;
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    matchId = searchParams.get('matchId');

    useEffect(() => {
        if (!matchId) return;
        
        axios.get(`${APP_DATABASE_URL}/match/${matchId}`)
        .then(response => setMatch(response.data))
        .catch(error => console.error('Error fetching data:', error));
        
        axios.get(`${APP_DATABASE_URL}/teams`)
        .then(response => setTeam(response.data))
        .catch(error => console.error('Error fetching data:', error));
        
    }, [matchId]);

    
    useEffect(() => {
        if (match && match.matchKey) {
            axios.get(`${APP_DATABASE_URL}/matchData/2025/matchkey/${match.matchKey}`)
            .then(response => setMatchdata(response.data))
            .catch(error => console.error('Error fetching data:', error));
        }
    }, [match]);


    return (
        <Container>
            <Row>
                <Col md={1}><BackButton /></Col>
                <Col md={11}><h2>{match ? match.matchKey : matchId}</h2></Col>
            </Row>
            <Row><hr></hr></Row>
            {match ? (
                <>
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
                                <td className="bg-primary bg-opacity-10"><Link to={`/team/?teamId=${arrayLookup(match.blueOneTeamNumber, team, "teamNumber", "id")}`}>{match.blueOneTeamNumber}</Link></td>
                                <td className="bg-primary bg-opacity-10"><Link to={`/team/?teamId=${arrayLookup(match.blueTwoTeamNumber, team, "teamNumber", "id")}`}>{match.blueTwoTeamNumber}</Link></td>
                                <td className="bg-primary bg-opacity-10"><Link to={`/team/?teamId=${arrayLookup(match.blueThreeTeamNumber, team, "teamNumber", "id")}`}>{match.blueThreeTeamNumber}</Link></td>
                                <td className="bg-danger bg-opacity-10"><Link to={`/team/?teamId=${arrayLookup(match.redOneTeamNumber, team, "teamNumber", "id")}`}>{match.redOneTeamNumber}</Link></td>
                                <td className="bg-danger bg-opacity-10"><Link to={`/team/?teamId=${arrayLookup(match.redTwoTeamNumber, team, "teamNumber", "id")}`}>{match.redTwoTeamNumber}</Link></td>
                                <td className="bg-danger bg-opacity-10"><Link to={`/team/?teamId=${arrayLookup(match.redThreeTeamNumber, team, "teamNumber", "id")}`}>{match.redThreeTeamNumber}</Link></td>
                                <td>{match.blueScore}</td>
                                <td>{match.redScore}</td>
                            </tr>
                        </tbody>
                    </table>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Link to={`/robotsummary/?matchId=${match.id}`}><button className="btn btn-primary">Robot Summary</button></Link>
                </Col>
            </Row>
            <Row>
                <Col>
                    <table className="table"> 
                        <thead>
                            <tr>
                                <th>Team Number</th>
                                <th>Scouter</th>
                                <th>Position</th>
                                <th>Robot Position</th>
                                <th>Auton Coral</th>
                                <th>Auton Processor</th>
                                <th>Auton Net</th>
                                <th>TeleOp Coral</th>
                                <th>TeleOp Processor</th>
                                <th>TeleOp Net</th>
                                <th>Alage Removed</th>
                                <th>Climb Position</th>
                                <th>Coral Pick-Up</th>
                                <th>Coral Pick-Up Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {matchdata.map(matchdata => (
                                <tr key= {matchdata.teamNumber}>
                                    <td><Link to={`/team/?teamId=${arrayLookup(matchdata.teamNumber, team, "teamNumber", "id")}`}> {matchdata.teamNumber}</Link></td>
                                    <td>{matchdata.scouterName}</td>
                                    <td>{matchdata.allianceLocation}</td>
                                    <td>{matchdata.autonPosition}</td>
                                    <td>{matchdata.autonReefTotal}</td>
                                    <td>{matchdata.autonProcessorScored}</td>
                                    <td>{matchdata.autonNetScored}</td>
                                    <td>{matchdata.teleopReefTotal}</td>
                                    <td>{matchdata.teleopProcessorScored}</td>
                                    <td>{matchdata.teleopNetScored}</td>
                                    <td>{matchdata.totalAlgeaRemoved}</td>
                                    <td>{matchdata.bargeZonLocation}</td>
                                    <td>
                                        {matchdata.schemaVersion === '2025.2.0' 
                                            ? matchdata.totalCoralPickup 
                                            : (matchdata.totalCoralGroundPickup + matchdata.totalCoralStationPickup)}
                                    </td>
                                    <td>
                                        {matchdata.schemaVersion === '2025.2.0'
                                            ? `${matchdata.coralIntakeTypeGround ? 'G' : ''}${matchdata.coralIntakeTypeStation ? 'S' : ''}`
                                            : `${matchdata.totalCoralGroundPickup > 0 ? 'G' : ''}${matchdata.totalCoralStationPickup  > 0 ? 'S' : ''}`}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Col>
            </Row>
            </>
            ) : (
                <Row>
                    <Col>
                        <h3><FaCircleInfo className='react-icons' size='1.5em' /> No data available for this match.</h3>
                    </Col>
                </Row>
            )}
        </Container>
    );
}

export default Matchdetails;
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';

const Eventdetail = () => {
    const [event, setEvent] = useState([]);
    const [team, setTeam] = useState([]);
    const [match, setMatch] = useState([]);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const eventid = searchParams.get('eventId');

    useEffect(() => {
        axios.get('http://localhost:3001/api/v1/events/' + eventid)
        //axios.get('https://super-sniffle-q4v55jpj9wcqrq-3001.app.github.dev/event/{event.key}')
        .then(response => setEvent(response.data))
        .catch(error => console.error('Error fetching data:', error));
        }, []);
    
    useEffect(() => {
        axios.get('http://localhost:3001/api/v1/eventteams/' + eventid)
        //axios.get('https://super-sniffle-q4v55jpj9wcqrq-3001.app.github.dev/api/v1/teams')
        .then(response => setTeam(response.data))
        .catch(error => console.error('Error fetching data:', error));
        }, []);

    useEffect(() => {
        axios.get('http://localhost:3001/api/v1/matches/' + eventid)
        //axios.get('https://super-sniffle-q4v55jpj9wcqrq-3001.app.github.dev/event/{event.key}')
        .then(response => setMatch(response.data))
        .catch(error => console.error('Error fetching data:', error));
        }, []);

    return (
<>
<div className = "container">
    <h1>{event.name}</h1>
    <hr></hr>
    <p>Search query: {eventid}</p>
    <div className = "container">
        <div className = "row">
            <div className = "col">
            </div>
        </div>
        <div className = "row">
            <div className = "col"><h2>Matches:</h2>
            <table className="table table-bordered">
                    <thead>
                        <tr>
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
                    <tbody>
                        {match.map(match => (
                            <tr>
                                <td>{match.matchKey}</td>
                                <td class="bg-primary bg-opacity-10">{match.blueOneTeamNumber}</td>
                                <td class="bg-primary bg-opacity-10">{match.blueTwoTeamNumber}</td>
                                <td class="bg-primary bg-opacity-10">{match.blueThreeTeamNumber}</td>
                                <td class="bg-danger bg-opacity-10">{match.redOneTeamNumber}</td>
                                <td class="bg-danger bg-opacity-10">{match.redTwoTeamNumber}</td>
                                <td class="bg-danger bg-opacity-10">{match.redThreeTeamNumber}</td>
                                <td>{match.blueScore}</td>
                                <td>{match.redScore}</td>
                            </tr>
                        ))}
                    </tbody>
            </table>
            </div>

            <div className = "col"><h2>Team List:</h2>
            <table className="table"> 
                    <thead>
                        <tr>
                            <th>Teams Number</th>
                            <th>Team Name</th>
                        </tr>
                    </thead>
                    <tbody>
                    {team.map(team => (
                        <tr>
                            <td><Link to={`/team/?teamId=${team.id}`}>{team.teamNumber}</Link></td>
                            <td>{team.nickname}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

        </div>
    </div>
</div>
</>
    );
}

export default Eventdetail;
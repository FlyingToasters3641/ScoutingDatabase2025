import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import BackButton from '../common/BackButton';

const Team = () => {
    const [team, setTeam] = useState([]);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const teamid = searchParams.get('teamId');

    useEffect(() => {
        axios.get('http://localhost:3001/api/v1/teams/' + teamid)
        //axios.get('https://super-sniffle-q4v55jpj9wcqrq-3001.app.github.dev/event/{event.key}')
        .then(response => setTeam(response.data))
        .catch(error => console.error('Error fetching data:', error));
        }, []);

    return (
        <>
        <div className = "container">
            <BackButton />
            <h1> {team.teamNumber} - {team.nickname}</h1>
            <hr></hr>
        </div>
        </>
    );
}

export default Team;
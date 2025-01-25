import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import BackButton from '../common/BackButton';

const Matchdetails = () => {
    const [match, setMatch] = useState([]);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const matchId = searchParams.get('matchId');

    useEffect(() => {
        axios.get('http://localhost:3001/api/v1/match/' + matchId)
        //axios.get('https://super-sniffle-q4v55jpj9wcqrq-3001.app.github.dev/event/{event.key}')
        .then(response => setMatch(response.data))
        .catch(error => console.error('Error fetching data:', error));
        }, [matchId]);

    return (
        <>
        <div className = "container">
            <BackButton />
            <h1> {match.matchKey} </h1>
            <hr></hr>
        </div>
        </>
    );
}

export default Matchdetails;
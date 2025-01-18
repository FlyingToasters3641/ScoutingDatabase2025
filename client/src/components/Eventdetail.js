import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Eventdetail = () => {
    const [event, setEvent] = useState([]);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('eventId');

    useEffect(() => {
        axios.get('http://localhost:3001/api/v1/events/' + query)
        //axios.get('https://super-sniffle-q4v55jpj9wcqrq-3001.app.github.dev/event/{event.key}')
        .then(response => setEvent(response.data))
        .catch(error => console.error('Error fetching data:', error));
        }, []);

    return (
<>
<div className = "container">
    <h1>{event.name}</h1>
    <hr></hr>
    <p>Search query: {query}</p>
</div>
</>
    );
}

export default Eventdetail;
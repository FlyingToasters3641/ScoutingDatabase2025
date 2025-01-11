import React, { useState, useEffect } from "react";
import axios from 'axios';

const Home = () => {
    const [events, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/events')
        //axios.get('https://super-sniffle-q4v55jpj9wcqrq-3001.app.github.dev/users')
        .then(response => setPosts(response.data))
        .catch(error => console.error('Error fetching data:', error));
        }, []);


    return (
<>
<div className = "container">
    <h2>The Flying Toaster's Scouting Database</h2>
    <hr></hr>
    <div className = "container">
        <div className = "row">
            <div className = "col">
                <table className="table"> 
                    <thead>
                        <tr>
                        <th><h2>Events</h2></th>
                        </tr>
                    </thead>
                    <tbody>
                    {events.map(event => (
                        <tr>
                            <td>{event.name} - ({event.key})</td>
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

export default Home;
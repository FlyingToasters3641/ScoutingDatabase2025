import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

const Eventimport = () => {
    const [eventkey, setEventkey] = useState("");
    
    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`Event Key entered: ${eventkey}`);
    }
    
    return (
        <Container>
            <h1>Event Import</h1>
            <h3>Import an Event from <a href="https://www.thebluealliance.com/" target="_blank">The Blue Alliance</a> using an Event Key:</h3>
            <hr></hr>
            <form onSubmit={handleSubmit}>
                <label>Event Key:
                    <input 
                        type="text" 
                        value={eventkey}
                        onChange={(e) => setEventkey(e.target.value)}
                    />
                </label>
                <input type="submit"/>
            </form>
        </Container>
    );

}

export default Eventimport;
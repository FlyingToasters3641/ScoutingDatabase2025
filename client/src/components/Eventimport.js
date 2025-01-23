import { useState } from "react";

const Eventimport = () => {
    const [eventkey, setEventkey] = useState("");
    
    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`Event Key entered: ${eventkey}`);
    }
    
    return (
        <>
        <div className = "container">
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
        </div>
        </>
    );

}
export default Eventimport;
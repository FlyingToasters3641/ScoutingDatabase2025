import { useEffect, useState } from "react";
import axios from 'axios';
import Html5QrcodePlugin from "../../components/Html5QrcodePlugin.js";
import { Container, Row, Col } from "react-bootstrap";
import { sha1 } from "js-sha1";
import './Matches.css';

const Dataimport = () => {

    const [matchData, setMatchData] = useState([]);

    const [scannedData, setScannedData] = useState('');
    const [scannedDataSHA1, setScannedDataSHA1] = useState('');
    const [scannedState, setScannedState] = useState('Waitting...');
    
    useEffect(() => {
        axios.get('http://localhost:3001/api/v1/matchData/uniqueid/' + scannedDataSHA1)
        .then(response => {
            console.log("Unqiceid Resolt:"+JSON.stringify(response.data))
            if (response.data.length > 0) {
                setScannedState('Already in database');
            }
            else {
                setScannedState('Not in database');
                axios.post('http://localhost:3001/api/v1/matchData',
                    {
                        uniqueId: scannedDataSHA1
                    },
                    { headers: { 'Content-Type': 'application/json' } })
            }
        })
        .catch(error => console.error('Error fetching data:', error));
    }, [scannedDataSHA1]);

    const onNewScanResult = (decodedText, decodedResult) => {
        setScannedData(decodedText);
        setScannedDataSHA1(sha1(decodedText));

        console.log(`Scan result:${scannedDataSHA1}| ${decodedText}`);
    };

    return (
        <Container>
            <Row>
                <Col md={12}> 
                    <h1>Import Scouting Data</h1>
                    <hr></hr>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <h3>Scan QR Codes to import data:</h3>
                    <Html5QrcodePlugin
                        fps={10}
                        qrbox={500}
                        disableFlip={false}
                        qrCodeSuccessCallback={onNewScanResult}
                    />
                </Col>
            </Row>
            <Row>
                <Col><h2>{ scannedState }</h2></Col>
            </Row>
            <Row>
                <Col>
                    <p>scannedData:<br></br><textarea value={scannedData} className="resizable-textarea" /></p>
                    <p>SHA1:<br></br><textarea value={scannedDataSHA1} className="resizable-textarea" /></p>
                </Col>  
            </Row>  
        </Container>
    );
}

export default Dataimport;
import { useEffect, useState } from "react";
import axios from 'axios';
import Html5QrcodePlugin from "../../components/Html5QrcodePlugin.js";
import { Container, Row, Col, ProgressBar } from "react-bootstrap";
import { sha1 } from "js-sha1";
import { APP_DATABASE_URL } from "../../constant/constant";
import './Matches.css';
import BackButton from '../common/BackButton';

const Dataimport = () => {

    const [progress, setProgress] = useState(0);

    const [scannedData, setScannedData] = useState('');
    const [scannedDataSHA1, setScannedDataSHA1] = useState('');
    const [scannedState, setScannedState] = useState('Waitting...');
    
    useEffect(() => {
        axios.get(`${APP_DATABASE_URL}/matchData/uniqueid/${scannedDataSHA1}`)
        .then(response => {
            console.log("UniqueId Result:"+JSON.stringify(response.data))
            if (response.data.length > 0) {
                setScannedState('Already in database');
            }
            else {
                setScannedState('Not in database');
                axios.post(`${APP_DATABASE_URL}/matchData`,
                    {
                        "uniqueId": scannedDataSHA1
                    },
                    { headers: { 'Content-Type': 'application/json' } })
            }
        })
        .catch(error => console.error('Error fetching data:', error));
    }, [scannedDataSHA1]);

    useEffect(() => {
        const intervalId = setInterval(() => {
          setProgress((prevProgress) => {
            if (prevProgress > 0){
              return prevProgress - 1;
            }
            clearInterval(intervalId);
            return prevProgress;
          });
        }, 50);
    
        return () => clearInterval(intervalId);
      });

    const onNewScanResult = (decodedText, decodedResult) => {
        setScannedData(decodedText);
        setScannedDataSHA1(sha1(decodedText));
        setProgress(126);

        console.log(`Scan result:${scannedDataSHA1}| ${decodedText}`);
    };

    return (
        <Container>
            <Row>
                <Col md={1}><BackButton /></Col>
                <Col md={11}> 
                    <h1>Import Scouting Data</h1>
                </Col>
                <hr></hr>
            </Row>
            <Row>
                <Col><ProgressBar variant="success" now={progress}/></Col>
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
                <Col><h3>{ scannedState }</h3></Col>
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
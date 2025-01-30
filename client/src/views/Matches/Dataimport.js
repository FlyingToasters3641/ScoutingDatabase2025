import { useState } from "react";
import Html5QrcodePlugin from "../../components/Html5QrcodePlugin.js";
import { Container, Row, Col } from "react-bootstrap";
import { sha1 } from "js-sha1";
import './Matches.css';

const Dataimport = () => {

    const [scannedData, setScannedData] = useState('');
    const [scannedDataSHA1, setScannedDataSHA1] = useState('');
    const [scannedState, setScannedState] = useState('Waitting...');
    // const [lastResult, setLastResult] = useState('');
    // const [countResults, setCountResults] = useState('');
    
    const onNewScanResult = (decodedText, decodedResult) => {
        alert(`Scan result:${decodedText}`);
        // if (decodedText !== lastResult) {
        //     ++countResults;
        // }
        //alert(` Decoded Text: ${decodedText}`);
        setScannedData(decodedText);
        setScannedState('Success');
        setScannedDataSHA1(sha1(decodedText));

        console.log(`Scan result:${scannedDataSHA1}| ${decodedText}`);
    };
    
    

    const onScanSuccess = (decodedText, decodedResult) => {
        //setScannedData(decodedText);
    };

    const onError = (error) => {
    console.error(error);
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
                        onScanSuccess={onScanSuccess}
                        onError={onError}
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
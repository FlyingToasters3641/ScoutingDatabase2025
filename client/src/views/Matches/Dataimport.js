import { useState } from "react";
import Html5QrcodePlugin from "../../components/Html5QrcodePlugin.js";
import { Container, Row, Col } from "react-bootstrap";

const Dataimport = () => {

    const [scannedData, setScannedData] = useState('');
    const [scannedState, setScannedState] = useState('Waitting...');
    // const [lastResult, setLastResult] = useState('');
    // const [countResults, setCountResults] = useState('');
    
    const onNewScanResult = (decodedText, decodedResult) => {
        // if (decodedText !== lastResult) {
        //     ++countResults;
        // }
        //alert(` Decoded Text: ${decodedText}`);
        setScannedData(decodedText);
        setScannedState('Success');
        console.log(`Scan result: ` + JSON.stringify(decodedResult) + `| ${decodedText}`);
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
                <Col md={2}><h2>{ scannedState }</h2></Col>
                <Col>{ scannedData }</Col>
            </Row>
        </Container>
    );
}

export default Dataimport;
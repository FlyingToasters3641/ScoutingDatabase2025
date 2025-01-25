import { useState } from "react";
import Html5QrcodePlugin from "../../components/Html5QrcodePlugin.js";
import { Container, Row, Col } from "react-bootstrap";

const Dataimport = () => {
    
    const onNewScanResult = (decodedText, decodedResult) => {
        alert(` Decoded Text: ${decodedText}`);
        console.log(`Scan result: ` + JSON.stringify(decodedResult) + `| ${decodedText}`);
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
        </Container>
    );
}

export default Dataimport;
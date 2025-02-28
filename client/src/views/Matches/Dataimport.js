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

    // This useEffect is for importing data from QR code scanned
    useEffect(() => { 
        const inportQRdata = async () => {
            // Calculate SHA1 of scannedData
            let scannedDataSHA1 = sha1(scannedData);
            setScannedDataSHA1(scannedDataSHA1);

            // Check if this QR code is already in database
            let inDatabase = false
            await axios.get(`${APP_DATABASE_URL}/matchData/2025/uniqueid/${scannedDataSHA1}`)
            .then(response => {
                if (response.data.length > 0) {
                    inDatabase = true;
                    setScannedState('Already in database');
                    console.log("Already in databaseUnique: Id Result:"+scannedDataSHA1)
                }
            })

            if(!inDatabase){
                // Import data to database
                let data = JSON.parse(scannedData);
                // alert(data.schemaVar);
                await axios.post(`${APP_DATABASE_URL}/matchData/2025`,
                    {
                        scouterName: data.data.currentScout,
                        matchNumber: data.data.currentMatch,
                        teamNumber: data.data.currentTeam,
                        eventKey: '2025mimil',
                        matchKey: '2025mimil_qm' + data.data.currentMatch,
                        event_id: 1,
                        // position: AKA Red 1
                        autonPosition: data.data.sl,
                        //autonReefTotal: 
                        autonProcessorScored: data.data.aps,
                        autonNetScored: data.data.ans,
                        //teleopReefTotal:
                        teleopProcessorScored: data.data.tps,
                        teleopNetScored: data.data.tns,
                        //totalAlgeaRemoved:
                        bargeZonLocation: data.data.bzl,
                        //totalCoralGroundPickup:
                        //totalCoralStationPickup:
                        //totalAlgaePickup:


                        uniqueId: scannedDataSHA1,
                    },
                    { headers: { 'Content-Type': 'application/json' } })
            }
            setScannedState('Data imported');
            setProgress(126);
        }

        // Execute inportQRdata() only if scannedData is not empty
        if(scannedData !== '') {
            inportQRdata();
        }
        

    }, [scannedData]);


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
                <Col md={9}>
                    <h3>Scan QR Codes to import data:</h3>
                    <Html5QrcodePlugin
                        fps={10}
                        qrbox={600}
                        disableFlip={false}
                        qrCodeSuccessCallback={onNewScanResult}
                    />
                </Col>
                <Col md={3}></Col>
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
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
                        allianceLocation: data.data.allianceLocation,
                        autonPosition: data.data.sl,
                        //autonReefTotal: 
                        autonProcessorScored: data.data.aps,
                        autonNetScored: data.data.ans,
                        //teleopReefTotal:
                        teleopProcessorScored: data.data.tps,
                        teleopNetScored: data.data.tns,
                        //totalAlgeaRemoved:
                        bargeZonLocation: data.data.bzl,
                        totalCoralGroundPickup: data.data.acgp + data.data.tcgp,
                        totalCoralStationPickup: data.data.acsp + data.data.tcsp,
                        totalAlgaePickup: data.data.aap + data.data.tap,

                        // Rest of the data
                        fieldOrientation: data.data.fieldOrientation,
                        autonCoralMissed: data.data.acm,
                        autonNetScored: data.data.ans,
                        autonNetMissed: data.data.anm,
                        autonProcessorScored: data.data.aps,
                        autonProcessorMissed: data.data.apm,
                        autonCoralGroundPickup: data.data.acgp,
                        autonCoralStationPickup: data.data.acsp,
                        autonAlgaePickup: data.data.aap,
                        autonReefLevel1A: data.data.al1A,
                        autonReefLevel2A: data.data.al2A,
                        autonReefLevel3A: data.data.al3A,
                        autonReefLevel4A: data.data.al4A,
                        autonReefLevel1C: data.data.al1C,
                        autonReefLevel2C: data.data.al2C,
                        autonReefLevel3C: data.data.al3C,
                        autonReefLevel4C: data.data.al4C,
                        autonReefLevel1E: data.data.al1E,
                        autonReefLevel2E: data.data.al2E,
                        autonReefLevel3E: data.data.al3E,
                        autonReefLevel4E: data.data.al4E,
                        autonReefLevel1G: data.data.al1G,
                        autonReefLevel2G: data.data.al2G,
                        autonReefLevel3G: data.data.al3G,
                        autonReefLevel4G: data.data.al4G,
                        autonReefLevel1I: data.data.al1I,
                        autonReefLevel2I: data.data.al2I,
                        autonReefLevel3I: data.data.al3I,
                        autonReefLevel4I: data.data.al4I,
                        autonReefLevel1K: data.data.al1K,
                        autonReefLevel2K: data.data.al2K,
                        autonReefLevel3K: data.data.al3K,
                        autonReefLevel4K: data.data.al4K,
                        autoAlgaeRemovedA: data.data.aalA,
                        autoAlgaeRemovedC: data.data.aalC,
                        autoAlgaeRemovedE: data.data.aalE,
                        autoAlgaeRemovedG: data.data.aalG,
                        autoAlgaeRemovedI: data.data.aalI,
                        autoAlgaeRemovedK: data.data.aalK,
                        teleopCoralMissed: data.data.tcm,
                        teleopNetScored: data.data.tns,
                        teleopNetMissed: data.data.tnm,
                        teleopProcessorScored: data.data.tps,
                        teleopProcessorMissed: data.data.tpm,
                        teleopCoralGroundPickup: data.data.tcgp,
                        teleopCoralStationPickup: data.data.tcsp,
                        teleopAlgaePickup: data.data.tap,
                        teleopReefLevel1A: data.data.tl1A,
                        teleopReefLevel2A: data.data.tl2A,
                        teleopReefLevel3A: data.data.tl3A,
                        teleopReefLevel4A: data.data.tl4A,
                        teleopReefLevel1C: data.data.tl1C,
                        teleopReefLevel2C: data.data.tl2C,
                        teleopReefLevel3C: data.data.tl3C,
                        teleopReefLevel4C: data.data.tl4C,
                        teleopReefLevel1E: data.data.tl1E,
                        teleopReefLevel2E: data.data.tl2E,
                        teleopReefLevel3E: data.data.tl3E,
                        teleopReefLevel4E: data.data.tl4E,
                        teleopReefLevel1G: data.data.tl1G,
                        teleopReefLevel2G: data.data.tl2G,
                        teleopReefLevel3G: data.data.tl3G,
                        teleopReefLevel4G: data.data.tl4G,
                        teleopReefLevel1I: data.data.tl1I,
                        teleopReefLevel2I: data.data.tl2I,
                        teleopReefLevel3I: data.data.tl3I,
                        teleopReefLevel4I: data.data.tl4I,
                        teleopReefLevel1K: data.data.tl1K,
                        teleopReefLevel2K: data.data.tl2K,
                        teleopReefLevel3K: data.data.tl3K,
                        teleopReefLevel4K: data.data.tl4K,
                        teleopAlgaeRemovedA: data.data.talA,
                        teleopAlgaeRemovedC: data.data.talC,
                        teleopAlgaeRemovedE: data.data.talE,
                        teleopAlgaeRemovedG: data.data.talG,
                        teleopAlgaeRemovedI: data.data.talI,
                        teleopAlgaeRemovedK: data.data.talK,
                        bargeZonLocation: data.data.bzl,
                        scouterNotesPicklist: data.data.snp,
                        scouterNotesOther: data.data.sno,
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
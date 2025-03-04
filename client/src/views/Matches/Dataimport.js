import { useEffect, useState } from "react";
import axios from 'axios';
import Html5QrcodePlugin from "../../components/Html5QrcodePlugin.js";
import { Container, Row, Col, ProgressBar } from "react-bootstrap";
import { sha1 } from "js-sha1";
import { APP_DATABASE_URL } from "../../constant/constant";
import './Matches.css';
import BackButton from '../common/BackButton';

const Dataimport = () => {

    const [progressBarStatus, setProgressBarStatus] = useState(0);

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
                let matchData = data.data;
                let autonReefTotal = matchData.al1A + matchData.al2A + matchData.al3A + matchData.al4A + matchData.al1C + matchData.al2C + matchData.al3C + matchData.al4C + matchData.al1E + matchData.al2E + matchData.al3E + matchData.al4E + matchData.al1G + matchData.al2G + matchData.al3G + matchData.al4G + matchData.al1I + matchData.al2I + matchData.al3I + matchData.al4I + matchData.al1K + matchData.al2K + matchData.al3K + matchData.al4K;
                let autonAlgeaRemovedTotal = matchData.aalA + matchData.aalB + matchData.aalC + matchData.aalD + matchData.aalE + matchData.aalF;
                let teleopReefTotal = matchData.tl1A + matchData.tl2A + matchData.tl3A + matchData.tl4A + matchData.tl1C + matchData.tl2C + matchData.tl3C + matchData.tl4C + matchData.tl1E + matchData.tl2E + matchData.tl3E + matchData.tl4E + matchData.tl1G + matchData.tl2G + matchData.tl3G + matchData.tl4G + matchData.tl1I + matchData.tl2I + matchData.tl3I + matchData.tl4I + matchData.tl1K + matchData.tl2K + matchData.tl3K + matchData.tl4K;
                let teleopAlgeaRemovedTotal = matchData.talA + matchData.talB + matchData.talC + matchData.talD + matchData.talE + matchData.talF;
                
                let totalReef = autonReefTotal + teleopReefTotal;
                let totalAlgeaRemoved = autonAlgeaRemovedTotal + teleopAlgeaRemovedTotal;

                await axios.post(`${APP_DATABASE_URL}/matchData/2025`,
                {
                    scouterName: matchData.currentScout,
                    matchNumber: matchData.currentMatch,
                    teamNumber: matchData.currentTeam,
                    eventKey: '2025mimil',
                    matchKey: '2025mimil_qm' + matchData.currentMatch,
                    event_id: 1,
                    allianceLocation: matchData.allianceLocation,
                    fieldOrientation: matchData.fieldOrientation,
                    
                    // calculated data
                    totalReef: totalReef,
                    totalAlgeaRemoved: totalAlgeaRemoved,
                    totalCoralGroundPickup: matchData.acgp + matchData.tcgp,
                    totalCoralStationPickup: matchData.acsp + matchData.tcsp,
                    totalAlgaePickup: matchData.aap + matchData.tap,
                    
                    // Auton data
                    autonPosition: matchData.sl,
                    autonCoralMissed: matchData.acm,
                    autonNetScored: matchData.ans,
                    autonNetMissed: matchData.anm,
                    autonProcessorScored: matchData.aps,
                    autonProcessorMissed: matchData.apm,
                    autonCoralGroundPickup: matchData.acgp,
                    autonCoralStationPickup: matchData.acsp,
                    autonAlgaePickup: matchData.aap,
                    autonReefLevel1A: matchData.al1A,
                    autonReefLevel2A: matchData.al2A,
                    autonReefLevel3A: matchData.al3A,
                    autonReefLevel4A: matchData.al4A,
                    autonReefLevel1C: matchData.al1C,
                    autonReefLevel2C: matchData.al2C,
                    autonReefLevel3C: matchData.al3C,
                    autonReefLevel4C: matchData.al4C,
                    autonReefLevel1E: matchData.al1E,
                    autonReefLevel2E: matchData.al2E,
                    autonReefLevel3E: matchData.al3E,
                    autonReefLevel4E: matchData.al4E,
                    autonReefLevel1G: matchData.al1G,
                    autonReefLevel2G: matchData.al2G,
                    autonReefLevel3G: matchData.al3G,
                    autonReefLevel4G: matchData.al4G,
                    autonReefLevel1I: matchData.al1I,
                    autonReefLevel2I: matchData.al2I,
                    autonReefLevel3I: matchData.al3I,
                    autonReefLevel4I: matchData.al4I,
                    autonReefLevel1K: matchData.al1K,
                    autonReefLevel2K: matchData.al2K,
                    autonReefLevel3K: matchData.al3K,
                    autonReefLevel4K: matchData.al4K,
                    autonReefTotal: autonReefTotal,
                    autoAlgaeRemovedA: matchData.aalA,
                    autoAlgaeRemovedB: matchData.aalB,
                    autoAlgaeRemovedC: matchData.aalC,
                    autoAlgaeRemovedD: matchData.aalD,
                    autoAlgaeRemovedE: matchData.aalE,
                    autoAlgaeRemovedF: matchData.aalF,
                    autonAlgeaRemovedTotal: autonAlgeaRemovedTotal,

                    // Teleop data
                    teleopCoralMissed: matchData.tcm,
                    teleopNetScored: matchData.tns,
                    teleopNetMissed: matchData.tnm,
                    teleopProcessorScored: matchData.tps,
                    teleopProcessorMissed: matchData.tpm,
                    teleopCoralGroundPickup: matchData.tcgp,
                    teleopCoralStationPickup: matchData.tcsp,
                    teleopAlgaePickup: matchData.tap,
                    teleopReefLevel1A: matchData.tl1A,
                    teleopReefLevel2A: matchData.tl2A,
                    teleopReefLevel3A: matchData.tl3A,
                    teleopReefLevel4A: matchData.tl4A,
                    teleopReefLevel1C: matchData.tl1C,
                    teleopReefLevel2C: matchData.tl2C,
                    teleopReefLevel3C: matchData.tl3C,
                    teleopReefLevel4C: matchData.tl4C,
                    teleopReefLevel1E: matchData.tl1E,
                    teleopReefLevel2E: matchData.tl2E,
                    teleopReefLevel3E: matchData.tl3E,
                    teleopReefLevel4E: matchData.tl4E,
                    teleopReefLevel1G: matchData.tl1G,
                    teleopReefLevel2G: matchData.tl2G,
                    teleopReefLevel3G: matchData.tl3G,
                    teleopReefLevel4G: matchData.tl4G,
                    teleopReefLevel1I: matchData.tl1I,
                    teleopReefLevel2I: matchData.tl2I,
                    teleopReefLevel3I: matchData.tl3I,
                    teleopReefLevel4I: matchData.tl4I,
                    teleopReefLevel1K: matchData.tl1K,
                    teleopReefLevel2K: matchData.tl2K,
                    teleopReefLevel3K: matchData.tl3K,
                    teleopReefLevel4K: matchData.tl4K,
                    teleopReefTotal: teleopReefTotal,
                    teleopAlgaeRemovedA: matchData.talA,
                    teleopAlgaeRemovedB: matchData.talB,
                    teleopAlgaeRemovedC: matchData.talC,
                    teleopAlgaeRemovedD: matchData.talD,
                    teleopAlgaeRemovedE: matchData.talE,
                    teleopAlgaeRemovedF: matchData.talF,
                    teleopAlgeaRemovedTotal: teleopAlgeaRemovedTotal,

                    // The rest of the data
                    bargeZonLocation: matchData.bzl,
                    scouterNotesPicklist: matchData.snp,
                    scouterNotesOther: matchData.sno,
                    uniqueId: scannedDataSHA1,
                },
                { headers: { 'Content-Type': 'application/json' } })
            
                // Import data to database complete
                setScannedState('Data imported');
                setProgressBarStatus(105);
            }
        }

        // Execute inportQRdata() only if scannedData is not empty
        if(scannedData !== '') {
            inportQRdata();
        }
        

    }, [scannedData]);

    // This useEffect is for progress bar
    useEffect(() => {
        let timer = setTimeout(() => {
            setProgressBarStatus((prevProgress) => {
                if (prevProgress > 10) {
                    return prevProgress - 10;
                }
                return 0;
            });
        }, 500);
        // console.log('ProgressBarStatus: ', progressBarStatus);
        if(progressBarStatus === 0) {
            setScannedData('');
            setScannedDataSHA1('');
            setScannedState('Waitting...');
        }
        return () => clearTimeout(timer);
    }, [progressBarStatus]);

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
                <Col><ProgressBar variant="success" now={progressBarStatus}/></Col>
            </Row>
            <Row>
                <Col md={8}>
                    <h3>Scan QR Codes to import data: {scannedState}</h3>
                    <Html5QrcodePlugin
                        fps={10}
                        qrbox={550}
                        disableFlip={false}
                        qrCodeSuccessCallback={onNewScanResult}
                    />
                </Col>
                <Col md={4}>
                    <p>scannedData:<br></br><textarea value={scannedData} className="resizable-textarea" /></p>
                    <p>SHA1:<br></br><textarea value={scannedDataSHA1} className="resizable-textarea" /></p>
                </Col>
            </Row>
        </Container>
    );
}

export default Dataimport;
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
    const [scannedState, setScannedState] = useState('Waiting...');

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

                let botLocationEnum = [];
                const botLocationViewSbEnum = ['None', 'Left', 'Center', 'Right']; // Scoring Blue, Spectator Red
                const botLocationViewSrEnum = ['None', 'Right', 'Center', 'Left']; // Scoring Red, Spectator Blue

                // leftFieldOrientation is used to determine mapping for Reef scouted data to reference to the field orientation
                //  and will be used to determine the mapping of the data to the database
                // For Reef Coral, 
                //  - Left: A->A, C->C, E->E, G->G, I->I, K->K (Scoring, Blue; Spectator, Red)
                //  - Right: A->G, C->I, E->K, G->A, I->C, K->E (Scoring, Red; Spectator, Blue)
                // For Reef Algea,
                //  - Left: A->A, B->B, C->C, D->D, E->E, F->F (Scoring, Blue; Spectator, Red)
                //  - Right: A->D, B->E, C->F, D->A, E->B, F->C (Scoring, Red; Spectator, Blue)
                let leftFieldOrientation = true;
                if ( (matchData.allianceLocation[0] === 'R' && matchData.fieldOrientation === "Scoring") ||
                     (matchData.allianceLocation[0] === 'B' && matchData.fieldOrientation === "Spectator") ) {
                    leftFieldOrientation = false;
                    botLocationEnum = [...botLocationViewSrEnum]; // Scoring Red, Spectator Blue
                }
                else {
                    leftFieldOrientation = true
                    botLocationEnum = [...botLocationViewSbEnum]; // Scoring Blue, Spectator Red
                }

                // Entering the data from the scanned QR code to the database
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
                    autonPosition: botLocationEnum[matchData.sl],
                    autonCoralMissed: matchData.acm,
                    autonNetScored: matchData.ans,
                    autonNetMissed: matchData.anm,
                    autonProcessorScored: matchData.aps,
                    autonProcessorMissed: matchData.apm,
                    autonCoralGroundPickup: matchData.acgp,
                    autonCoralStationPickup: matchData.acsp,
                    autonAlgaePickup: matchData.aap,
                    autonReefLevel1A: leftFieldOrientation ? matchData.al1A : matchData.al1G,
                    autonReefLevel2A: leftFieldOrientation ? matchData.al2A : matchData.al2G,
                    autonReefLevel3A: leftFieldOrientation ? matchData.al3A : matchData.al3G,
                    autonReefLevel4A: leftFieldOrientation ? matchData.al4A : matchData.al4G,
                    autonReefLevel1C: leftFieldOrientation ? matchData.al1C : matchData.al1I,
                    autonReefLevel2C: leftFieldOrientation ? matchData.al2C : matchData.al2I,
                    autonReefLevel3C: leftFieldOrientation ? matchData.al3C : matchData.al3I,
                    autonReefLevel4C: leftFieldOrientation ? matchData.al4C : matchData.al4I,
                    autonReefLevel1E: leftFieldOrientation ? matchData.al1E : matchData.al1K,
                    autonReefLevel2E: leftFieldOrientation ? matchData.al2E : matchData.al2K,
                    autonReefLevel3E: leftFieldOrientation ? matchData.al3E : matchData.al3K,
                    autonReefLevel4E: leftFieldOrientation ? matchData.al4E : matchData.al4K,
                    autonReefLevel1G: leftFieldOrientation ? matchData.al1G : matchData.al1A,
                    autonReefLevel2G: leftFieldOrientation ? matchData.al2G : matchData.al2A,
                    autonReefLevel3G: leftFieldOrientation ? matchData.al3G : matchData.al3A,
                    autonReefLevel4G: leftFieldOrientation ? matchData.al4G : matchData.al4A,
                    autonReefLevel1I: leftFieldOrientation ? matchData.al1I : matchData.al1C,
                    autonReefLevel2I: leftFieldOrientation ? matchData.al2I : matchData.al2C,
                    autonReefLevel3I: leftFieldOrientation ? matchData.al3I : matchData.al3C,
                    autonReefLevel4I: leftFieldOrientation ? matchData.al4I : matchData.al4C,
                    autonReefLevel1K: leftFieldOrientation ? matchData.al1K : matchData.al1E,
                    autonReefLevel2K: leftFieldOrientation ? matchData.al2K : matchData.al2E,
                    autonReefLevel3K: leftFieldOrientation ? matchData.al3K : matchData.al3E,
                    autonReefLevel4K: leftFieldOrientation ? matchData.al4K : matchData.al4E,
                    autonReefTotal: autonReefTotal,
                    autoAlgaeRemovedA: leftFieldOrientation ? matchData.aalA : matchData.aalD,
                    autoAlgaeRemovedB: leftFieldOrientation ? matchData.aalB : matchData.aalE,
                    autoAlgaeRemovedC: leftFieldOrientation ? matchData.aalC : matchData.aalF,
                    autoAlgaeRemovedD: leftFieldOrientation ? matchData.aalD : matchData.aalA,
                    autoAlgaeRemovedE: leftFieldOrientation ? matchData.aalE : matchData.aalB,
                    autoAlgaeRemovedF: leftFieldOrientation ? matchData.aalF : matchData.aalC,
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
                    teleopReefLevel1A: leftFieldOrientation ? matchData.tl1A : matchData.tl1G,
                    teleopReefLevel2A: leftFieldOrientation ? matchData.tl2A : matchData.tl2G,
                    teleopReefLevel3A: leftFieldOrientation ? matchData.tl3A : matchData.tl3G,
                    teleopReefLevel4A: leftFieldOrientation ? matchData.tl4A : matchData.tl4G,
                    teleopReefLevel1C: leftFieldOrientation ? matchData.tl1C : matchData.tl1I,
                    teleopReefLevel2C: leftFieldOrientation ? matchData.tl2C : matchData.tl2I,
                    teleopReefLevel3C: leftFieldOrientation ? matchData.tl3C : matchData.tl3I,
                    teleopReefLevel4C: leftFieldOrientation ? matchData.tl4C : matchData.tl4I,
                    teleopReefLevel1E: leftFieldOrientation ? matchData.tl1E : matchData.tl1K,
                    teleopReefLevel2E: leftFieldOrientation ? matchData.tl2E : matchData.tl2K,
                    teleopReefLevel3E: leftFieldOrientation ? matchData.tl3E : matchData.tl3K,
                    teleopReefLevel4E: leftFieldOrientation ? matchData.tl4E : matchData.tl4K,
                    teleopReefLevel1G: leftFieldOrientation ? matchData.tl1G : matchData.tl1A,
                    teleopReefLevel2G: leftFieldOrientation ? matchData.tl2G : matchData.tl2A,
                    teleopReefLevel3G: leftFieldOrientation ? matchData.tl3G : matchData.tl3A,
                    teleopReefLevel4G: leftFieldOrientation ? matchData.tl4G : matchData.tl4A,
                    teleopReefLevel1I: leftFieldOrientation ? matchData.tl1I : matchData.tl1C,
                    teleopReefLevel2I: leftFieldOrientation ? matchData.tl2I : matchData.tl2C,
                    teleopReefLevel3I: leftFieldOrientation ? matchData.tl3I : matchData.tl3C,
                    teleopReefLevel4I: leftFieldOrientation ? matchData.tl4I : matchData.tl4C,
                    teleopReefLevel1K: leftFieldOrientation ? matchData.tl1K : matchData.tl1E,
                    teleopReefLevel2K: leftFieldOrientation ? matchData.tl2K : matchData.tl2E,
                    teleopReefLevel3K: leftFieldOrientation ? matchData.tl3K : matchData.tl3E,
                    teleopReefLevel4K: leftFieldOrientation ? matchData.tl4K : matchData.tl4E,
                    teleopReefTotal: teleopReefTotal,
                    teleopAlgaeRemovedA: leftFieldOrientation ? matchData.talA : matchData.talD,
                    teleopAlgaeRemovedB: leftFieldOrientation ? matchData.talB : matchData.talE,
                    teleopAlgaeRemovedC: leftFieldOrientation ? matchData.talC : matchData.talF,
                    teleopAlgaeRemovedD: leftFieldOrientation ? matchData.talD : matchData.talA,
                    teleopAlgaeRemovedE: leftFieldOrientation ? matchData.talE : matchData.talB,
                    teleopAlgaeRemovedF: leftFieldOrientation ? matchData.talF : matchData.talC,
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
            setScannedState('Waiting...');
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
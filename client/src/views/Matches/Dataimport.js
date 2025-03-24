import { useEffect, useState, useContext } from "react";
import axios from 'axios';
import { AppContext } from "../common/AppContext.js";
import Html5QrcodePlugin from "../../components/Html5QrcodePlugin.js";
import { Container, Row, Col, ProgressBar } from "react-bootstrap";
import { sha1 } from "js-sha1";
import { APP_DATABASE_URL } from "../../constant/constant";
import './Matches.css';
import BackButton from '../common/BackButton';

const Dataimport = () => {

    const { appData } = useContext(AppContext);

    const [progressBarStatus, setProgressBarStatus] = useState(0);

    const [scannedData, setScannedData] = useState('');
    const [scannedDataSHA1, setScannedDataSHA1] = useState('');
    const [scannedState, setScannedState] = useState('Waiting...');

    const prepareMatchDataforDatabase = (matchData) => {
        let prepData = {};

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

         
        
        /* *** General Match Data *** */
        prepData.schemaVersion = matchData.v;
        prepData.scouterName = matchData.currentScout;
        prepData.matchNumber = matchData.currentMatch;
        prepData.teamNumber = matchData.currentTeam;
        prepData.eventKey = appData.currentEventKey;
        prepData.matchKey = appData.currentEventKey + '_qm' + matchData.currentMatch;
        prepData.event_id = appData.currentEventID;
        prepData.allianceLocation = matchData.allianceLocation;
        prepData.fieldOrientation = matchData.fieldOrientation;
        


        /* *** Auton data *** */
        let autonReefLevel1Total = matchData.al1A + matchData.al1C + matchData.al1E + matchData.al1G + matchData.al1I + matchData.al1K; //n
        let autonReefLevel2Total = matchData.al2A + matchData.al2C + matchData.al2E + matchData.al2G + matchData.al2I + matchData.al2K; //n
        let autonReefLevel3Total = matchData.al3A + matchData.al3C + matchData.al3E + matchData.al3G + matchData.al3I + matchData.al3K; //n
        let autonReefLevel4Total = matchData.al4A + matchData.al4C + matchData.al4E + matchData.al4G + matchData.al4I + matchData.al4K; //n
        let autonReefTotal = autonReefLevel1Total + autonReefLevel2Total + autonReefLevel3Total + autonReefLevel4Total;
        let autonAlgeaRemovedTotal = matchData.aalA + matchData.aalB + matchData.aalC + matchData.aalD + matchData.aalE + matchData.aalF;

        // For any auton differences between schema versions
        if(matchData.v === '2025.2.0'){
        }
        else{ 
        }

        prepData.autonPosition = botLocationEnum[matchData.sl];
        prepData.autonLeave = matchData.aL;
        prepData.autonCoralMissed = matchData.acm;
        prepData.autonNetScored = matchData.ans;
        prepData.autonNetMissed = matchData.anm;
        prepData.autonProcessorScored = matchData.aps;
        prepData.autonProcessorMissed = matchData.apm;
        prepData.autonCoralGroundPickup = matchData.acgp;
        prepData.autonCoralStationPickup = matchData.acsp;
        prepData.autonAlgaePickup = matchData.aap;
        prepData.autonReefLevel1A = leftFieldOrientation ? matchData.al1A : matchData.al1G;
        prepData.autonReefLevel2A = leftFieldOrientation ? matchData.al2A : matchData.al2G;
        prepData.autonReefLevel3A = leftFieldOrientation ? matchData.al3A : matchData.al3G;
        prepData.autonReefLevel4A = leftFieldOrientation ? matchData.al4A : matchData.al4G;
        prepData.autonReefLevel1C = leftFieldOrientation ? matchData.al1C : matchData.al1I;
        prepData.autonReefLevel2C = leftFieldOrientation ? matchData.al2C : matchData.al2I;
        prepData.autonReefLevel3C = leftFieldOrientation ? matchData.al3C : matchData.al3I;
        prepData.autonReefLevel4C = leftFieldOrientation ? matchData.al4C : matchData.al4I;
        prepData.autonReefLevel1E = leftFieldOrientation ? matchData.al1E : matchData.al1K;
        prepData.autonReefLevel2E = leftFieldOrientation ? matchData.al2E : matchData.al2K;
        prepData.autonReefLevel3E = leftFieldOrientation ? matchData.al3E : matchData.al3K;
        prepData.autonReefLevel4E = leftFieldOrientation ? matchData.al4E : matchData.al4K;
        prepData.autonReefLevel1G = leftFieldOrientation ? matchData.al1G : matchData.al1A;
        prepData.autonReefLevel2G = leftFieldOrientation ? matchData.al2G : matchData.al2A;
        prepData.autonReefLevel3G = leftFieldOrientation ? matchData.al3G : matchData.al3A;
        prepData.autonReefLevel4G = leftFieldOrientation ? matchData.al4G : matchData.al4A;
        prepData.autonReefLevel1I = leftFieldOrientation ? matchData.al1I : matchData.al1C;
        prepData.autonReefLevel2I = leftFieldOrientation ? matchData.al2I : matchData.al2C;
        prepData.autonReefLevel3I = leftFieldOrientation ? matchData.al3I : matchData.al3C;
        prepData.autonReefLevel4I = leftFieldOrientation ? matchData.al4I : matchData.al4C;
        prepData.autonReefLevel1K = leftFieldOrientation ? matchData.al1K : matchData.al1E;
        prepData.autonReefLevel2K = leftFieldOrientation ? matchData.al2K : matchData.al2E;
        prepData.autonReefLevel3K = leftFieldOrientation ? matchData.al3K : matchData.al3E;
        prepData.autonReefLevel4K = leftFieldOrientation ? matchData.al4K : matchData.al4E;
        prepData.autonReefLevel1Total = autonReefLevel1Total;
        prepData.autonReefLevel2Total = autonReefLevel2Total;
        prepData.autonReefLevel3Total = autonReefLevel3Total;
        prepData.autonReefLevel4Total = autonReefLevel4Total;
        prepData.autonReefTotal = autonReefTotal;
        prepData.autoAlgaeRemovedA = leftFieldOrientation ? matchData.aalA : matchData.aalD;
        prepData.autoAlgaeRemovedB = leftFieldOrientation ? matchData.aalB : matchData.aalE;
        prepData.autoAlgaeRemovedC = leftFieldOrientation ? matchData.aalC : matchData.aalF;
        prepData.autoAlgaeRemovedD = leftFieldOrientation ? matchData.aalD : matchData.aalA;
        prepData.autoAlgaeRemovedE = leftFieldOrientation ? matchData.aalE : matchData.aalB;
        prepData.autoAlgaeRemovedF = leftFieldOrientation ? matchData.aalF : matchData.aalC;
        prepData.autonAlgeaRemovedTotal = autonAlgeaRemovedTotal;
        


        // For any Teleop differences between schema versions
        let teleopAlgeaRemovedTotal = 0;
        let teleopReefLevel1Total = 0;
        let teleopReefLevel2Total = 0;
        let teleopReefLevel3Total = 0;
        let teleopReefLevel4Total = 0;
        if(matchData.v === '2025.2.0') {

            teleopReefLevel1Total = matchData.tl1A;
            teleopReefLevel2Total = matchData.tl2A;
            teleopReefLevel3Total = matchData.tl3A;
            teleopReefLevel4Total = matchData.tl4A;

            prepData.teleopReefLevel1A = matchData.tl1A; 
            prepData.teleopReefLevel2A = matchData.tl2A;
            prepData.teleopReefLevel3A = matchData.tl3A;
            prepData.teleopReefLevel4A = matchData.tl4A;

        }
        else {
            teleopReefLevel1Total = matchData.tl1A + matchData.tl1C + matchData.tl1E + matchData.tl1G + matchData.tl1I + matchData.tl1K;
            teleopReefLevel2Total = matchData.tl2A + matchData.tl2C + matchData.tl2E + matchData.tl2G + matchData.tl2I + matchData.tl2K;
            teleopReefLevel3Total = matchData.tl3A + matchData.tl3C + matchData.tl3E + matchData.tl3G + matchData.tl3I + matchData.tl3K;
            teleopReefLevel4Total = matchData.tl4A + matchData.tl4C + matchData.tl4E + matchData.tl4G + matchData.tl4I + matchData.tl4K;

            teleopAlgeaRemovedTotal = matchData.talA + matchData.talB + matchData.talC + matchData.talD + matchData.talE + matchData.talF;
            
            //Telop Data
            prepData.teleopCoralMissed = matchData.tcm;
            prepData.teleopNetMissed = matchData.tnm;
            prepData.teleopProcessorMissed = matchData.tpm;
            prepData.teleopCoralGroundPickup = matchData.tcgp;
            prepData.teleopCoralStationPickup = matchData.tcsp;
            prepData.teleopAlgaePickup = matchData.tap;
            prepData.teleopAlgeaRemovedTotal = teleopAlgeaRemovedTotal;
            prepData.teleopReefLevel1A = leftFieldOrientation ? matchData.tl1A : matchData.tl1G;
            prepData.teleopReefLevel2A = leftFieldOrientation ? matchData.tl2A : matchData.tl2G;
            prepData.teleopReefLevel3A = leftFieldOrientation ? matchData.tl3A : matchData.tl3G;
            prepData.teleopReefLevel4A = leftFieldOrientation ? matchData.tl4A : matchData.tl4G;
            prepData.teleopReefLevel1C = leftFieldOrientation ? matchData.tl1C : matchData.tl1I;
            prepData.teleopReefLevel2C = leftFieldOrientation ? matchData.tl2C : matchData.tl2I;
            prepData.teleopReefLevel3C = leftFieldOrientation ? matchData.tl3C : matchData.tl3I;
            prepData.teleopReefLevel4C = leftFieldOrientation ? matchData.tl4C : matchData.tl4I;
            prepData.teleopReefLevel1E = leftFieldOrientation ? matchData.tl1E : matchData.tl1K;
            prepData.teleopReefLevel2E = leftFieldOrientation ? matchData.tl2E : matchData.tl2K;
            prepData.teleopReefLevel3E = leftFieldOrientation ? matchData.tl3E : matchData.tl3K;
            prepData.teleopReefLevel4E = leftFieldOrientation ? matchData.tl4E : matchData.tl4K;
            prepData.teleopReefLevel1G = leftFieldOrientation ? matchData.tl1G : matchData.tl1A;
            prepData.teleopReefLevel2G = leftFieldOrientation ? matchData.tl2G : matchData.tl2A;
            prepData.teleopReefLevel3G = leftFieldOrientation ? matchData.tl3G : matchData.tl3A;
            prepData.teleopReefLevel4G = leftFieldOrientation ? matchData.tl4G : matchData.tl4A;
            prepData.teleopReefLevel1I = leftFieldOrientation ? matchData.tl1I : matchData.tl1C;
            prepData.teleopReefLevel2I = leftFieldOrientation ? matchData.tl2I : matchData.tl2C;
            prepData.teleopReefLevel3I = leftFieldOrientation ? matchData.tl3I : matchData.tl3C;
            prepData.teleopReefLevel4I = leftFieldOrientation ? matchData.tl4I : matchData.tl4C;
            prepData.teleopReefLevel1K = leftFieldOrientation ? matchData.tl1K : matchData.tl1E;
            prepData.teleopReefLevel2K = leftFieldOrientation ? matchData.tl2K : matchData.tl2E;
            prepData.teleopReefLevel3K = leftFieldOrientation ? matchData.tl3K : matchData.tl3E;
            prepData.teleopReefLevel4K = leftFieldOrientation ? matchData.tl4K : matchData.tl4E;

            prepData.teleopAlgaeRemovedA = leftFieldOrientation ? matchData.talA : matchData.talD;
            prepData.teleopAlgaeRemovedB = leftFieldOrientation ? matchData.talB : matchData.talE;
            prepData.teleopAlgaeRemovedC = leftFieldOrientation ? matchData.talC : matchData.talF;
            prepData.teleopAlgaeRemovedD = leftFieldOrientation ? matchData.talD : matchData.talA;
            prepData.teleopAlgaeRemovedE = leftFieldOrientation ? matchData.talE : matchData.talB;
            prepData.teleopAlgaeRemovedF = leftFieldOrientation ? matchData.talF : matchData.talC;
        }

        // Teleop data
        let teleopReefTotal = teleopReefLevel1Total + teleopReefLevel2Total + teleopReefLevel3Total + teleopReefLevel4Total; 

        prepData.teleopNetScored = matchData.tns;
        prepData.teleopProcessorScored = matchData.tps;
        prepData.teleopReefLevel1Total = teleopReefLevel1Total;
        prepData.teleopReefLevel2Total = teleopReefLevel2Total;
        prepData.teleopReefLevel3Total = teleopReefLevel3Total;
        prepData.teleopReefLevel4Total = teleopReefLevel4Total;
        prepData.teleopReefTotal = teleopReefTotal;



        /* *** Calculated Data (mostly Totals) *** */
        // For any auton differences between schema versions
        if(matchData.v === '2025.2.0'){
            prepData.totalAlgeaRemoved = autonAlgeaRemovedTotal;
        }
        else{
            prepData.totalAlgeaRemoved = autonAlgeaRemovedTotal + teleopAlgeaRemovedTotal;
            prepData.totalCoralMissed = matchData.acm + matchData.tcm;
            prepData.totalNetMissed = matchData.anm + matchData.tnm;
            prepData.totalProcessorMissed = matchData.apm + matchData.tpm;
            prepData.totalCoralGroundPickup = matchData.acgp + matchData.tcgp;
            prepData.totalCoralStationPickup = matchData.acsp + matchData.tcsp;
            prepData.totalAlgaePickup = matchData.aap + matchData.tap;
        }

        // calculated data
        prepData.totalReefLevel1 = autonReefLevel1Total + teleopReefLevel1Total;
        prepData.totalReefLevel2 = autonReefLevel2Total + teleopReefLevel2Total;
        prepData.totalReefLevel3 = autonReefLevel3Total + teleopReefLevel3Total;    
        prepData.totalReefLevel4 = autonReefLevel4Total + teleopReefLevel4Total;
        prepData.totalReef = autonReefTotal + teleopReefTotal;
        prepData.totalNetScored = matchData.ans + matchData.tns;
        prepData.totalProcessorScored = matchData.aps + matchData.tps;

        // The rest of the data
        prepData.bargeZonLocation = matchData.bzl;
        prepData.scouterNotesPicklist = matchData.snp;
        prepData.scouterNotesOther = matchData.sno;
        prepData.uniqueId = scannedDataSHA1;

        return prepData;
    };


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

                //call prepareMatchDataforDatabase with data.data
                let matchData = prepareMatchDataforDatabase(data.data);
                matchData = {...matchData, uniqueId: scannedDataSHA1};
                // console.log('matchData:', matchData);
                console.log('matchData for DB:', JSON.stringify(matchData));
                // Entering the data from the scanned QR code to the database
                await axios.post(`${APP_DATABASE_URL}/matchData/2025`,matchData,
                
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
                <p>Event Year: {appData.currentEventYear}; Event Key: {appData.currentEventKey}; Event Id (serverDV): {appData.currentEventID};</p>
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
const defaultGameData = {
    // *** Version ***
    v: '2025.2.0', // Version Number
    // *** Version ***
    // 2025.1.0 
    //    - Initial version
    // 2025.2.0 
    //    - Changed smp from TRUE/FALSE to Message Index [1,2,3,etc for each message]
    //    - Removed anm, apm, acgp, acsp, acm, tnm, tpm, tcgp, tcsp, tcm
    //    - Updated auton reef positions to include all 4 levels but A, C, G, I
    //    - Updated teleop reef positions to include all 4 levels but A 
    //    - Added agi, asi, aap, aalA, aalB, aalC, aalD, aalE, aalF, aL, tgi, tsi, tap, talH, talL


    // *** Pre Match ***
    sl: 0, // Starting Location 0=None, 1=Top, 2=Center, 3=Bottom

    // *** Autonomous ***
    ans: 0, // Auto Net Scored
    // anm: 0, // Auto Net Missed
    aps: 0, // Auto Processor Scored
    // apm: 0, // Auto Processor Missed
    // acgp: 0, // Auto Coral Ground Pickup
    // acsp: 0, // Auto Coral Station Pickup
    acp: 0, // Auto Coral Pickup
    agi: false, // Auto Ground Intake
    asi: false, // Auto Station Intake
    aap: 0, // Auto Algae Pickup
    // Auto Reef positions Coral
    //  al1A = (a)uto - (l)evel (1) - Reef Location (A)
    al1A:0, al1C:0, al1G:0, al1I:0,
    al2A:0, al2C:0, al2G:0, al2I:0,
    al3A:0, al3C:0, al3G:0, al3I:0,
    al4A:0, al4C:0, al4G:0, al4I:0,
    // acm: 0, // Auto Coral Missed
    //Auto Reef positions Algae
    // aalA = (a)uto - (a)lge - Reef Location (A)
    aalA:false, aalB:false, aalC:false, aalD:false, aalE:false, aalF:false,
    aL:false,

    // *** TeleOp ***
    tns: 0, // Teleop Net Scored
    // tnm: 0, // Teleop Net Missed
    tps: 0, // Teleop Processor Scored
    // tpm: 0, // Teleop Processor Missed
    // tcgp: 0, // Teleop Coral Ground Pickup
    // tcsp: 0, // Teleop Coral Station Pickup
    tcp: 0, // Teleop Coral Pickup
    tgi: false, // Teleop Ground Intake
    tsi: false, // Teleop Station Intake
    tap: 0, // Teleop Algae Pickup
    // Teleop Reef positions Coral
    //  tl1A = (t)eleOp - (l)evel (1) - Reef Location (A)
    tl1A:0,
    tl2A:0,
    tl3A:0,
    tl4A:0,
    tcm: 0, // Teleop Coral Missed
    // Teleop Reef positions Algae
    // talA = (t)eleOp - (a)lge - Reef (l)ocation (H,L)
    talH:false, // High Algae
    talL:false, // Low Algae

    // *** Post Match ***
    bzl: 'U', // Barge Zone Location (U=None, N=No Attempt, P=Parked, H=High Climbed, L=Low Climbed)
    snp: '', // Scouter Notes Picklist - note: list of picklist items
    sno: '', // Scouter Notes Other - note: base64 encoded string
  };

  export default defaultGameData;  
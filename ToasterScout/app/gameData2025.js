const defaultGameData = {
    // *** Version ***
    v: '2025.1.0', // Version Number
    // *** Pre Match ***
    sl: 0, // Starting Location 1=Top, 2=Middle, 3=Bottom

    // *** Autonomous ***
    acm: 0, // Auto Coral Missed
    ans: 0, // Auto Net Scored
    anm: 0, // Auto Net Missed
    aps: 0, // Auto Processor Scored
    apm: 0, // Auto Processor Missed
    acgp: 0, // Auto Coral Ground Pickup
    acsp: 0, // Auto Coral Station Pickup
    aap: 0, // Auto Alge Pick
    // Auto Reef positions Coral
    //  al1A = (a)uto - (l)evel (1) - Reef Location (A)
    al1A:0, al1C:0, al1E:0, al1G:0, al1I:0, al1K:0,
    al2A:0, al2C:0, al2E:0, al2G:0, al2I:0, al2K:0,
    al3A:0, al3C:0, al3E:0, al3G:0, al3I:0, al3K:0,
    al4A:0, al4C:0, al4E:0, al4G:0, al4I:0, al4K:0,
    acm: 0, // Auto Coral Missed
    //Auto Reef positions Alge
    // aalA = (a)uto - (a)lge - Reef Location (A)
    aalA:0, aalC:0, aa1E:0, aa1G:0, aa1I:0, aa1K:0,

    // *** TeleOp ***
    tcm: 0, // Teleop Coral Missed
    tns: 0, // Teleop Net Scored
    tnm: 0, // Teleop Net Missed
    tps: 0, // Teleop Processor Scored
    tpm: 0, // Teleop Processor Missed
    tcgp: 0, // Teleop Coral Ground Pickup
    tcsp: 0, // Teleop Coral Station Pickup
    tap: 0, // Teleop Alge Pickup
    // Teleop Reef positions Coral
    //  tl1A = (t)eleOp - (l)evel (1) - Reef Location (A)
    tl1A:0, tl1C:0, tl1E:0, tl1G:0, tl1I:0, tl1K:0,
    tl2A:0, tl2C:0, tl2E:0, tl2G:0, tl2I:0, tl2K:0,
    tl3A:0, tl3C:0, tl3E:0, tl3G:0, tl3I:0, tl3K:0,
    tl4A:0, tl4C:0, tl4E:0, tl4G:0, tl4I:0, tl4K:0,
    tcm: 0, // Teleop Coral Missed
    // Teleop Reef positions Alge
    // talA = (t)eleOp - (a)lge - Reef Location (A)
    talA:0, talC:0, talE:0, talG:0, talI:0, talK:0,

    // *** Post Match ***
    bzl: 0, // Barge Zone Location (1=No Attempt, 2=Parked, 3=High Climbed, 4=Low Climbed)
    snp: '', // Scouter Notes Picklist - note: list of picklist items
    sno: '', // Scouter Notes Other - note: base64 encoded string
  };

  export default defaultGameData;  
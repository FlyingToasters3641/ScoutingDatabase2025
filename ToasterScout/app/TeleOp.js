import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity, Alert, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'; //https://icons.expo.fyi/Index
import Entypo from '@expo/vector-icons/Entypo';

const TeleOp = ({
  gameData,
  setGameData,
}) => {

  /* ########## Net ########## */
  const [displayNetScored, setDisplayNetScored] = useState(gameData.tns);
  // const [displayNetMissed, setDisplayNetMissed] = useState(gameData.tnm);

  // Net Scoring
  const addNetScored = () => {
    setDisplayNetScored(displayNetScored + 1);
  };
  const subNetScored = () => {
    if (displayNetScored > 0) {
      setDisplayNetScored(displayNetScored - 1);
    } 
  };

  // *** Update gameData when Net data has changed ***
    useEffect(() => {
      setGameData(prevGameData => ({...prevGameData, tns: displayNetScored}));
    }, [displayNetScored]);

  /* ########## ########## ########## */


  /* ########## Processor ########## */
  const [displayProcessorScored, setDisplayProcessorScored] = useState(gameData.tps);

  // Processor Scoring
  const addProcessorScored = () => {
    setDisplayProcessorScored(displayProcessorScored + 1);
  };
  const subProcessorScored = () => {
    if (displayProcessorScored > 0) {
      setDisplayProcessorScored(displayProcessorScored - 1);
    } 
  };

  // *** Update gameData when Processor data has changed ***
    useEffect(() => {
      setGameData(prevGameData => ({...prevGameData, tps: displayProcessorScored}));
    }, [displayProcessorScored]);

  /* ########## ########## ########## */


  /* ########## Intaking ########## */
  const [displayCoralPickup, setDisplayCoralPickup] = useState(gameData.tcp);
  const [displayStationIntake, setDisplayStationIntake] = useState(gameData.tsi);
  const [displayGroundIntake, setDisplayGroundIntake] = useState(gameData.tgi);

  // Coral Station Intake
  const addCoralStation = () => {
    setDisplayCoralPickup(displayCoralPickup + 1);
  };
  const subCoralStation = () => {
    if (displayCoralPickup > 0) {
      setDisplayCoralPickup(displayCoralPickup - 1);
    } 
  };

  // *** Update gameData when Intaking data has changed ***
  useEffect(() => {
    setGameData(prevGameData => ({...prevGameData, tcp: displayCoralPickup}));
    setGameData(prevGameData => ({...prevGameData, tsi: displayStationIntake}));
    setGameData(prevGameData => ({...prevGameData, tgi: displayGroundIntake}));
  }, [displayCoralPickup, displayStationIntake, displayGroundIntake]);
  
  /* ########## ########## ########## */


  /* ########## Reef Select and scooring ########## */
  const [displayReefScore, setDisplayReefScore] = useState({
    l1A:gameData.tl1A,
    l2A:gameData.tl2A,
    l3A:gameData.tl3A,
    l4A:gameData.tl4A,
  });

  // Scoring functions
  // Level 1 Scoring
  const addReefLevel1 = () => {
    setDisplayReefScore(prevAppData => ({...prevAppData, l1A: prevAppData.l1A + 1}));
  };
  const subReefLevel1 = () => {
    if (displayReefScore.l1A > 0) {
      setDisplayReefScore(prevAppData => ({...prevAppData, l1A: prevAppData.l1A - 1}));
    }
  };
  
  // Level 2 Scoring
  const addReefLevel2 = () => {
    if (displayReefScore.l2A < 12) {
      setDisplayReefScore(prevAppData => ({...prevAppData, l2A: prevAppData.l2A + 1}));
    }
  };
  const subReefLevel2 = () => {
    if (displayReefScore.l2A > 0) {
      setDisplayReefScore(prevAppData => ({...prevAppData, l2A: prevAppData.l2A - 1}));
    }
  };
  
  // Level 3 Scoring
  const addReefLevel3 = () => {
    if (displayReefScore.l3A < 12) {
      setDisplayReefScore(prevAppData => ({...prevAppData, l3A: prevAppData.l3A + 1}));
    }
  };
  const subReefLevel3 = () => {
    if (displayReefScore.l3A > 0) {
      setDisplayReefScore(prevAppData => ({...prevAppData, l3A: prevAppData.l3A - 1}));
    }
  };
  
  // Level 4 Scoring
  const addReefLevel4 = () => {
    if (displayReefScore.l4A < 12) {
      setDisplayReefScore(prevAppData => ({...prevAppData, l4A: prevAppData.l4A + 1}));
    }
  };
  const subReefLevel4 = () => {
    if (displayReefScore.l4A > 0) {
      setDisplayReefScore(prevAppData => ({...prevAppData, l4A: prevAppData.l4A - 1}));
    }
  };

  // *** Update gameData when Reef data has changed ***
  useEffect(() => {
    // Level 1
    setGameData(prevGameData => ({...prevGameData, tl1A: displayReefScore.l1A}));
    // Level 2
    setGameData(prevGameData => ({...prevGameData, tl2A: displayReefScore.l2A}));
    // Level 3
    setGameData(prevGameData => ({...prevGameData, tl3A: displayReefScore.l3A}));
    // Level 4
    setGameData(prevGameData => ({...prevGameData, tl4A: displayReefScore.l4A}));

  }, [displayReefScore]);
  /* ########## ########## ########## */



  /* ########## Algae Removal  ########## */
  const [displayAlgaeRemovedHigh, setDisplayAlgaeRemovedHigh] = useState(gameData.talH);
  const [displayAlgaeRemovedLow, setDisplayAlgaeRemovedLow] = useState(gameData.talL);

  // Algae Removed High
  const addAlgaeRemovedHigh = () => {
    if (displayAlgaeRemovedHigh < 3) {
      setDisplayAlgaeRemovedHigh(displayAlgaeRemovedHigh + 1);
    }
  };
  const subAlgaeRemovedHigh = () => {
    if (displayAlgaeRemovedHigh > 0) {
      setDisplayAlgaeRemovedHigh(displayAlgaeRemovedHigh - 1);
    } 
  };

  // Algae Removed Low
  const addAlgaeRemovedLow = () => {
    if (displayAlgaeRemovedLow < 3) {
      setDisplayAlgaeRemovedLow(displayAlgaeRemovedLow + 1);
    }
  };
  const subAlgaeRemovedLow = () => {
    if (displayAlgaeRemovedLow > 0) {
      setDisplayAlgaeRemovedLow(displayAlgaeRemovedLow - 1);
    } 
  };

  // *** Update gameData when Algae data has changed ***
  useEffect(() => {
    setGameData(prevGameData => ({...prevGameData, talH: displayAlgaeRemovedHigh}));
    setGameData(prevGameData => ({...prevGameData, talL: displayAlgaeRemovedLow}));
  }, [displayAlgaeRemovedHigh, displayAlgaeRemovedLow]);

  /* ########## ########## ########## */
  


    return (
      <>
      <View style={[
        {
          top: 0,
          left: 0,
          width: 906,
          height: 508,
          position: 'absolute',
          // backgroundColor: 'black',
          backgroundColor: 'midnightblue',
        },
      ]}>
    </View>
   

    {/* Coral Scoring Levels */}
    <View style={[
      styles.border,
        {
        top: 5,
        left: 525,
        position: 'absolute',
        }
      ]}>
        <View style={[{
          borderRadius: 8,
          marginTop: 8,
          marginBottom: 8,
          height: 75,
          backgroundColor: 'oldlace',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }]}>
          <Text style={{textAlign: 'center', fontSize: 25}}>Reef Coral</Text>
        </View>


      {/* Coral Level 4 */}
      <View style={[{flexDirection:'row', justifyContent:'space-between', width:275, paddingBottom: 5, paddingTop: 5}]}>
        <Pressable 
          onPress={subReefLevel4}
          style={[styles.addButton, {backgroundColor: 'red', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}
        ><Entypo name="circle-with-minus" size={30} color="black" /></Pressable>
        <View style={[styles.box, {backgroundColor: 'oldlace', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}><Text style={{textAlign: 'center', fontSize: 22}}>Level 4{'\n'}{displayReefScore.l4A}</Text></View>
        <Pressable 
          onPress={addReefLevel4}
          style={[styles.addButton, {backgroundColor: 'green', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}
        ><Entypo name="circle-with-plus" size={30} color="black" /></Pressable>
      </View>

      {/* Coral Level 3 */}
      <View style={[{flexDirection:'row', justifyContent:'space-between', width:275, paddingBottom: 5, paddingTop: 5}]}>
        <Pressable 
        onPress={subReefLevel3}
        style={[styles.addButton, {backgroundColor: 'red', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}
        ><Entypo name="circle-with-minus" size={30} color="black" /></Pressable>
        <View style={[styles.box, {backgroundColor: 'oldlace', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}><Text style={{textAlign: 'center', fontSize: 22}}>Level 3{'\n'}{displayReefScore.l3A}</Text></View>
        <Pressable
        onPress={addReefLevel3}
        style={[styles.addButton, {backgroundColor: 'green', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}
        ><Entypo name="circle-with-plus" size={30} color="black" /></Pressable>
      </View>

      {/* Coral Level 2 */}
      <View style={[{flexDirection:'row', justifyContent:'space-between', width:275, paddingBottom: 5, paddingTop: 5}]}>
        <Pressable
        onPress={subReefLevel2}
        style={[styles.addButton, {backgroundColor: 'red', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}
        ><Entypo name="circle-with-minus" size={30} color="black" /></Pressable>
        <View style={[styles.box, {backgroundColor: 'oldlace', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}><Text style={{textAlign: 'center', fontSize: 22}}>Level 2{'\n'}{displayReefScore.l2A}</Text></View>
        <Pressable
        onPress={addReefLevel2}
        style={[styles.addButton, {backgroundColor: 'green', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}
        ><Entypo name="circle-with-plus" size={30} color="black" /></Pressable>
      </View>

      {/* Coral Level 1 */}
      <View style={[{flexDirection:'row', justifyContent:'space-between', width:275, paddingBottom: 5, paddingTop: 5}]}>
        <Pressable 
        style={[styles.addButton, {backgroundColor: 'red', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}
        onPress={subReefLevel1}
        ><Entypo name="circle-with-minus" size={30} color="black" /></Pressable>
        <View style={[styles.box, {backgroundColor: 'oldlace', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}><Text style={{textAlign: 'center', fontSize: 22}}>Level 1{'\n'}{displayReefScore.l1A}</Text></View>
        <Pressable 
        style={[styles.addButton, {backgroundColor: 'green', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}
        onPress={addReefLevel1}
        ><Entypo name="circle-with-plus" size={30} color="black" /></Pressable>
      </View>
    </View>
    

      {/* Algae Removed */}

      <View style={[
        styles.bigButton,
          {
            top: 0,
            left: 47,
            position: 'absolute' 
          }
        ]}>
          <Text style={{textAlign: 'center', fontSize: 25}}>Reef Algae</Text>
      </View>

      <View style={[
        {
          top: 100,
          left: 50,
          position: 'absolute',
        }
        ]}>
        <View style={[{flexDirection:'row', justifyContent:'space-between', width:175, paddingBottom: 5, paddingTop: 5}]}>
          <Pressable 
            style={[styles.addButton, {backgroundColor: 'red', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]} 
            onPress={subAlgaeRemovedHigh}
          >
            <Entypo name="circle-with-minus" size={30} color="black"/>
          </Pressable>
          <View style={[styles.box, {backgroundColor: 'oldlace', flex:2, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}>
            <Text style={styles.buttonLabel}>Top Removed{'\n'}{displayAlgaeRemovedHigh}</Text>
          </View>
          <Pressable 
            style={[styles.addButton, {backgroundColor: 'green', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]} 
            onPress={addAlgaeRemovedHigh}
          >
           <Entypo name="circle-with-plus" size={30} color="black" />
          </Pressable>
        </View>
      </View>

      <View style={[
        {
          top: 200,
          left: 50,
          position: 'absolute',
        }
        ]}>
        <View style={[{flexDirection:'row', justifyContent:'space-between', width:175, paddingBottom: 5, paddingTop: 5}]}>
          <Pressable 
            style={[styles.addButton, {backgroundColor: 'red', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]} 
            onPress={subAlgaeRemovedLow}
          >
            <Entypo name="circle-with-minus" size={30} color="black"/>
          </Pressable>
          <View style={[styles.box, {backgroundColor: 'oldlace', flex:2, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}>
            <Text style={styles.buttonLabel}>Bottom Removed{'\n'}{displayAlgaeRemovedLow}</Text>
          </View>
          <Pressable 
            style={[styles.addButton, {backgroundColor: 'green', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]} 
            onPress={addAlgaeRemovedLow}
          >
           <Entypo name="circle-with-plus" size={30} color="black" />
          </Pressable>
        </View>
      </View>
  

      {/* Scoring */}

      <View style={[
        styles.bigButton,
          {
            top: 0,
            left: 296,
            position: 'absolute' 
          }
        ]}>
          <Text style={{textAlign: 'center', fontSize: 25}}>Scoring Algae</Text>
      </View>

      <View style={[
        {
        top: 100,
        left: 300,
        position: 'absolute',
        alignItems: 'center',
        },
      ]}>

        {/* Net Scoring */}
        <View style={[{flexDirection:'row', justifyContent:'space-between', width:175, paddingBottom: 5, paddingTop: 5}]}>
          <Pressable style={[styles.addButton, {backgroundColor: 'red', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]} onPress={subNetScored}><Entypo name="circle-with-minus" size={30} color="black" /></Pressable>
            <View style={[styles.box, {backgroundColor: 'oldlace', flex:2, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}><Text style={styles.buttonLabel}>Net Scored{'\n'}{displayNetScored}</Text></View>
          <Pressable style={[styles.addButton, {backgroundColor: 'green', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]} onPress={addNetScored}><Entypo name="circle-with-plus" size={30} color="black" /></Pressable>
        </View>
      </View>

      {/* Scoring */}
      <View style={[
        {
        top: 200,
        left: 300,
        position: 'absolute',
        alignItems: 'center',
        },
      ]}>
        {/* Processor Scoring */}
        <View style={[{flexDirection:'row', justifyContent:'space-between', width:175, paddingBottom: 5, paddingTop: 5}]}>
          <Pressable style={[styles.addButton, {backgroundColor: 'red', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]} onPress={subProcessorScored}><Entypo name="circle-with-minus" size={30} color="black" /></Pressable>
            <View style={[styles.box, {backgroundColor: 'oldlace', flex:2, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}><Text style={styles.buttonLabel}>Processor Scored{'\n'}{displayProcessorScored}</Text></View>
          <Pressable style={[styles.addButton, {backgroundColor: 'green', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]} onPress={addProcessorScored}><Entypo name="circle-with-plus" size={30} color="black" /></Pressable>
        </View>
      </View>
      
      {/* Intaking */}

      {/* Pick-Up */}
      <View style={[
        {
          top: 398,
          left: 40,
          position: 'absolute',
        }
        ]}>
        <View style={[{flexDirection:'row', justifyContent:'space-between', width:175, paddingBottom: 5, paddingTop: 5}]}>
          <Pressable style={[styles.addButton, {backgroundColor: 'red', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]} onPress={subCoralStation}><Entypo name="circle-with-minus" size={30} color="black" /></Pressable>
          <View style={[styles.box, {backgroundColor: 'oldlace', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}><Text style={styles.buttonLabel}>Coral Pick-Up{'\n'}{displayCoralPickup}</Text></View>
          <Pressable style={[styles.addButton, {backgroundColor: 'green', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]} onPress={addCoralStation}><Entypo name="circle-with-plus" size={30} color="black" /></Pressable>
        </View>
      </View>

      <Pressable style={[
        styles.midButton, displayStationIntake && styles.selected,
        {
          top: 395,
          left: 235,
          position: 'absolute',
        }
      ]} onPress={() => setDisplayStationIntake(!displayStationIntake)}>
        <Text style={styles.buttonLabel}>{displayStationIntake ? <Ionicons name="checkmark-circle-outline" size={26} color="black" /> : <Entypo name="circle" size={24} color="black" />} Station Intake</Text>
      </Pressable>

      <Pressable style={[
        styles.midButton, displayGroundIntake && styles.selected,
        {
          top: 395,
          left: 370,
          position: 'absolute',
        }
      ]} onPress={() => setDisplayGroundIntake(!displayGroundIntake)}>
        <Text style={styles.buttonLabel}>{displayGroundIntake ? <Ionicons name="checkmark-circle-outline" size={26} color="black" /> : <Entypo name="circle" size={24} color="black" />} Ground Intake</Text>
      </Pressable>
  </>

  );
}

const styles = StyleSheet.create({
  contentText: {
    fontSize: 22,
  },
  midButtonText: {
    fontSize: 14,
    textAlign: 'center',
  },
  bigButtonText: {
    fontSize: 18,
    textAlign: 'center',
  },
  smallButton: {
    borderRadius: 8,
    width: 50,
    height: 50,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'oldlace',
  },
  buttonLabel: {
    fontSize: 18,
    // fontWeight: '100',
    // color: 'coral',
    textAlign: 'center',
  },
  reefSelected: {
    backgroundColor: 'blue',
  },
  algaeSmallButton: {
    borderRadius: 8,
    width: 50,
    height: 50,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'mediumaquamarine',
  },
  algaeSmallButtonActive: {
    backgroundColor: 'limegreen',
  },
  bigButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 8,
    width: 182,
    height: 75,
    backgroundColor: 'oldlace',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  midButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 8,
    width: 115,
    height: 75,
    position: 'absolute',
    backgroundColor: 'oldlace',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  sMidButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 8,
    width: 91,
    height: 75,
    backgroundColor: 'oldlace',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  addButton: {
    width: 'auto',
    height: 75,
  },
  border: {
    borderWidth: 2,
    borderColor: 'white', // Change color to your desired border color
    borderRadius: 8,
    padding: 30,
  },
  selected: {
    backgroundColor: 'limegreen',
  }
});

export default TeleOp;
import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity, Alert, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'; //https://icons.expo.fyi/Index
import Entypo from '@expo/vector-icons/Entypo';

const Auto = ({
  gameData,
  setGameData,
}) => {

   /* ########## Net ########## */
  const [displayNetScored, setDisplayNetScored] = useState(gameData.ans);

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
      setGameData(prevGameData => ({...prevGameData, ans: displayNetScored}));
    }, [displayNetScored]);

  /* ########## ########## ########## */



  /* ########## Processor ########## */
  const [displayProcessorScored, setDisplayProcessorScored] = useState(gameData.aps);

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
      setGameData(prevGameData => ({...prevGameData, aps: displayProcessorScored}));
    }, [displayProcessorScored]);

  /* ########## ########## ########## */


  /* ########## Intaking ########## */
  const [displayCoralPickup, setDisplayCoralPickup] = useState(gameData.acp);
  // const [displayAlgaeIntake, setDisplayAlgaeIntake] = useState(gameData.aap);
  const [displayStationIntake, setDisplayStationIntake] = useState(gameData.csi);  // ToDo: update from gameData on load
  const [displayGroundIntake, setDisplayGroundIntake] = useState(gameData.cgi); // ToDo: update from gameData on load

  // Coral Station Intake
  const addCoralStation = () => {
    setDisplayCoralPickup(displayCoralPickup + 1);
  };
  const subCoralStation = () => {
    if (displayCoralPickup > 0) {
      setDisplayCoralPickup(displayCoralPickup - 1);
    } 
  };

  // // Algae Intake
  // const addAlgaeIntake = () => {
  //   setDisplayAlgaeIntake(displayAlgaeIntake + 1);
  // };
  // const subAlgaeIntake = () => {
  //   if (displayAlgaeIntake > 0) {
  //     setDisplayAlgaeIntake(displayAlgaeIntake - 1);
  //   } 
  // };

  // *** Update gameData when Intaking data has changed ***
    useEffect(() => {
      setGameData(prevGameData => ({...prevGameData, acp: displayCoralPickup}));
      //setGameData(prevGameData => ({...prevGameData, aap: displayAlgaeIntake}));
      setGameData(prevGameData => ({...prevGameData, csi: displayStationIntake}));
      setGameData(prevGameData => ({...prevGameData, cgi: displayGroundIntake}));
    }, [displayCoralPickup, displayStationIntake, displayGroundIntake]);
    // }, [displayCoralPickup, displayAlgaeIntake, displayStationIntake, displayGroundIntake]);

  /* ########## ########## ########## */


  /* ########## Auton Leave ########## */
  const [displayLeave, setdisplayLeave] = useState(gameData.aL);

  useEffect(() => {
    setGameData(prevGameData => ({...prevGameData, aL:displayLeave}))
  }, [displayLeave]);

  /* ########## ########## ########## */



  /* ########## Reef Select and scooring ########## */
  const [displayReefSelect, setDisplayReefSelect] = useState('');
  const [displayReefScore, setDisplayReefScore] = useState({
    l1A:gameData.al1A, l1C:gameData.al1C, l1E:gameData.al1E, l1G:gameData.al1G, l1I:gameData.al1I, l1K:gameData.al1K,
    l2A:gameData.al2A, l2C:gameData.al2C, l2E:gameData.al2E, l2G:gameData.al2G, l2I:gameData.al2I, l2K:gameData.al2K,
    l3A:gameData.al3A, l3C:gameData.al3C, l3E:gameData.al3E, l3G:gameData.al3G, l3I:gameData.al3I, l3K:gameData.al3K,
    l4A:gameData.al4A, l4C:gameData.al4C, l4E:gameData.al4E, l4G:gameData.al4G, l4I:gameData.al4I, l4K:gameData.al4K,
  });


  // *** Update gameData when Reef data has changed ***
  useEffect(() => {

    // Level 1
    setGameData(prevGameData => ({...prevGameData, al1A: displayReefScore.l1A}));
    setGameData(prevGameData => ({...prevGameData, al1C: displayReefScore.l1C}));
    setGameData(prevGameData => ({...prevGameData, al1E: displayReefScore.l1E}));
    setGameData(prevGameData => ({...prevGameData, al1G: displayReefScore.l1G}));
    setGameData(prevGameData => ({...prevGameData, al1I: displayReefScore.l1I}));
    setGameData(prevGameData => ({...prevGameData, al1K: displayReefScore.l1K}));

    // Level 2
    setGameData(prevGameData => ({...prevGameData, al2A: displayReefScore.l2A}));
    setGameData(prevGameData => ({...prevGameData, al2C: displayReefScore.l2C}));
    setGameData(prevGameData => ({...prevGameData, al2E: displayReefScore.l2E}));
    setGameData(prevGameData => ({...prevGameData, al2G: displayReefScore.l2G}));
    setGameData(prevGameData => ({...prevGameData, al2I: displayReefScore.l2I}));
    setGameData(prevGameData => ({...prevGameData, al2K: displayReefScore.l2K}));

    // Level 3
    setGameData(prevGameData => ({...prevGameData, al3A: displayReefScore.l3A}));
    setGameData(prevGameData => ({...prevGameData, al3C: displayReefScore.l3C}));
    setGameData(prevGameData => ({...prevGameData, al3E: displayReefScore.l3E}));
    setGameData(prevGameData => ({...prevGameData, al3G: displayReefScore.l3G}));
    setGameData(prevGameData => ({...prevGameData, al3I: displayReefScore.l3I}));
    setGameData(prevGameData => ({...prevGameData, al3K: displayReefScore.l3K}));

    // Level 4
    setGameData(prevGameData => ({...prevGameData, al4A: displayReefScore.l4A}));
    setGameData(prevGameData => ({...prevGameData, al4C: displayReefScore.l4C}));
    setGameData(prevGameData => ({...prevGameData, al4E: displayReefScore.l4E}));
    setGameData(prevGameData => ({...prevGameData, al4G: displayReefScore.l4G}));
    setGameData(prevGameData => ({...prevGameData, al4I: displayReefScore.l4I}));
    setGameData(prevGameData => ({...prevGameData, al4K: displayReefScore.l4K}));

  }, [displayReefScore]);

  /* ########## ########## ########## */

  
  /* ########## Algae Removal Toggles ########## */
  const [algaeAToggled, setAlgaeAToggled] = useState(gameData.aalA);
  const [algaeBToggled, setAlgaeBToggled] = useState(gameData.aalB);
  const [algaeCToggled, setAlgaeCToggled] = useState(gameData.aalC);
  const [algaeDToggled, setAlgaeDToggled] = useState(gameData.aalD);
  const [algaeEToggled, setAlgaeEToggled] = useState(gameData.aalE);
  const [algaeFToggled, setAlgaeFToggled] = useState(gameData.aalF);

  // *** Update gameData when Algae data has changed ***
  useEffect(() => {
    setGameData(prevGameData => ({...prevGameData, aalA: algaeAToggled}));
    setGameData(prevGameData => ({...prevGameData, aalB: algaeBToggled}));
    setGameData(prevGameData => ({...prevGameData, aalC: algaeCToggled}));
    setGameData(prevGameData => ({...prevGameData, aalD: algaeDToggled}));
    setGameData(prevGameData => ({...prevGameData, aalE: algaeEToggled}));
    setGameData(prevGameData => ({...prevGameData, aalF: algaeFToggled}));
  }, [algaeAToggled, algaeBToggled, algaeCToggled, algaeDToggled, algaeEToggled, algaeFToggled]);

  /* ########## ########## ########## */
  

  // Scoring functions

  // Level 1 Scoring
  const addReefLevel1 = () => {
    if(displayReefSelect !== '') {
      switch (displayReefSelect) {
        case 'A':
          setDisplayReefScore(prevAppData => ({...prevAppData, l1A: prevAppData.l1A + 1}));
          break;
        case 'C':
          setDisplayReefScore(prevAppData => ({...prevAppData, l1C: prevAppData.l1C + 1}));
          break;
        case 'E':
          setDisplayReefScore(prevAppData => ({...prevAppData, l1E: prevAppData.l1E + 1}));
          break;
        case 'G':
          setDisplayReefScore(prevAppData => ({...prevAppData, l1G: prevAppData.l1G + 1}));
          break;
        case 'I':
          setDisplayReefScore(prevAppData => ({...prevAppData, l1I: prevAppData.l1I + 1}));
          break;
        case 'K':
          setDisplayReefScore(prevAppData => ({...prevAppData, l1K: prevAppData.l1K + 1}));
          break;
        default:
          console.log('[33:33] oops!');
      }
      setDisplayReefSelect('');
    }
    
  };
  const subReefLevel1 = () => {
    if(displayReefSelect !== '') {
      switch (displayReefSelect) {
        case 'A':
          if (displayReefScore.l1A > 0) {
            setDisplayReefScore(prevAppData => ({...prevAppData, l1A: prevAppData.l1A - 1}));
          }
          break;
        case 'C':
          if (displayReefScore.l1C > 0) {
            setDisplayReefScore(prevAppData => ({...prevAppData, l1C: prevAppData.l1C - 1}));
          }
          break;
        case 'E':
          if (displayReefScore.l1E > 0) {
            setDisplayReefScore(prevAppData => ({...prevAppData, l1E: prevAppData.l1E - 1}));
          }
          break;
        case 'G':
          if (displayReefScore.l1G > 0) {
            setDisplayReefScore(prevAppData => ({...prevAppData, l1G: prevAppData.l1G - 1}));
          }
          break;
        case 'I':
          if (displayReefScore.l1I > 0) {
            setDisplayReefScore(prevAppData => ({...prevAppData, l1I: prevAppData.l1I - 1}));
          }
          break;
        case 'K':
          if (displayReefScore.l1K > 0) {
            setDisplayReefScore(prevAppData => ({...prevAppData, l1K: prevAppData.l1K - 1}));
          }
          break;
        default:
          console.log('[33:51] oops!');
      }
      setDisplayReefSelect('');


    }
  };
  
  // Level 2 Scoring
  const addReefLevel2 = () => {
    if(displayReefSelect !== '') {
      switch (displayReefSelect) {
        case 'A':
          if (displayReefScore.l2A < 2) {
            setDisplayReefScore(prevAppData => ({...prevAppData, l2A: prevAppData.l2A + 1}));
          }
          break;
        case 'C':
          if (displayReefScore.l2C < 2) {
            setDisplayReefScore(prevAppData => ({...prevAppData, l2C: prevAppData.l2C + 1}));
          }
          break;
        case 'E':
          if (displayReefScore.l2E < 2) {
            setDisplayReefScore(prevAppData => ({...prevAppData, l2E: prevAppData.l2E + 1}));
          }
          break;
        case 'G':
          if (displayReefScore.l2G < 2) {
            setDisplayReefScore(prevAppData => ({...prevAppData, l2G: prevAppData.l2G + 1}));
          }
          break;
        case 'I':
          if (displayReefScore.l2I < 2) {
            setDisplayReefScore(prevAppData => ({...prevAppData, l2I: prevAppData.l2I + 1}));
          }
          break;
        case 'K':
          if (displayReefScore.l2K < 2) {
            setDisplayReefScore(prevAppData => ({...prevAppData, l2K: prevAppData.l2K + 1}));
          }
          break;
        default:
          console.log('[33:33] oops!');
      }
      setDisplayReefSelect('');
    }
    
  };
  const subReefLevel2 = () => {
    if(displayReefSelect !== '') {
      switch (displayReefSelect) {
        case 'A':
          if (displayReefScore.l2A > 0) {
            setDisplayReefScore(prevAppData => ({...prevAppData, l2A: prevAppData.l2A - 1}));
          }
          break;
        case 'C':
          if (displayReefScore.l2C > 0) {
            setDisplayReefScore(prevAppData => ({...prevAppData, l2C: prevAppData.l2C - 1}));
          }
          break;
        case 'E':
          if (displayReefScore.l2E > 0) {
            setDisplayReefScore(prevAppData => ({...prevAppData, l2E: prevAppData.l2E - 1}));
          }
          break;
        case 'G':
          if (displayReefScore.l2G > 0) {
            setDisplayReefScore(prevAppData => ({...prevAppData, l2G: prevAppData.l2G - 1}));
          }
          break;
        case 'I':
          if (displayReefScore.l2I > 0) {
            setDisplayReefScore(prevAppData => ({...prevAppData, l2I: prevAppData.l2I - 1}));
          }
          break;
        case 'K':
          if (displayReefScore.l2K > 0) {
            setDisplayReefScore(prevAppData => ({...prevAppData, l2K: prevAppData.l2K - 1}));
          }
          break;
        default:
          console.log('[33:51] oops!');
      }
      setDisplayReefSelect('');


    }
  };
  
  // Level 3 Scoring
  const addReefLevel3 = () => {
    if(displayReefSelect !== '') {
      switch (displayReefSelect) {
        case 'A':
          if (displayReefScore.l3A < 2) {
            setDisplayReefScore(prevAppData => ({...prevAppData, l3A: prevAppData.l3A + 1}));
          }
          break;
        case 'C':
          if (displayReefScore.l3C < 2) {
            setDisplayReefScore(prevAppData => ({...prevAppData, l3C: prevAppData.l3C + 1}));
          }
          break;
        case 'E':
          if (displayReefScore.l3E < 2) {
            setDisplayReefScore(prevAppData => ({...prevAppData, l3E: prevAppData.l3E + 1}));
          }
          break;
        case 'G':
          if (displayReefScore.l3G < 2) {
            setDisplayReefScore(prevAppData => ({...prevAppData, l3G: prevAppData.l3G + 1}));
          }
          break;
        case 'I':
          if (displayReefScore.l3I < 2) {
            setDisplayReefScore(prevAppData => ({...prevAppData, l3I: prevAppData.l3I + 1}));
          }
          break;
        case 'K':
          if (displayReefScore.l3K < 2) {
            setDisplayReefScore(prevAppData => ({...prevAppData, l3K: prevAppData.l3K + 1}));
          }
          break;
        default:
          console.log('[33:33] oops!');
      }
      setDisplayReefSelect('');
    }
    
  };
  const subReefLevel3 = () => {
    if(displayReefSelect !== '') {
      switch (displayReefSelect) {
        case 'A':
          if (displayReefScore.l3A > 0) {
            setDisplayReefScore(prevAppData => ({...prevAppData, l3A: prevAppData.l3A - 1}));
          }
          break;
        case 'C':
          if (displayReefScore.l3C > 0) {
            setDisplayReefScore(prevAppData => ({...prevAppData, l3C: prevAppData.l3C - 1}));
          }
          break;
        case 'E':
          if (displayReefScore.l3E > 0) {
            setDisplayReefScore(prevAppData => ({...prevAppData, l3E: prevAppData.l3E - 1}));
          }
          break;
        case 'G':
          if (displayReefScore.l3G > 0) {
            setDisplayReefScore(prevAppData => ({...prevAppData, l3G: prevAppData.l3G - 1}));
          }
          break;
        case 'I':
          if (displayReefScore.l3I > 0) {
            setDisplayReefScore(prevAppData => ({...prevAppData, l3I: prevAppData.l3I - 1}));
          }
          break;
        case 'K':
          if (displayReefScore.l3K > 0) {
            setDisplayReefScore(prevAppData => ({...prevAppData, l3K: prevAppData.l3K - 1}));
          }
          break;
        default:
          console.log('[33:51] oops!');
      }
      setDisplayReefSelect('');


    }
  };
  
  // Level 4 Scoring
  const addReefLevel4 = () => {
    if(displayReefSelect !== '') {
      switch (displayReefSelect) {
        case 'A':
          if (displayReefScore.l4A < 2) {
            setDisplayReefScore(prevAppData => ({...prevAppData, l4A: prevAppData.l4A + 1}));
          }
          break;
        case 'C':
          if (displayReefScore.l4C < 2) {
            setDisplayReefScore(prevAppData => ({...prevAppData, l4C: prevAppData.l4C + 1}));
          }
          break;
        case 'E':
          if (displayReefScore.l4E < 2) {
            setDisplayReefScore(prevAppData => ({...prevAppData, l4E: prevAppData.l4E + 1}));
          }
          break;
        case 'G':
          if (displayReefScore.l4G < 2) {
            setDisplayReefScore(prevAppData => ({...prevAppData, l4G: prevAppData.l4G + 1}));
          }
          break;
        case 'I':
          if (displayReefScore.l4I < 2) {
            setDisplayReefScore(prevAppData => ({...prevAppData, l4I: prevAppData.l4I + 1}));
          }
          break;
        case 'K':
          if (displayReefScore.l4K < 2) {
            setDisplayReefScore(prevAppData => ({...prevAppData, l4K: prevAppData.l4K + 1}));
          }
          break;
        default:
          console.log('[33:33] oops!');
      }
      setDisplayReefSelect('');
    }
    
  };
  const subReefLevel4 = () => {
    if(displayReefSelect !== '') {
      switch (displayReefSelect) {
        case 'A':
          if (displayReefScore.l4A > 0) {
            setDisplayReefScore(prevAppData => ({...prevAppData, l4A: prevAppData.l4A - 1}));
          }
          break;
        case 'C':
          if (displayReefScore.l4C > 0) {
            setDisplayReefScore(prevAppData => ({...prevAppData, l4C: prevAppData.l4C - 1}));
          }
          break;
        case 'E':
          if (displayReefScore.l4E > 0) {
            setDisplayReefScore(prevAppData => ({...prevAppData, l4E: prevAppData.l4E - 1}));
          }
          break;
        case 'G':
          if (displayReefScore.l4G > 0) {
            setDisplayReefScore(prevAppData => ({...prevAppData, l4G: prevAppData.l4G - 1}));
          }
          break;
        case 'I':
          if (displayReefScore.l4I > 0) {
            setDisplayReefScore(prevAppData => ({...prevAppData, l4I: prevAppData.l4I - 1}));
          }
          break;
        case 'K':
          if (displayReefScore.l4K > 0) {
            setDisplayReefScore(prevAppData => ({...prevAppData, l4K: prevAppData.l4K - 1}));
          }
          break;
        default:
          console.log('[33:51] oops!');
      }
      setDisplayReefSelect('');
    }
  };


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
          backgroundColor: 'olive',
        },
      ]}>
    </View>
    <View>
      <Image
        source={require('@/assets/images/g2025-fieldview-teleop.png')} 
        style={{ left: 10, width: 456, height: 478 }} 
      />

      {/* Coral Scoring */}

      {/* location K */}
      <TouchableOpacity
        onPress={() => {displayReefSelect === 'K' ? setDisplayReefSelect('') : setDisplayReefSelect('K');}}
        style={[
          styles.smallButton,
          {
            top: 43,
            left: 105,
          },
          displayReefSelect === 'K' && styles.reefSelected,
        ]}
        activeOpacity={0.5}>
        <Entypo name="circle" size={24} color="black" />
      </TouchableOpacity>

      {/* location I */}
      <TouchableOpacity
        onPress={() => {displayReefSelect === 'I' ? setDisplayReefSelect('') : setDisplayReefSelect('I');}}
        style={[
          styles.smallButton,
          {
            top: 43,
            left: 309,
          },
          displayReefSelect === 'I' && styles.reefSelected,
        ]}
        activeOpacity={0.5}>
        <Entypo name="circle" size={24} color="black" />
      </TouchableOpacity>


      {/* location G */}
      <TouchableOpacity
        onPress={() => {displayReefSelect === 'G' ? setDisplayReefSelect('') : setDisplayReefSelect('G');}}
        style={[
          styles.smallButton,
          {
            top: 215,
            left: 405,
          },
          displayReefSelect === 'G' && styles.reefSelected,
        ]}
        activeOpacity={0.5}>
        <Entypo name="circle" size={24} color="black" />
      </TouchableOpacity>

      {/* location E */}
      <TouchableOpacity
        onPress={() => {displayReefSelect === 'E' ? setDisplayReefSelect('') : setDisplayReefSelect('E');}}
        style={[
          styles.smallButton,
          {
            top: 380,
            left: 315,
          },
          displayReefSelect === 'E' && styles.reefSelected,
        ]}
        activeOpacity={0.5}>
        <Entypo name="circle" size={24} color="black" />
      </TouchableOpacity>


      {/* location C */}
      <TouchableOpacity
        onPress={() => {displayReefSelect === 'C' ? setDisplayReefSelect('') : setDisplayReefSelect('C');}}
        style={[
          styles.smallButton,
          {
            top: 380,
            left: 110,
          },
          displayReefSelect === 'C' && styles.reefSelected,
        ]}
        activeOpacity={0.5}>
        <Entypo name="circle" size={24} color="black" />
      </TouchableOpacity>


      {/* location A */}
      <TouchableOpacity
        onPress={() => {displayReefSelect === 'A' ? setDisplayReefSelect('') : setDisplayReefSelect('A');}}
        style={[
          styles.smallButton,
          {
            top: 215,
            left: 20,
          },
          displayReefSelect === 'A' && styles.reefSelected,
        ]}
        activeOpacity={0.5}>
        <Entypo name="circle" size={24} color="black" />
      </TouchableOpacity>


    {/* Algae Removed */}

        {/* Location Algae A */}
        <TouchableOpacity
        style={[
          styles.algaeSmallButton, algaeAToggled && styles.algaeSmallButtonActive,
          {
            top: 215,
            left: 95,
          },
        ]}
        activeOpacity={0.5} onPress={() => setAlgaeAToggled(!algaeAToggled)}>
        {algaeAToggled ? <Ionicons name="checkbox-outline" size={28} color="black" /> : <Ionicons name="stop-outline" size={28} color="black" />}
      </TouchableOpacity>

        {/* Location Algae B */}
        <TouchableOpacity
        style={[
          styles.algaeSmallButton, algaeBToggled && styles.algaeSmallButtonActive,
          {
            top: 300,
            left: 155,
          },
        ]}
        activeOpacity={0.5} onPress={() => setAlgaeBToggled(!algaeBToggled)}>
        {algaeBToggled ? <Ionicons name="checkbox-outline" size={28} color="black" /> : <Ionicons name="stop-outline" size={28} color="black" />}
      </TouchableOpacity>
      
        {/* Location Algae C */}
        <TouchableOpacity
        style={[
          styles.algaeSmallButton, algaeCToggled && styles.algaeSmallButtonActive,
          {
            top: 300,
            left: 265,
          },
        ]}
        activeOpacity={0.5} onPress={() => setAlgaeCToggled(!algaeCToggled)}>
        {algaeCToggled ? <Ionicons name="checkbox-outline" size={28} color="black" /> : <Ionicons name="stop-outline" size={28} color="black" />}
      </TouchableOpacity>

        {/* Location Algae D */}
        <TouchableOpacity
        style={[
          styles.algaeSmallButton, algaeDToggled && styles.algaeSmallButtonActive,
          {
            top: 215,
            left: 321,
          },
        ]}
        activeOpacity={0.5} onPress={() => setAlgaeDToggled(!algaeDToggled)}>
        {algaeDToggled ? <Ionicons name="checkbox-outline" size={28} color="black" /> : <Ionicons name="stop-outline" size={28} color="black" />}
      </TouchableOpacity>

        {/* Location Algae E */}
        <TouchableOpacity
        style={[
          styles.algaeSmallButton, algaeEToggled && styles.algaeSmallButtonActive,
          {
            top: 125,
            left: 265,
          },
        ]}
        activeOpacity={0.5} onPress={() => setAlgaeEToggled(!algaeEToggled)}>
        {algaeEToggled ? <Ionicons name="checkbox-outline" size={28} color="black" /> : <Ionicons name="stop-outline" size={28} color="black" />}
      </TouchableOpacity>

        {/* Location Algae F */}
        <TouchableOpacity
        style={[
          styles.algaeSmallButton, algaeFToggled && styles.algaeSmallButtonActive,
          {
            top: 125,
            left: 155,
          },
        ]}
        activeOpacity={0.5} onPress={() => setAlgaeFToggled(!algaeFToggled)}>
        {algaeFToggled ? <Ionicons name="checkbox-outline" size={28} color="black" /> : <Ionicons name="stop-outline" size={28} color="black" />}
      </TouchableOpacity>
    </View>

    {/* Coral Scoring Levels */}
    <View style={[
      styles.border,
        {
        top: 5,
        left: 482,
        position: 'absolute',
        }
      ]}>
        <Text style={[styles.title, {textAlign: 'center'}]}>Reef & Coral</Text>

      {/* Coral Level 4 */}
      <View style={[{flexDirection:'row', justifyContent:'space-between', width:175, paddingBottom: 5, paddingTop: 5}]}>
        <TouchableOpacity 
          onPress={subReefLevel4}
          style={[styles.subButton, {backgroundColor: 'red', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}
        ><Entypo name="circle-with-minus" size={30} color="black" /></TouchableOpacity>
        <View style={[styles.box, {backgroundColor: 'oldlace', flex:2, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}><Text style={{textAlign: 'center', fontSize: 22}}>{displayReefScore.l4K}   {displayReefScore.l4I}{'\n'}{displayReefScore.l4A}  L4  {displayReefScore.l4G}{'\n'}{displayReefScore.l4C}   {displayReefScore.l4E}</Text></View>
        <TouchableOpacity 
          onPress={addReefLevel4}
          style={[styles.addButton, {backgroundColor: 'green', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}
        ><Entypo name="circle-with-plus" size={30} color="black" /></TouchableOpacity>
      </View>

      {/* Coral Level 3 */}
      <View style={[{flexDirection:'row', justifyContent:'space-between', width:175, paddingBottom: 5, paddingTop: 5}]}>
        <TouchableOpacity 
        onPress={subReefLevel3}
        style={[styles.subButton, {backgroundColor: 'red', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}
        ><Entypo name="circle-with-minus" size={30} color="black" /></TouchableOpacity>
        <View style={[styles.box, {backgroundColor: 'oldlace', flex:2, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}><Text style={{textAlign: 'center', fontSize: 22}}>{displayReefScore.l3K}   {displayReefScore.l3I}{'\n'}{displayReefScore.l3A}  L3  {displayReefScore.l3G}{'\n'}{displayReefScore.l3C}   {displayReefScore.l3E}</Text></View>
        <TouchableOpacity
        onPress={addReefLevel3}
        style={[styles.addButton, {backgroundColor: 'green', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}
        ><Entypo name="circle-with-plus" size={30} color="black" /></TouchableOpacity>
      </View>

      {/* Coral Level 2 */}
      <View style={[{flexDirection:'row', justifyContent:'space-between', width:175, paddingBottom: 5, paddingTop: 5}]}>
        <TouchableOpacity
        onPress={subReefLevel2}
        style={[styles.subButton, {backgroundColor: 'red', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}
        ><Entypo name="circle-with-minus" size={30} color="black" /></TouchableOpacity>
        <View style={[styles.box, {backgroundColor: 'oldlace', flex:2, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}><Text style={{textAlign: 'center', fontSize: 22}}>{displayReefScore.l2K}   {displayReefScore.l2I}{'\n'}{displayReefScore.l2A}  L2  {displayReefScore.l2G}{'\n'}{displayReefScore.l2C}   {displayReefScore.l2E}</Text></View>
        <TouchableOpacity
        onPress={addReefLevel2}
        style={[styles.addButton, {backgroundColor: 'green', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}
        ><Entypo name="circle-with-plus" size={30} color="black" /></TouchableOpacity>
      </View>

      {/* Coral Level 1 */}
      <View style={[{flexDirection:'row', justifyContent:'space-between', width:175, paddingBottom: 5, paddingTop: 5}]}>
        <TouchableOpacity 
        style={[styles.subButton, {backgroundColor: 'red', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}
        onPress={subReefLevel1}
        ><Entypo name="circle-with-minus" size={30} color="black" /></TouchableOpacity>
        <View style={[styles.box, {backgroundColor: 'oldlace', flex:2, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}><Text style={{textAlign: 'center', fontSize: 22}}>{displayReefScore.l1K}   {displayReefScore.l1I}{'\n'}{displayReefScore.l1A}  L1  {displayReefScore.l1G}{'\n'}{displayReefScore.l1C}   {displayReefScore.l1E}</Text></View>
        <TouchableOpacity 
        style={[styles.addButton, {backgroundColor: 'green', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}
        onPress={addReefLevel1}
        ><Entypo name="circle-with-plus" size={30} color="black" /></TouchableOpacity>
      </View>

      {/* Separator */}
      <View style={{ height: 1, backgroundColor: 'white', marginVertical: 5 }} />

      {/* Coral Station Pickup */}
      <View style={[{flexDirection:'row', justifyContent:'space-between', width:175, paddingBottom: 5, paddingTop: 5}]}>
        <TouchableOpacity style={[styles.subButton, {backgroundColor: 'red', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]} onPress={subCoralStation}><Entypo name="circle-with-minus" size={30} color="black" /></TouchableOpacity>
        <View style={[styles.box, {backgroundColor: 'oldlace', flex:2, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}><Text style={styles.buttonLabel}>Coral Pickup{'\n'}{displayCoralPickup}</Text></View>
        <TouchableOpacity style={[styles.addButton, {backgroundColor: 'green', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]} onPress={addCoralStation}><Entypo name="circle-with-plus" size={30} color="black" /></TouchableOpacity>
      </View>
    </View>
    

    {/* Scoring */}
    <View style={[
      styles.border,
      {
      top: 5,
      left: 690,
      position: 'absolute',
      alignItems: 'center',
      },
    ]}>
      <Text style={[styles.title, {textAlign: 'center'}]}>Scoring Algae</Text>  
      {/* Net Scoring */}
      <View style={[{flexDirection:'row', justifyContent:'space-between', width:175, paddingBottom: 5, paddingTop: 5}]}>
      <TouchableOpacity style={[styles.subButton, {backgroundColor: 'red', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]} onPress={subNetScored}><Entypo name="circle-with-minus" size={30} color="black" /></TouchableOpacity>
        <View style={[styles.box, {backgroundColor: 'oldlace', flex:2, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}><Text style={styles.buttonLabel}>Net Scored{'\n'}{displayNetScored}</Text></View>
        <TouchableOpacity style={[styles.addButton, {backgroundColor: 'green', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]} onPress={addNetScored}><Entypo name="circle-with-plus" size={30} color="black" /></TouchableOpacity>
      </View>

      {/* Processor Scoring */}
      <View style={[{flexDirection:'row', justifyContent:'space-between', width:175, paddingBottom: 5, paddingTop: 5}]}>
        <TouchableOpacity style={[styles.subButton, {backgroundColor: 'red', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]} onPress={subProcessorScored}><Entypo name="circle-with-minus" size={30} color="black" /></TouchableOpacity>
        <View style={[styles.box, {backgroundColor: 'oldlace', flex:2, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}><Text style={styles.buttonLabel}>Processor Scored{'\n'}{displayProcessorScored}</Text></View>
        <TouchableOpacity style={[styles.addButton, {backgroundColor: 'green', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]} onPress={addProcessorScored}><Entypo name="circle-with-plus" size={30} color="black" /></TouchableOpacity>
      </View>
    </View>
      
    {/* Coral Intake */}
    <View style={[ styles.border,
      {
          top: 260,
          left: 690,
          position: 'absolute',
          alignItems: 'center',
          // flexDirection: 'row',
      }
      ]}>
        <Text style={[styles.title, {textAlign: 'center'}]}>Intake Type</Text>
      {/* Coral Ground Intake */}
      <Pressable style={[styles.midButton, displayGroundIntake && styles.leaveSelected, {width:165}]} onPress={() => setDisplayGroundIntake(!displayGroundIntake)}>
        <Text style={styles.buttonLabel}>{displayGroundIntake ? <Ionicons name="checkbox-outline" size={28} color="black" /> : <Ionicons name="stop-outline" size={28} color="black" />} Coral Ground</Text>
      </Pressable>

      {/* Coral Station Intake */}
      <Pressable style={[styles.midButton, displayStationIntake && styles.leaveSelected, {width:165}]} onPress={() => setDisplayStationIntake(!displayStationIntake)}>
        <Text style={styles.buttonLabel}>{displayStationIntake ? <Ionicons name="checkbox-outline" size={28} color="black" /> : <Ionicons name="stop-outline" size={28} color="black" />} Coral Station</Text>
      </Pressable>

      

    </View>


    {/* Auto Leave */}
    <View style={[
      {
      top: 190,
      left: 180,
      position: 'absolute',
      alignItems: 'center',
      },
    ]}>
      {/* Auton Leave */}
      <Pressable style={[styles.midButton, {width:95,  paddingBottom: 5, paddingTop: 5}, displayLeave && styles.leaveSelected]} onPress={() => setdisplayLeave(!displayLeave)}>
        <Text style={styles.buttonLabel}>{displayLeave ? <Ionicons name="checkbox-outline" size={28} color="black" /> : <Ionicons name="stop-outline" size={28} color="black" />}{'\n'}Auton{'\n'}Leave</Text>
      </Pressable>

    </View>

    
  </>
  );
}

const styles = StyleSheet.create({
  contentText: {
    fontSize: 22,
  },
  title: {
    textAlign: 'center',
    // marginBottom: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',

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
    // backgroundColor: 'limegreen',
    backgroundColor: 'white',
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
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    margin: 8,
    //marginTop: 8,
    // marginBottom: 8,
    width: 115,
    height: 75,
    // position: 'absolute',
    backgroundColor: 'oldlace',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  addButton: {
    width: 'auto',
    height: 75,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  subButton: {
    width: 'auto',
    height: 75,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  border: {
    borderWidth: 2,
    borderColor: 'white', // Change color to your desired border color
    borderRadius: 8,
    padding:10,
  },
  leaveButton: {
    top: 405,
    left: 385,
    height: 65,
    width: 65,
    borderRadius: 8,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'oldlace',
  },
  leaveSelected: {
    backgroundColor: 'limegreen',
  }
});

export default Auto;
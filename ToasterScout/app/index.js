import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Settings } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as ScreenOrientation from 'expo-screen-orientation';
import Ionicons from '@expo/vector-icons/Ionicons'; //https://icons.expo.fyi/Index
import MatchSetup from "@/app/MatchSetup";
import PreMatch from "@/app/PreMatch"
import Auto from "@/app/Auto";
import TeleOp from "@/app/TeleOp";
import PostMatch from "@/app/PostMatch";
import SaveMatch from "@/app/SaveMatch";
import AppSettings from "@/app/AppSettings";
import defaultGameData from "@/app/gameData2025"


export default function App() {
  
  // *** Initialize appData and matchData ***
  const defaultAppData = {allianceLocation: 'Select Alliance Team in Settings', fieldOrientation: 'Spectator', currentScout: '', currentTeam: null, currentMatch: null};
  const defaultMatchData = [];
  
  const [appData, setAppData] = useState(defaultAppData);
  const [matchData, setMatchData] = useState(defaultMatchData);
  const [gameData, setGameData] = useState(defaultGameData);
  const [dataLoaded, setDataLoaded] = useState(false);

  // *** Load appData and matchData from AsyncStorage when the app loads ***
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedAppData = await AsyncStorage.getItem('appData');
        const storedMatchData = await AsyncStorage.getItem('matchData');
        if (storedAppData) {
          const parsedAppData = JSON.parse(storedAppData);
          setAppData(parsedAppData || defaultAppData);
        } else {
          setAppData(defaultAppData);
        }
        console.log('appData loaded (async):', appData);
        if (storedMatchData) {
          const parsedMatchData = JSON.parse(storedMatchData);
          setMatchData(parsedMatchData || defaultMatchData);
        } else {
          setMatchData(defaultMatchData);
        }
        console.log('matchData loaded (async):', matchData);
      } catch (error) {
        console.error('Failed to load data from AsyncStorage', error);
        setAppData(defaultAppData);
        setMatchData(defaultMatchData);
      } finally {
        setDataLoaded(true);
      }
    };

    loadData();
  }, []);

  
  // *** Save appData to AsyncStorage whenever it changes ***
  useEffect(() => {
    if (dataLoaded) {
      AsyncStorage.setItem('appData', JSON.stringify(appData))
        .catch(error => console.error('Failed to save appData to AsyncStorage', error))
        .then(() => console.log('appData saved:', JSON.stringify(appData)));
    }
  }, [appData, dataLoaded]);

  // *** Save matchData to AsyncStorage whenever it changes ***
  useEffect(() => {
    if (dataLoaded) {
      AsyncStorage.setItem('matchData', JSON.stringify(matchData))
        .catch(error => console.error('Failed to save matchData to AsyncStorage', error))
        .then(() => console.log('matchData saved:', JSON.stringify(matchData)));
    }
  }, [matchData, dataLoaded]);
  
 
  // *** Set the default screen to MatchSelect ***
  const [selectedContent, setSelectedContent] = useState('MatchSelect');
  const [content, setContent] = useState(<MatchSetup appData={appData} setAppData={setAppData} matchData={matchData} setMatchData={setMatchData} />);
  // if (appData.allianceLocation === 'Select Alliance Team in Settings') {
  //   // Alliance location is not set so we can set the default screen to AppSettings
  //  // setAppData(prevAppData => ({...prevAppData, allianceLocation: 'Select Alliance Team in Settings'}));
  //   setSelectedContent('AppSettings');
  //   setContent(<AppSettings appData={appData} setAppData={setAppData} matchData={matchData} setMatchData={setMatchData} />);
  // }

  // Prevents the MatchSetup view to load on initial render
  //const isInitialMount = useRef(true);
  // Reloads the MatchSetup view when matchData is updated
  useEffect(() => {
    if (dataLoaded) {
      // if (isInitialMount.current) {
      //   isInitialMount.current = false;
      // } else {
        console.log('matchData updated:', matchData);
        setContent(<MatchSetup appData={appData} setAppData={setAppData} matchData={matchData} setMatchData={setMatchData} />);
      // }
    }
  }, [matchData, dataLoaded]);

  // useEffect(() => {
  //   const changeScreenOrientation = async () => {
  //     await ScreenOrientation.unlockAsync();
  //   };
  //   changeScreenOrientation();
  // }, []);

  // async function changeScreenOrientation() {
  //   await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  // }  {...{setScoutName}}

  // useEffect(() => {
  //   if (appData.allianceLocation === '') {
  //     setAppData(prevAppData => ({ ...prevAppData, allianceLocation: 'Select Alliance Team in Settings' }));
  //     setSelectedContent('AppSettings');
  //     setContent(
  //       <AppSettings appData={appData} setAppData={setAppData} matchData={matchData} setMatchData={setMatchData} />
  //     );
  //   }
  // }, [appData]);


  return (
    <View style={{padding: 0, flex: 1}}>
      <View style={[styles.topbar, styles.row]}>
        <View style={{flex: 2, flexDirection: 'row', alignItems: 'center',}}>
          <Ionicons name="eye" size={26} color="white" />
          <Text style={[styles.title, {paddingRight: 20}]}> TFT Scouter</Text>
          <Text style={[styles.title, appData.allianceLocation[0] === 'B' ? styles.teamBlue : styles.teamRed]}>{appData.allianceLocation}</Text>
          <Text style={[styles.title]}>{gameData.name}</Text>
          </View>
        <View style={{flex: 4, flexDirection: 'row-reverse', alignItems: 'center',}}>
          <TouchableOpacity
              activeOpacity={0.5}
              key="Settings"
              onPress={() => {setContent(<AppSettings appData={appData} setAppData={setAppData} matchData={matchData} setMatchData={setMatchData} />); setSelectedContent('AppSettings');}}>
              <Ionicons name="menu" size={32} color="white" />
          </TouchableOpacity>
          <Text style={[styles.title, {paddingRight: 10}]}>Match: {appData.currentMatch} | Team: {appData.currentTeam} | {appData.currentScout}</Text>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            key="MatchSelect"
            onPress={() => {setContent(<MatchSetup appData={appData} setAppData={setAppData} matchData={matchData} setMatchData={setMatchData} />); setSelectedContent('MatchSelect');}}
            style={[styles.button, selectedContent === 'MatchSelect' && styles.selectedContent]}>
            <Text style={[styles.buttonLabel, selectedContent === 'MatchSelect' && styles.selectedLabel]}>Match{"\n"}Select</Text>
          </TouchableOpacity>
          <TouchableOpacity
          activeOpacity={0.5}
            key="PreMatch"
            onPress={() => {setContent(<PreMatch appData={appData} setAppData={setAppData} matchData={matchData} setMatchData={setMatchData} gameData={gameData} setGameData={setGameData} />); setSelectedContent('PreMatch');}}
            style={[styles.button, selectedContent === 'PreMatch' && styles.selectedContent]}>
            <Text style={[styles.buttonLabel, selectedContent === 'Auto' && styles.selectedLabel]}>Pre-{"\n"}match</Text>
          </TouchableOpacity>
          <TouchableOpacity
          activeOpacity={0.5}
            key="Auto"
            onPress={() => {setContent(<Auto gameData={gameData} setGameData={setGameData} />); setSelectedContent('Auto');}}
            style={[styles.button, selectedContent === 'Auto' && styles.selectedContentAuto]}>
            <Text style={[styles.buttonLabel, selectedContent === 'Auto' && styles.selectedLabel]}>Auto</Text>
          </TouchableOpacity>
          <TouchableOpacity
          activeOpacity={0.5}
            key="TeleOp"
            onPress={() => {setContent(<TeleOp gameData={gameData} setGameData={setGameData} />); setSelectedContent('TeleOp');}}
            style={[styles.button, selectedContent === 'TeleOp' && styles.selectedContentTeleop]}>
            <Text style={[styles.buttonLabel, selectedContent === 'TeleOp' && styles.selectedLabel]}>TeleOp</Text>
          </TouchableOpacity>
          <TouchableOpacity
          activeOpacity={0.5}
            key="PostMatch"
            onPress={() => {setContent(<PostMatch gameData={gameData} setGameData={setGameData} />); setSelectedContent('PostMatch');}}
            style={[styles.button, selectedContent === 'PostMatch' && styles.selectedContent]}>
            <Text style={[styles.buttonLabel, selectedContent === 'CageResult' && styles.selectedLabel]}>Post{"\n"}Match</Text>
          </TouchableOpacity>
          <TouchableOpacity
          activeOpacity={0.5}
            key="SaveMatch"
            onPress={() => {setContent(<SaveMatch appData={appData} setAppData={setAppData} matchData={matchData} setMatchData={setMatchData} gameData={gameData} setGameData={setGameData} />); setSelectedContent('SaveMatch');}}
            style={[styles.button, selectedContent === 'SaveMatch' && styles.selectedContent]}>
            <Text style={[styles.buttonLabel, selectedContent === 'SaveMatch' && styles.selectedLabel]}>Save{"\n"}Match</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
          {content}
        </View>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'aliceblue',
  },
  contentContainer: {
    flex: 9,
    backgroundColor: 'coral',
  },
  row: {
    flexDirection: 'row',
  },
  // Topbar styles
  topbar: {
    backgroundColor: 'black',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: 'white',
    fontSize: 24,
  },
  teamBlue:{
    backgroundColor: 'blue',
    paddingRight: 10,
    paddingLeft: 10,
    justifyContent: 'center',
    borderRadius: 1,
  },
  teamRed:{
    backgroundColor: 'red',
    paddingRight: 10,
    paddingLeft: 10,
    justifyContent: 'center',
    borderRadius: 1,
  },
  // Menu styles
  buttonContainer: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 0,
    // backgroundColor: 'skyblue',
    backgroundColor: 'black',
  },
  button: {
    // paddingHorizontal: 5,
    paddingVertical: 2,
    // backgroundColor: 'skyblue',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    height: 84,
    width: 'auto',
    // borderWidth: 2, // Set the border width
    // borderColor: 'blue', // Set the border color
    // borderRadius: 5, 
  },
  buttonLabel: {
    fontSize: 22,
    fontWeight: '500',
    // color: 'black',
    color: 'white',
    textAlign: 'center',
  },
  selectedContent: {
    backgroundColor: 'blue',
    borderRadius: 6,
  },
  selectedContentAuto: {
    backgroundColor: 'olive',
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  selectedContentTeleop: {
    backgroundColor: 'midnightblue',
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  selectedLabel: {
    color: 'white',
  },
  // testing to be removed in future

});

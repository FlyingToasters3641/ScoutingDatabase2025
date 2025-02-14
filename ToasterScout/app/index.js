import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Settings } from 'react-native';
// import * as ScreenOrientation from 'expo-screen-orientation';
import Ionicons from '@expo/vector-icons/Ionicons'; //https://icons.expo.fyi/Index
import MatchSetup from "@/app/MatchSetup";
import Auto from "@/app/Auto";
import TeleOp from "@/app/TeleOp";
import CageResult from "@/app/CageResult";
import SaveMatch from "@/app/SaveMatch";
import AppSettings from "@/app/AppSettings";


export default function App() {
  
  const [selectedContent, setSelectedContent] = useState('MatchSelect');
  const [scoutLocation, setScoutLocation] = useState('Blue 1'); // Info from the Setup view screen in future release
  const [scoutName, setScoutName] = useState('JacobK'); // Info from the Match Selectvview in future release
  const [currentTeam, setCurrentTeam] = useState(3641); // Info from the Match Selectvview in future release
  const [matchNumber, setMatchNumber] = useState(1); // Info from the Match Selectvview in future release

  // useEffect(() => {
  //   const changeScreenOrientation = async () => {
  //     await ScreenOrientation.unlockAsync();
  //   };
  //   changeScreenOrientation();
  // }, []);

  // async function changeScreenOrientation() {
  //   await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  // }  {...{setScoutName}}


  const handleScoutNameChange = (newScoutName) => {
    setScoutName(newScoutName);
  }

  const handleMatchChange = (newMatchNumber, newTeamNumber) => {
    setCurrentTeam(newTeamNumber);
    setMatchNumber(newMatchNumber);
  }

  // Default view when opening up the app.  Maybe future will open to Setup if match, teams, tablet are not set.
  const [content, setContent] = useState(<MatchSetup currentScoutName={scoutName} currentMatchNumber={matchNumber} onScoutNameChange={handleScoutNameChange} onMatchChange={handleMatchChange} />);

  return (
    <View style={{padding: 0, flex: 1}}>
      <View style={[styles.topbar, styles.row]}>
        <View style={{flex: 2, flexDirection: 'row'}}>
          <Ionicons name="eye" size={22} color="white" />
          <Text style={[styles.title, {paddingRight: 20}]}> TFT Scouter</Text>
          <Text style={[styles.title, scoutLocation[0] === 'B' ? styles.teamBlue : styles.teamRed]}>{scoutLocation}</Text></View>
        <View style={{flex: 4, flexDirection: 'row-reverse'}}>
          <TouchableOpacity
              activeOpacity={0.5}
              key="Settings"
              onPress={() => {setContent(<AppSettings />); setSelectedContent('AppSettings');}}>
              <Ionicons name="menu" size={32} color="white" />
          </TouchableOpacity>
          <Text style={[styles.title, {paddingRight: 10}]}>Match: {matchNumber} | Team: {currentTeam} | {scoutName}</Text>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            key="MatchSelect"
            onPress={() => {setContent(<MatchSetup currentScoutName={scoutName} currentMatchNumber={matchNumber}  onScoutNameChange={handleScoutNameChange} onMatchChange={handleMatchChange} />); setSelectedContent('MatchSelect');}}
            style={[styles.button, selectedContent === 'MatchSelect' && styles.selectedContent]}>
            <Text style={[styles.buttonLabel, selectedContent === 'MatchSelect' && styles.selectedLabel]}>Match{"\n"}Select</Text>
          </TouchableOpacity>
          <TouchableOpacity
          activeOpacity={0.5}
            key="Auto"
            onPress={() => {setContent(<Auto />); setSelectedContent('Auto');}}
            style={[styles.button, selectedContent === 'Auto' && styles.selectedContent]}>
            <Text style={[styles.buttonLabel, selectedContent === 'Auto' && styles.selectedLabel]}>Auto</Text>
          </TouchableOpacity>
          <TouchableOpacity
          activeOpacity={0.5}
            key="TeleOp"
            onPress={() => {setContent(<TeleOp />); setSelectedContent('TeleOp');}}
            style={[styles.button, selectedContent === 'TeleOp' && styles.selectedContent]}>
            <Text style={[styles.buttonLabel, selectedContent === 'TeleOp' && styles.selectedLabel]}>TeleOp</Text>
          </TouchableOpacity>
          <TouchableOpacity
          activeOpacity={0.5}
            key="CageResult"
            onPress={() => {setContent(<CageResult />); setSelectedContent('CageResult');}}
            style={[styles.button, selectedContent === 'CageResult' && styles.selectedContent]}>
            <Text style={[styles.buttonLabel, selectedContent === 'CageResult' && styles.selectedLabel]}>Cage{"\n"}Result</Text>
          </TouchableOpacity>
          <TouchableOpacity
          activeOpacity={0.5}
            key="SaveMatch"
            onPress={() => {setContent(<SaveMatch />); setSelectedContent('SaveMatch');}}
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
  },
  teamRed:{
    backgroundColor: 'red',
    paddingRight: 10,
    paddingLeft: 10,
    justifyContent: 'center',
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
    height: 95,
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
  selectedLabel: {
    color: 'white',
  },
  // testing to be removed in future

});

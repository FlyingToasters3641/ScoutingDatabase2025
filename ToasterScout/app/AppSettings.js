import React, { useState } from 'react';
import { Text, StyleSheet, View, ScrollView, Pressable, Image, Alert, TextInput } from 'react-native';
import { TBA_DATABASE_URL, TBA_KEY, DATA_MODEL_VERSION, TOASTERSCOUT_APP_VERSION, TOASTERSCOUT_APP_TYPE } from './Constants';
import axios from 'axios';

const AppSettings = ({
  appData,
  setAppData,
  matchData,
  setMatchData,
}) => {

  // Example of how to use state in a functional component
  const [isOption1Enabled, setOption1Enabled] = useState(false);
  const [isOption2Enabled, setOption2Enabled] = useState(false);
  const toggleOption1 = () => setOption1Enabled(!isOption1Enabled);
  const toggleOption2 = () => setOption2Enabled(!isOption2Enabled);

  // *** default appData and matchData for deleting ***
  const defaultAppData = {currentTbaEventKey: '', allianceLocation: 'Select Alliance Team in Settings', fieldOrientation: 'Spectator', currentScout: '', currentTeam: null, currentMatch: null};
  const defaultMatchData = [];


  const [displayAllianceLocation, setDisplayAllianceLocation] = useState(appData.allianceLocation);
  const [displayfieldOrientation, setDisplayfieldOrientation] = useState(appData.fieldOrientation);

  const ScoringTableView = require('@/assets/images/scoring-table-view.png');
  const SpectatorView = require('@/assets/images/spectator-view.png');
  
  const [displayEventKey, setDisplayEventKey] = useState(appData.currentTbaEventKey);
  const [isEventKeyInputVisible, setEventKeyInputVisible] = useState(false);
  const [isImporting, setIsImporting] = useState(false); // State to track import progress
  const [isCheckingStatus, setIsCheckingStatus] = useState(false); // State to track TBA status check progress

  const handleImportMatches = async (start, end) => {

    // Check if the displayEventKey is set
    if (!displayEventKey) {
      Alert.alert('Invalid Event Key', `Set an Event key before proceeding.`);
      // console.error('Invalid event key:', displayEventKey);
      return;
    }

    // Determine the index for teamNumber based on displayAllianceLocation
    const allianceIndexMap = {
      'Red 1': { alliance: 'red', index: 0 },
      'Red 2': { alliance: 'red', index: 1 },
      'Red 3': { alliance: 'red', index: 2 },
      'Blue 1': { alliance: 'blue', index: 0 },
      'Blue 2': { alliance: 'blue', index: 1 },
      'Blue 3': { alliance: 'blue', index: 2 },
    };

    const allianceInfo = allianceIndexMap[displayAllianceLocation];

    if (!allianceInfo) {
      Alert.alert('Alliance Location', `Set an Alliance location before proceeding.`);
      // console.error('Invalid alliance location:', displayAllianceLocation);
      return;
    }

    setIsImporting(true); // Set loading state to true

    // Attempt to fetch matches from TBA
    try {
      const response = await axios.get(`${TBA_DATABASE_URL}/event/${displayEventKey}/matches/simple`, {
        headers: {
          'X-TBA-Auth-Key': `${TBA_KEY}`,
          'accept': 'application/json'
        }
      });

      // console.log(`Matches Received:`, response.data);

      // Filter matches by match number, comp_level, and sort by match number
      const matches = response.data
        .filter(match => match.comp_level === 'qm' && match.match_number >= start && match.match_number <= end)
        .sort((a, b) => a.match_number - b.match_number);

      setMatchData(prevMatchData => [
        ...prevMatchData,
        ...matches.map(match => ({
          matchId: match.key,
          matchNumber: match.match_number,
          teamNumber: match.alliances[allianceInfo.alliance].team_keys[allianceInfo.index].substring(3),
          matchStatus: 0
        }))
      ]);

      console.log(`Matches ${start}-${end} added:`, matches);

      // Alert the user that matches have been added
      Alert.alert('Success', `Matches ${start}-${end} have been successfully added.`);
      
    } catch (error) {
      console.error('Error fetching matches:', error);
      Alert.alert('Error', 'Failed to import matches. Please try again.');
    } finally {
      setIsImporting(false); // Reset loading state
    }
  };

  const toggleEventKeyInput = () => {
    setEventKeyInputVisible(!isEventKeyInputVisible);
  };

  const checkTBAStatus = async () => {
    setIsCheckingStatus(true); // Set loading state to true
    try {
      const response = await axios.get(`${TBA_DATABASE_URL}/status`, {
        headers: {
          'X-TBA-Auth-Key': `${TBA_KEY}`,
          'accept': 'application/json',
        },
      });
      const isDatafeedDown = response.data?.is_datafeed_down;
      if (isDatafeedDown === false) {
        Alert.alert('TBA Status', 'Connection successful. TBA is online.');
      } else {
        Alert.alert('TBA Status', 'TBA is down or unavailable.');
      }
    } catch (error) {
      console.error('Error checking TBA status:', error);
      Alert.alert('TBA Status', 'TBA is down or unavailable.');
    } finally {
      setIsCheckingStatus(false); // Reset loading state
    }
  };

  return (
    <>
      <View // This view is the show the usable screen space on teh actually tablet. can be remvoed in future release
        style={[
          {
            top: 0,
            left: 0,
            width: 906,
            height: 508,
            position: 'absolute',
            // backgroundColor: 'powderblue',
            backgroundColor: 'black',
          },
        ]}
      />
      <Text style={[styles.contentText, {backgroundColor: 'black', marginLeft: 10, fontWeight: 'bold', fontSize: 28,}]}>Settings</Text>
      <ScrollView>
        <SettingsGroup title="Alliance Team">
          <Text style={[styles.contentTextInfo, ]}>The Alliance Team for this tablet to scount - R1 is Red 1.</Text> 
          <View style={{ flexDirection: 'row', /*justifyContent: 'space-between',*/ alignItems: 'center' }}>
            <Pressable 
              key='Red1'
              onPress={() => {console.log(`Change location to Red 1`); 
                setAppData(prevAppData => ({...prevAppData, allianceLocation: 'Red 1'}));
                setDisplayAllianceLocation('Red 1');}}
              style={[styles.button, displayAllianceLocation === "Red 1" && styles.selectedRed, ]}>
              <Text style={[styles.buttonLabel, displayAllianceLocation === "Red 1" && styles.selectedRed,]}>Red 1</Text>
            </Pressable>
            <Pressable 
              key='Red2'
              onPress={() => {console.log('Change location to Red 2'); 
                setAppData(prevAppData => ({...prevAppData, allianceLocation: 'Red 2'}));
                setDisplayAllianceLocation('Red 2');}}
              style={[styles.button, displayAllianceLocation === "Red 2" && styles.selectedRed, ]}>
              <Text style={[styles.buttonLabel, displayAllianceLocation === "Red 2" && styles.selectedRed,]}>Red 2</Text>
            </Pressable>
            <Pressable 
              key='Red3'
              onPress={() => {console.log('Change location to Red 3'); 
                setAppData(prevAppData => ({...prevAppData, allianceLocation: 'Red 3'}));
                setDisplayAllianceLocation('Red 3');}}
              style={[styles.button, displayAllianceLocation === "Red 3" && styles.selectedRed, ]}>
              <Text style={[styles.buttonLabel, displayAllianceLocation === "Red 3" && styles.selectedRed,]}>Red 3</Text>
            </Pressable>
            <Pressable 
              key='Blue1'
              onPress={() => {console.log('Change location to Blue 1'); 
                setAppData(prevAppData => ({...prevAppData, allianceLocation: 'Blue 1'}));
                setDisplayAllianceLocation('Blue 1');}}
              style={[styles.button, displayAllianceLocation === "Blue 1" && styles.selectedBlue, ]}>
              <Text style={[styles.buttonLabel, displayAllianceLocation === "Blue 1" && styles.selectedBlue,]}>Blue 1</Text>
            </Pressable>
            <Pressable 
              key='Blue2'
              onPress={() => {console.log('Change location to Blue 2'); 
                setAppData(prevAppData => ({...prevAppData, allianceLocation: 'Blue 2'}));
                setDisplayAllianceLocation('Blue 2');}}
              style={[styles.button, displayAllianceLocation === "Blue 2" && styles.selectedBlue,]}>
              <Text style={[styles.buttonLabel, displayAllianceLocation === "Blue 2" && styles.selectedBlue,]}>Blue 2</Text>
            </Pressable>
            <Pressable 
              key='Blue3'
              onPress={() => {console.log('Change location to Blue 3'); 
                setAppData(prevAppData => ({...prevAppData, allianceLocation: 'Blue 3'}));
                setDisplayAllianceLocation('Blue 3');}}
              style={[styles.button, displayAllianceLocation === "Blue 3" && styles.selectedBlue,]}>
              <Text style={[styles.buttonLabel, displayAllianceLocation === "Blue 3" && styles.selectedBlue,]}>Blue 3</Text>
            </Pressable>
          </View>
        </SettingsGroup>

        <SettingsGroup title="Orientation to Field">
          <Text style={[styles.contentTextInfo, ]}>The orientation to field is from where the scouter is scouting.</Text>
          <View style={{ flexDirection: 'row', /*justifyContent: 'space-between',*/ alignItems: 'center' }}>
          <ImageWithButton imageInfo={{imagePath:SpectatorView,imageWidth:250}}>
            <Pressable
              key='Spectator'
              onPress={() => {console.log('Change orientation to Spectator');
                setAppData(prevAppData => ({...prevAppData, fieldOrientation: 'Spectator'}));
                setDisplayfieldOrientation('Spectator');
               }}
              style={[styles.button, displayfieldOrientation === "Spectator" && styles.selectedDefault ]}>
              <Text style={[styles.buttonLabel]}>Spectator</Text>
            </Pressable>
          </ImageWithButton>
          <ImageWithButton imageInfo={{imagePath:ScoringTableView,imageWidth:250}}>
            <Pressable
              key='Scoring'
              onPress={() => {console.log('Change orientation to Scoring Table'); 
                setAppData(prevAppData => ({...prevAppData, fieldOrientation: 'Scoring'}));
                setDisplayfieldOrientation('Scoring');
              }}
              style={[styles.button, displayfieldOrientation === "Scoring" && styles.selectedDefault ]}>
              <Text style={[styles.buttonLabel]}>Scoring Table</Text>
            </Pressable>
          </ImageWithButton>
          </View>
        </SettingsGroup>

        {/* <SettingsGroup title="Batch Add Matchs">
          <Text style={[styles.contentTextInfo, ]}>The name of the scouter for this tablet. * Internet connected required.</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Pressable 
                key='ImportQR'
                onPress={() => {console.log(`Import from QR Code`); 
                  // setAppData(prevAppData => ({...prevAppData, allianceLocation: 'Red 1'}));
                  // setDisplayAllianceLocation('Red 1');
                  }}
                style={[styles.button, ]}>
                <Text style={[styles.buttonLabel,]}>Import from QR Code</Text>
              </Pressable>
              <Pressable 
                key='ImportTBA'
                onPress={() => {console.log(`Inport from TBA`); 
                  // setAppData(prevAppData => ({...prevAppData, allianceLocation: 'Red 1'}));
                  // setDisplayAllianceLocation('Red 1');
                }}
                style={[styles.button,  ]}>
                <Text style={[styles.buttonLabel, ]}>*Import from TBA</Text>
              </Pressable>
            </View>
        </SettingsGroup> */}

        <SettingsGroup title="TBA Match Import*">
          <Text style={[styles.contentTextInfo, ]}>Import matches from TBA. * Internet connected required.</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Pressable 
              key='CheckTBAStatus'
              onPress={checkTBAStatus}
              style={[styles.button, isCheckingStatus && { backgroundColor: 'gray' }]}
              disabled={isCheckingStatus}>
              <Text style={[styles.buttonLabel,]}>{isCheckingStatus ? 'Checking...' : 'Check TBA Status'}</Text>
            </Pressable>
            <Pressable 
              key='ToggleEventKeyInput'
              onPress={toggleEventKeyInput}
              style={[styles.button,]}>
              <Text style={[styles.buttonLabel,]}>Show / Set Event Key</Text>
            </Pressable>
            {isEventKeyInputVisible && (
              <TextInput
                style={{
                  height: 50,
                  borderColor: 'gray',
                  borderWidth: 1,
                  marginTop: 10,
                  paddingHorizontal: 8,
                  color: 'white',
                  backgroundColor: 'black',
                  fontSize: 22,
                  width: '200',
                }}
                placeholder="Enter Event Key"
                placeholderTextColor="gray"
                value={displayEventKey}
                onChangeText={(text) => {
                  setDisplayEventKey(text);
                  setAppData(prevAppData => ({...prevAppData, currentTbaEventKey: text}));
                }}
              />
            )}
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            <Pressable 
              key='ImportTBA1'
              onPress={() => handleImportMatches(1, 40)}
              style={[styles.button, isImporting && { backgroundColor: 'gray' }]}
              disabled={isImporting}>
              <Text style={[styles.buttonLabel,]}>{isImporting ? 'Importing...' : 'Import Matches 1-40'}</Text>
            </Pressable>
            <Pressable 
              key='ImportTBA41'
              onPress={() => handleImportMatches(41, 80)} 
              style={[styles.button, isImporting && { backgroundColor: 'gray' }]}
              disabled={isImporting}>
              <Text style={[styles.buttonLabel, ]}>{isImporting ? 'Importing...' : 'Import Matches 41-80'}</Text>
            </Pressable>
            <Pressable 
              key='ImportTBA81'
              onPress={() => handleImportMatches(81, 120)} 
              style={[styles.button, isImporting && { backgroundColor: 'gray' }]}
              disabled={isImporting}>
              <Text style={[styles.buttonLabel, ]}>{isImporting ? 'Importing...' : 'Import Matches 81+'}</Text>
            </Pressable>
          </View>
        </SettingsGroup>
        

        <SettingsGroup title="Advanced Settings">
          <Text style={[styles.contentTextInfo, ]}>Options to Reset / Clear of TFT Scouter Data Stores.</Text>
          <View style={{ flexDirection: 'row', /*justifyContent: 'space-between',*/ alignItems: 'center' }}>
            <Pressable 
              key='DeleteAppData'
              onPress={() => {console.log(`Delete App Data`);
                setAppData(defaultAppData); 
                setDisplayEventKey('');
                setEventKeyInputVisible(false);
                setDisplayAllianceLocation('');
                setDisplayfieldOrientation('Spectator');
                }}
              style={[styles.button, ]}>
              <Text style={[styles.buttonLabel,]}>Reset Application Data</Text>
            </Pressable>
            <Pressable
              key='DeleteMatchData'
                // script.js
                onPress={() => {console.log(`Delete Match Data`);
          
                    Alert.alert('CAUTION!!!!', 'Are You Sure Bruh?', [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      {text: 'OK', onPress: () => {
                        setMatchData(defaultMatchData);
                        setAppData(prevAppData => ({
                          ...prevAppData,
                          currentTeam: null,
                          currentMatch: null,
                        }));
                      }},
                    ]); 
              }}
              style={[styles.button,  ]}>
              <Text style={[styles.buttonLabel, ]}>Delete All Match Data</Text>
            </Pressable>
          </View>

          {/* <Text style={[styles.contentTextInfo, ]}>{"\n"}Test of Switches in React Native</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={[styles.contentText,]}>Option A</Text>
            <Switch 
              onValueChange={toggleOption1}
              value={isOption1Enabled}
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={[styles.contentText,]}>Option B</Text>
            <Switch 
              onValueChange={toggleOption2}
              value={isOption2Enabled}
            />
          </View> */}
        </SettingsGroup>

      <SettingsGroup title="App Information">
        <Text style={[styles.contentTextInfo]}>
            ToasterScout App Version: {TOASTERSCOUT_APP_VERSION} {TOASTERSCOUT_APP_TYPE}
          </Text>
          <Text style={[styles.contentTextInfo]}>
            Data Model Version: {DATA_MODEL_VERSION}
          </Text>
          <Text style={[styles.contentTextInfo]}>
            TBA API URL: {TBA_DATABASE_URL}
          </Text>
        </SettingsGroup>

      </ScrollView>
    </>
  );
}

function SettingsGroup({ title, children }) {
  return (
    <View style={[styles.group, styles.box]}>
      {title && <Text style={styles.title}>{title}</Text>}
      {/* <View style={styles.box}> */}
        {children}
      {/* </View> */}
    </View>
  );
};

function ImageWithButton({ imageInfo, children }) {
  return (
    <>
    {/* <Text style={{color: 'white',}} >{source}</Text> */}
    <View style={[styles.group, styles.box]}>
      {imageInfo.imagePath && <Image source={imageInfo.imagePath} style={{ width: imageInfo.imageWidth, height: 150, borderRadius: 2, }}  />}
      {/* <View style={styles.box}> */}
        {children}
      {/* </View> */}
    </View>
    </>
  );
};


const styles = StyleSheet.create({
  contentText: {
    fontSize: 22,
    color: 'white',
  },
  contentTextInfo: {
    fontSize: 18,
    color: 'white',
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: 'oldlace',
    // alignSelf: 'flex-start',
    marginHorizontal: '1%',
    marginTop: 8,
    marginBottom: 8,
    minWidth: 98,
    width: 'auto',
    height: 55,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLabel: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
    textAlign: 'center',
  },
  selectedRed: {
    backgroundColor: 'red',
    color: 'white',
  },
  selectedBlue: {
    backgroundColor: 'blue',
    color: 'white',
  },
  selectedDefault: {
    backgroundColor: 'coral',
    borderWidth: 0,
  },
  group: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 22,
    marginBottom: 5,
    color: 'white',
  },
  box: {
    borderWidth: 2,
    borderColor: 'gray', // Change color to your desired border color
    borderRadius: 8,
    padding: 10,
  },
});

export default AppSettings;
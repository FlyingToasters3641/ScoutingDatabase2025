import React, { useState } from 'react';
import { Text, StyleSheet, View, ScrollView, Pressable, Image, Switch  } from 'react-native';


const AppSettings = ({
  appData,
  setAppData
}) => {

  // Example of how to use state in a functional component
  const [isOption1Enabled, setOption1Enabled] = useState(false);
  const [isOption2Enabled, setOption2Enabled] = useState(false);
  const toggleOption1 = () => setOption1Enabled(!isOption1Enabled);
  const toggleOption2 = () => setOption2Enabled(!isOption2Enabled);


  const [displayAllianceLocation, setDisplayAllianceLocation] = useState(appData.allianceLocation);
  const [displayfieldOrientation, setDisplayfieldOrientation] = useState(appData.fieldOrientation);

  const ScoringTableView = require('@/assets/images/scoring-table-view.png');
  const SpectatorView = require('@/assets/images/spectator-view.png');
  

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

        <SettingsGroup title="Advanced Settings">
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
          </View>
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
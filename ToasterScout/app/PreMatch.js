import React, { useState } from 'react';
import { Text, StyleSheet, View, Image, Pressable, Modal, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'; //https://icons.expo.fyi/Index
import Entypo from '@expo/vector-icons/Entypo';


const PreMatch = ({
  appData,
  setAppData,
  matchData,
  setMatchData,
  gameData,
  setGameData,
}) => {

  // *** Process Robot Placement changes ***
  const [displayRobotPlacement, setdisplayRobotPlacement] = useState('none');
  const [placementTopToggled, setPlacementTopToggled] = useState(false);
  const [placementMidToggled, setPlacementMidToggled] = useState(false);
  const [placementBtmToggled, setPlacementBtmToggled] = useState(false);

  // *** Field Orientation images ***
  const BlueScoringTable = require('@/assets/images/blue-scoring.png');
  const BlueSpectator = require('@/assets/images/blue-spectator.png');
  const RedSpectator = require('@/assets/images/red-spectator.png');
  const RedScoringTable = require('@/assets/images/red-scoring.png');
  const ERROR = require('@/assets/images/Error-Screen.png');

  let botLocation = styles.hideBot;
  let imageDisplay = ERROR;

  if (appData.allianceLocation[0] == 'B' && appData.fieldOrientation == "Spectator") {
    imageDisplay = BlueSpectator; 
    botLocation = styles.blueSpectator;
  }
  else if (appData.allianceLocation[0] == 'R' && appData.fieldOrientation == "Spectator") {
    imageDisplay = RedSpectator;
    botLocation = styles.redSpectator;
  }
  else if (appData.allianceLocation[0] == 'B' && appData.fieldOrientation == "Scoring") {
    imageDisplay = BlueScoringTable;
    botLocation = styles.blueScoring;
  }
  else if (appData.allianceLocation[0] == 'R' && appData.fieldOrientation == "Scoring"){
    imageDisplay = RedScoringTable
    botLocation = styles.redScoring;
  }


  const [displayScoutName, setDisplayScoutName] = useState(appData.currentScout);
  // *** Process Scout Name changes ***
  const [modalVisible, setModalVisible] = useState(false);
  const [newScoutName, setNewScoutName] = useState(displayScoutName);

  const onUpdateScoutName = (action) => {
    if (action == 'save') {
      // Update the Scout Name for the application and the settings view
      setAppData(prevAppData => ({...prevAppData, currentScout: newScoutName}));
      setDisplayScoutName(newScoutName);
    }
    else if (action === 'cancel') {
      // Restore the orginal scouter name due to canceling
      setNewScoutName(displayScoutName);
    }
    setModalVisible(!modalVisible);
  }

  return (
  <>
    <View
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
    {/* <Text style={styles.contentText}>906px {"\n"}x {"\n"}508px</Text> */}
    <View style={{padding: 0, flex: 1, flexDirection: 'row'}}>
      <View style={{ flex: 1, marginLeft: 10, }}>
        <Text style={[styles.contentText,]}>1. Select the starting location of the Robot below:</Text>
        <Image source={imageDisplay}
                style={{ width: 480, height: 400,}}/>
        <View style={[{position: 'absolute', height:355, justifyContent: 'space-between',}, botLocation]}>
          <Pressable 
            key = "Top"
            onPress={() => {console.log('Top'); setdisplayRobotPlacement('top');}}
            style={[styles.box, { justifyContent: 'center', alignItems:'center'}, displayRobotPlacement === 'top' && styles.placementActive,]}>
            <Text style={[styles.contentText,]}>{displayRobotPlacement === 'top' ? <Ionicons name="checkmark-circle-outline" size={32} color="white" /> : <Entypo name="circle" size={24} color="white" />}</Text>
          </Pressable>
          <Pressable 
            key = "Mid"
            onPress={() => {console.log('Middle'); setdisplayRobotPlacement('mid');}}
            style={[styles.box, { justifyContent: 'center', alignItems:'center'}, displayRobotPlacement === 'mid' && styles.placementActive,]}>
            <Text style={[styles.contentText,]}>{displayRobotPlacement === 'mid' ? <Ionicons name="checkmark-circle-outline" size={32} color="white" /> : <Entypo name="circle" size={24} color="white" />}</Text>
          </Pressable>
          <Pressable 
            key = "Btm"
            onPress={() => {console.log('Bottom'); setdisplayRobotPlacement('btm');}}
            style={[styles.box, { justifyContent: 'center', alignItems:'center'}, displayRobotPlacement === 'btm' && styles.placementActive,]}>
              <Text style={[styles.contentText,]}>{displayRobotPlacement === 'btm' ? <Ionicons name="checkmark-circle-outline" size={32} color="white" /> : <Entypo name="circle" size={24} color="white" />}</Text>
          </Pressable>
        </View>
      </View>

      <View style={{ flex: 1, marginLeft: 10, }}>
        <View style={{ flex: 3, }}>
          {/* <Text style={styles.contentText}>906px x 508px</Text> */}
          <Text style={[styles.contentText,]}>2. Verify the following are correct:</Text>
          <Pressable
            key="changeScout"
            onPress={() => {console.log('Update Scout'); setModalVisible(true); console.log('matchData:', matchData);}}
            style={[styles.button, styles.selected,]}>
            <Text style={styles.buttonLabel}>{displayScoutName ? `Not ${displayScoutName}? Update` : `Press here to update Scount Name`}</Text>
          </Pressable>
          <Text style={[styles.contentText, {marginLeft: 8,}]}>
            Field Orientation: {appData.fieldOrientation}{'\n'}
            Alliance Location: {appData.allianceLocation}{'\n'}
            Scout Name: {displayScoutName}{'\n'}
            Match: {appData.currentMatch}{'\n'}
            Team: {appData.currentTeam}{'\n'}
          </Text>
        </View>
        <View style={{ flex: 2, }}>
        <Text style={[styles.contentText, ]}>3. Starting Scouting</Text>
          <Pressable
            key="startScouting"
            onPress={() => { console.log('Start Match');}}
            style={[styles.button, styles.selected,]}>
            <Text style={styles.buttonLabel}>Start Scouting</Text>
          </Pressable>
        </View>
      </View> 
    </View> 

      {/* *** Modal to update Scout Name *** */} 
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalCenteredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalContentText}>Update Scout Name (First Name + Last Initial)</Text>
            <TextInput
              style={styles.input}
              onChangeText={setNewScoutName}
              value={newScoutName}
            />
            <View style={{flexDirection: 'row'}}>
              <Pressable
                style={[styles.button, styles.buttonSave]}
                onPress={() => onUpdateScoutName('save')}>
                <Text style={styles.buttonLabel}>Save</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonCancel]}
                onPress={() => onUpdateScoutName('cancel')}>
                <Text style={styles.buttonLabel}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

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
    width: 'auto',
    height: 55,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLabel: {
    fontSize: 20,
    fontWeight: '500',
    // color: 'coral',
    textAlign: 'center',
  },
  // modal styles
  modalCenteredView: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContentText: {
    // marginBottom: 15,
    // textAlign: 'center',
    fontSize: 22,
  },
  input: {
    height: 45,
    minWidth: '40%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 22,
  },
  blueSpectator: {
    top:60,
    left: 75,
  },
  redSpectator: {
    top:46,
    left: 345,
  },
  blueScoring: {
    top:47,
    left: 345,
  },
  redScoring: {
    top: 60,
    left: 75,
  },
  hideBot: {
    top:600,
    left: 75
  },

  box: {
    width: 60,
    height: 112,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'white', // Change color to your desired border color
  },
  placementActive: {
    backgroundColor: 'green',
  },  
});

export default PreMatch;
import React, { useState } from 'react';
import { Text, StyleSheet, View, Image, Pressable, Modal, TextInput } from 'react-native';


const PreMatch = ({
  appData,
  setAppData,
  matchData,
  setMatchData,
}) => {

  const BlueScoringTable = require('@/assets/images/Blue-Scoring Table.png');
  const BlueSpectator = require('@/assets/images/Blue-Spectator.png');
  const RedSpectator = require('@/assets/images/Red, Spectator.png');
  const RedScoringTable = require('@/assets/images/Red, Scoring Table.png');
  const ERROR = require('@/assets/images/Error-Screen.png');

  if (appData.allianceLocation[0] == 'B' && appData.fieldOrientation == "Spectator") {
    imageDisplay = BlueSpectator; 
  }
  else if (appData.allianceLocation[0] == 'R' && appData.fieldOrientation == "Spectator") {
    imageDisplay = RedSpectator;
  }
  else if (appData.allianceLocation[0] == 'B' && appData.fieldOrientation == "Scoring Table") {
    imageDisplay = BlueScoringTable;
  }
  else if (appData.allianceLocation[0] == 'R' && appData.fieldOrientation == "Scoring Table"){
    imageDisplay = RedScoringTable
  }
  else {
    imageDisplay = ERROR
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
        <Text style={[styles.contentText, {backgroundColor: 'black',}]}>Select the starting location of the Robot:</Text>
        <Image source={imageDisplay}
                style={{ width: 440, height: 400,}}/>
        <View style={{position: 'absolute', top:40, left: 315, height:320, justifyContent: 'space-between'  }}>
          <View style={[styles.box, {backgroundColor:'darkcyan', justifyContent: 'center', alignItems:'center'}]}><Text style={[styles.contentText,]}>Lt</Text></View>
          <View style={[styles.box, {backgroundColor:'darkseagreen', justifyContent: 'center', alignItems:'center'}]}><Text style={[styles.contentText,]}>Mid</Text></View>
          <View style={[styles.box, {backgroundColor:'lightskyblue', justifyContent: 'center', alignItems:'center'}]}><Text style={[styles.contentText,]}>Rt</Text></View>
        </View>
      </View>

      <View style={{ flex: 1, marginLeft: 10, }}>
        <View style={{ flex: 3, }}>
          {/* <Text style={styles.contentText}>906px x 508px</Text> */}
          <Text style={[styles.contentText, {backgroundColor: 'black',}]}>Check the following is correct:</Text>
          <Pressable
            key="changeScout"
            onPress={() => {console.log('Update Scout'); setModalVisible(true); console.log('matchData:', matchData);}}
            style={[styles.button, styles.selected,]}>
            <Text style={styles.buttonLabel}>{displayScoutName ? `Not ${displayScoutName}? Update` : `Press here to update Scount Name`}</Text>
          </Pressable>
          <Text style={[styles.contentText, {marginLeft: 8,}]}>
            Field Orientation: {appData.fieldOrientation} Orientation {'\n'}
            Alliance Location: {appData.allianceLocation} {'\n'}
            Scout Name: {displayScoutName} {'\n'}
            Match: {appData.currentMatch} {'\n'}
            Team: {appData.currentTeam} {'\n'}
          </Text>
        </View>
        <View style={{ flex: 1, }}>
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

  box: {
    width: 65,
    height: 100,
  },
});

export default PreMatch;
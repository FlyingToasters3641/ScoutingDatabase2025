import React, { useState } from 'react';
import { Text, StyleSheet, View, ScrollView, Modal, Pressable, TextInput, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'; //https://icons.expo.fyi/Index
import defaultGameData from "@/app/gameData2025";

const MatchSetup = ({
  appData,
  setAppData,
  matchData,
  setMatchData,
  gameData,
  setGameData,
}) => {

  const [displayScoutName, setDisplayScoutName] = useState(appData.currentScout);
  const [displayMatchNumber, setDisplayMatchNumber] = useState(appData.currentMatch);

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

  // *** Process Match changes ***
  const [addMatchModalVisible, setAddMatchModalVisible] = useState(false);
  const [newMatchNumber, setNewMatchNumber] = useState('');
  const [newTeamNumber, setNewTeamNumber] = useState('');
  const [addMatchSuccess, setAddMatchSuccess] = useState(false);
  const [addMatchError, setAddMatchError] = useState(false);
  const [duplicateMatchError, setDuplicateMatchError] = useState(false);
  const [editingMatch, setEditingMatch] = useState(null);

  const onAddMatch = () => {
    if (newMatchNumber && newTeamNumber) {
      const matchExists = matchData.some(match => match.matchNumber === parseInt(newMatchNumber));
      if (matchExists && !editingMatch) {
        setDuplicateMatchError(true);
        setAddMatchError(false);
        setAddMatchSuccess(false);
      } 
      else {
        const newMatch = {
          matchId: `2024milac_qm${newMatchNumber}`,
          matchNumber: parseInt(newMatchNumber),
          teamNumber: parseInt(newTeamNumber),
          matchStatus: 0
        };
        if (editingMatch) {
          setMatchData(prevMatchData => prevMatchData.map(match => match.matchNumber === editingMatch.matchNumber ? newMatch : match));
        } 
        else {
          setMatchData(prevMatchData => ([...prevMatchData, newMatch]));
        }
        setAddMatchSuccess(true);
        setAddMatchError(false);
        setDuplicateMatchError(false);
        // just close the modal if adding a new match was successful (keeping success in modal if we want to show a success message in the future again)
        closeAddMatchModal();
      }
    } else {
      setAddMatchError(true);
      setAddMatchSuccess(false);
      setDuplicateMatchError(false);
    }
  }

  const closeAddMatchModal = () => {
    setAddMatchModalVisible(false);
    setNewMatchNumber('');
    setNewTeamNumber('');
    setAddMatchSuccess(false);
    setAddMatchError(false);
    setDuplicateMatchError(false);
    setEditingMatch(null);
  }

  // console.log('match lenght:', matchData.length);
  // console.log('matchData:', matchData);

  


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

        {/* *** Scout Name update button *** */}
        <View style={{ flexDirection: 'row', /*justifyContent: 'space-between',*/ alignItems: 'center' }}>  
        <Pressable
          key="changeScout"
          onPress={() => {console.log('Update Scout'); setModalVisible(true); console.log('matchData:', matchData);}}
          style={[styles.button, styles.selected, {flex: 3}]}>
          <Text style={styles.buttonLabel}>{displayScoutName ? `Not ${displayScoutName}? Update` : `Press here to update Scount Name`}</Text>
        </Pressable>
        <Pressable
          key="addMatch"
          onPress={() => {console.log('Add Match'); setAddMatchModalVisible(true);}}
          style={[styles.button, styles.selected, {flex: 1}]}>
          <Text style={styles.buttonLabel}>Add Match</Text>
        </Pressable>
        </View>

        {/* *** Listing of avalible matches *** */}
        <Text style={[styles.contentText, {backgroundColor: 'black', marginLeft: 10}]}>Select a match to scout:</Text>
        <ScrollView>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {matchData.length === 0 ? (
            <View style={styles.noMatchesContainer}>
              <Ionicons name="warning" size={32} color="white" />
              <Text style={[styles.contentText,]}> No matches to scout! Select Add Match or Inport Matches in the settings menu.</Text>
            </View>
          ) : (
            matchData.map(value => (
              <Pressable
                key={value.matchId}
                onPress={() => {console.log('Match: ' + value.matchNumber +  ` selected`); 
                                setAppData(prevAppData => ({...prevAppData, currentMatch: value.matchNumber, currentTeam: value.teamNumber}));
                                setDisplayMatchNumber(value.matchNumber);
                                setGameData(defaultGameData);}}
                onLongPress={value.matchStatus !== 2 ? () => {
                  setEditingMatch(value);
                  setNewMatchNumber(value.matchNumber.toString());
                  setNewTeamNumber(value.teamNumber.toString());
                  setAddMatchModalVisible(true);
                } : null}
                // onLongPress={() => Alert.alert('Match: ' + value.matchNumber +  ` selected`)}
                delayLongPress={750}
                style={[styles.matchButton, displayMatchNumber === value.matchNumber && styles.matchSelected, value.matchStatus == 2 && styles.matchSaved,]}>
                <Text style={[styles.buttonLabel]}>{value.matchStatus == 2 && <Ionicons name="checkmark-done" size={18} color="black" />}{value.matchNumber}{"\n"}{value.teamNumber}</Text>
              </Pressable> 
            ))
          )}
          </View>
        </ScrollView>
          
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

        {/* *** Modal to add/edit a match *** */}
        <Modal
        animationType="fade"
        transparent={true}
        visible={addMatchModalVisible}
        onRequestClose={() => closeAddMatchModal()}>
          <View style={styles.modalCenteredView}>
            <View style={styles.modalView}>
              {
              addMatchSuccess ? (
                <>
                  <Text style={styles.modalContentText}>Match {editingMatch ? 'updated' : 'added'} successfully!</Text>
                  <Pressable
                    style={[styles.button, styles.buttonSave]}
                    onPress={() => closeAddMatchModal()}>
                    <Text style={styles.buttonLabel}>Close</Text>
                  </Pressable>
                </>
              ) : (
                <>
                  <Text style={styles.modalContentText}>{editingMatch ? 'Edit Match' : 'Add New Match'}</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Match Number"
                    keyboardType="numeric"
                    onChangeText={setNewMatchNumber}
                    value={newMatchNumber}
                    editable={!editingMatch} // Disable editing match number if editing
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Team Number"
                    keyboardType="numeric"
                    onChangeText={setNewTeamNumber}
                    value={newTeamNumber}
                  />
                  {addMatchError && <Text style={styles.errorText}>Please enter valid match and team numbers.</Text>}
                  {duplicateMatchError && <Text style={styles.errorText}>Match number already exists. Please enter a different match number.</Text>}
                  <View style={{flexDirection: 'row'}}>
                    <Pressable
                      style={[styles.button, styles.buttonSave]}
                      onPress={() => onAddMatch()}>
                      <Text style={styles.buttonLabel}>{editingMatch ? 'Save' : 'Add'}</Text>
                    </Pressable>
                    <Pressable
                      style={[styles.button, styles.buttonCancel]}
                      onPress={() => closeAddMatchModal()}>
                      <Text style={styles.buttonLabel}>Cancel</Text>
                    </Pressable>
                  </View>
                </>
              )
              }
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
  matchButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: 'oldlace',
    // alignSelf: 'flex-start',
    marginHorizontal: '1%',
    marginTop: 8,
    marginBottom: 8,
    width: 80,
    height: 55,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  matchSelected: {
    backgroundColor: 'coral',
    borderWidth: 0,
  },
  matchSaved: {
    backgroundColor: 'green',
    borderWidth: 0,
  },
  buttonLabel: {
    fontSize: 20,
    fontWeight: '500',
    // color: 'coral',
    textAlign: 'center',
  },
  noMatchesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
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
});

export default MatchSetup;
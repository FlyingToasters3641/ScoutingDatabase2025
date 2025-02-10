import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
// import * as ScreenOrientation from 'expo-screen-orientation';
import Ionicons from '@expo/vector-icons/Ionicons'; //https://icons.expo.fyi/Index

const Content1 = () => <Text style={styles.contentText}>This is content for Match Setup.</Text>;
const Content2 = () => (
  <>
  <Text style={styles.contentText}>This is content for Auto.</Text>
  <View
        style={[
          {
            top: 100,
            left: 10,
            width: 50,
            height: 50,
            position: 'absolute',
            backgroundColor: 'powderblue',
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}
      >
        <Ionicons name="add" size={32} color="black" />
      </View>
  </>
);
const Content3 = () => <Text style={styles.contentText}>This is content for Teleop.</Text>;
const Content4 = () => (
  <>
  <Text style={styles.contentText}>This is content for Endgame.</Text>

  <View
        style={[
          {
            top: 0,
            left: 0,
            width: 906,
            height: 477,
            position: 'absolute',
            backgroundColor: 'powderblue',
          },
        ]}
      />
      <Text style={styles.contentText}>906px {"\n"}x {"\n"}477px</Text>
  </>
);
const Content5 = () => <Text style={styles.contentText}>This is content for Save Match.</Text>;

export default function App() {
  const [content, setContent] = useState(<Content1 />);
  const [selectedContent, setSelectedContent] = useState('MatchSelect');

  // useEffect(() => {
  //   const changeScreenOrientation = async () => {
  //     await ScreenOrientation.unlockAsync();
  //   };
  //   changeScreenOrientation();
  // }, []);

  // async function changeScreenOrientation() {
  //   await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  // }

  return (
    <View style={{padding: 0, flex: 1}}>
      <View style={[styles.topbar, styles.row]}>
        <Text style={styles.title}>TFT Scouter</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            key="MatchSelect"
            onPress={() => {setContent(<Content1 />); setSelectedContent('MatchSelect');}}
            style={[styles.button, selectedContent === 'MatchSelect' && styles.selectedContent]}>
            <Text style={[styles.buttonLabel, selectedContent === 'MatchSelect' && styles.selectedLabel]}>Match{"\n"}Select</Text>
          </TouchableOpacity>
          <TouchableOpacity
          activeOpacity={0.5}
            key="Auto"
            onPress={() => {setContent(<Content2 />); setSelectedContent('Auto');}}
            style={[styles.button, selectedContent === 'Auto' && styles.selectedContent]}>
            <Text style={[styles.buttonLabel, selectedContent === 'Auto' && styles.selectedLabel]}>Auto</Text>
          </TouchableOpacity>
          <TouchableOpacity
          activeOpacity={0.5}
            key="TeleOp"
            onPress={() => {setContent(<Content3 />); setSelectedContent('TeleOp');}}
            style={[styles.button, selectedContent === 'TeleOp' && styles.selectedContent]}>
            <Text style={[styles.buttonLabel, selectedContent === 'TeleOp' && styles.selectedLabel]}>TeleOp</Text>
          </TouchableOpacity>
          <TouchableOpacity
          activeOpacity={0.5}
            key="EndGame"
            onPress={() => {setContent(<Content4 />); setSelectedContent('EndGame');}}
            style={[styles.button, selectedContent === 'EndGame' && styles.selectedContent]}>
            <Text style={[styles.buttonLabel, selectedContent === 'EndGame' && styles.selectedLabel]}>End{"\n"}Game</Text>
          </TouchableOpacity>
          <TouchableOpacity
          activeOpacity={0.5}
            key="SaveMatch"
            onPress={() => {setContent(<Content5 />); setSelectedContent('SaveMatch');}}
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

  contentText: {
    fontSize: 22,
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
  // Menu styles
  buttonContainer: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 0,
    backgroundColor: 'skyblue',
  },
  button: {
    // paddingHorizontal: 5,
    paddingVertical: 2,
    backgroundColor: 'skyblue',
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
    color: 'black',
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
  box: {
    width: 100,
    height: 100,
  },
});

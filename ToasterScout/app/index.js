import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
// import * as ScreenOrientation from 'expo-screen-orientation';

const Content1 = () => <Text style={styles.contentText}>This is content for Setup.</Text>;
const Content2 = () => <Text style={styles.contentText}>This is content for Auto.</Text>;
const Content3 = () => <Text style={styles.contentText}>This is content for Teleop.</Text>;
const Content4 = () => <Text style={styles.contentText}>This is content for End Game.</Text>;
const Content5 = () => <Text style={styles.contentText}>This is content for Save Match.</Text>;

export default function App() {
  const [content, setContent] = useState(<Content1 />);
  const [selectedContent, setSelectedContent] = useState('flex-start');

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
            key="MatchSelect"
            onPress={() => setContent(<Content1 />)}
            style={[styles.button,]}>
            <Text style={[styles.buttonLabel,]}>Match Select</Text>
          </TouchableOpacity>
          <TouchableOpacity
            key="Auto"
            onPress={() => setContent(<Content2 />)}
            style={[styles.button,]}>
            <Text style={[styles.buttonLabel,]}>Auto</Text>
          </TouchableOpacity>
          <TouchableOpacity
            key="TeleOp"
            onPress={() => setContent(<Content3 />)}
            style={[styles.button,]}>
            <Text style={[styles.buttonLabel,]}>TeleOp</Text>
          </TouchableOpacity>
          <TouchableOpacity
            key="EndGame"
            onPress={() => setContent(<Content4 />)}
            style={[styles.button,]}>
            <Text style={[styles.buttonLabel,]}>End Game</Text>
          </TouchableOpacity>
          <TouchableOpacity
            key="SaveMatch"
            onPress={() => setContent(<Content5 />)}
            style={[styles.button,]}>
            <Text style={[styles.buttonLabel,]}>Save Match</Text>
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
    flex: 5,
    backgroundColor: 'coral',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 0,
    backgroundColor: 'red',
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
  button: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    // borderRadius: 4,
    backgroundColor: 'oldlace',
    alignSelf: 'flex-start',
    // marginHorizontal: '1%',
    // marginBottom: 6,
    // minWidth: '98%',
    textAlign: 'center',
    height: 125,
  },
  selected: {
    backgroundColor: 'coral',
    borderWidth: 0,
  },
  buttonLabel: {
    fontSize: 24,
    fontWeight: '500',
    color: 'coral',
    textAlign: 'center',
  },
  selectedLabel: {
    color: 'white',
  },
});

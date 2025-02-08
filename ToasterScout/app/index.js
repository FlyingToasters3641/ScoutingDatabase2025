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
        <Text style={styles.title}>ToasterScouter</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button style={styles.button} title="Setup" onPress={() => setContent(<Content1 />)} />
          <Button title="Auto" onPress={() => setContent(<Content2 />)} />
          <Button title="TeleOp" onPress={() => setContent(<Content3 />)} />
          <Button title="End Game" onPress={() => setContent(<Content4 />)} />
          <Button title="Save Match" onPress={() => setContent(<Content5 />)} />
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
    justifyContent: 'space-between',
    padding: 0,
    backgroundColor: 'red',
  },
  button: {
    color: 'black',
  },
  contentText: {
    fontSize: 22,
  },
  row: {
    flexDirection: 'row',
  },
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
});

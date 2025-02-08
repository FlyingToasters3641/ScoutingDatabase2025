import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';

const Content1 = () => <Text style={styles.contentText}>This is content for Setup.</Text>;
const Content2 = () => <Text style={styles.contentText}>This is content for Auto.</Text>;
const Content3 = () => <Text style={styles.contentText}>This is content for Teleop.</Text>;
const Content4 = () => <Text style={styles.contentText}>This is content for End Game.</Text>;
const Content5 = () => <Text style={styles.contentText}>This is content for Save Match.</Text>;

export default function App() {
  const [content, setContent] = useState(<Content1 />);

  useEffect(() => {
    const changeScreenOrientation = async () => {
      await ScreenOrientation.unlockAsync();
    };
    changeScreenOrientation();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Setup" onPress={() => setContent(<Content1 />)} />
        <Button title="Auto" onPress={() => setContent(<Content2 />)} />
        <Button title="TeleOp" onPress={() => setContent(<Content3 />)} />
        <Button title="End Game" onPress={() => setContent(<Content4 />)} />
        <Button title="Save Match" onPress={() => setContent(<Content5 />)} />
      </View>
      <View style={styles.contentContainer}>
        {content}
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  contentContainer: {
    flex: 5,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'space-around',
    padding: 10,
  },
  contentText: {
    fontSize: 22,
  },
});

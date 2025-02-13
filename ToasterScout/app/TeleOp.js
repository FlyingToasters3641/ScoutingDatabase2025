import React, { useState } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'; //https://icons.expo.fyi/Index


const TeleOp = () => {

  const showAlert = () =>
    Alert.alert(
      'Alert Title',
      'My Alert Msg',
      [
        {
          text: 'Cancel',
          onPress: () => Alert.alert('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert(
            'This alert was dismissed by tapping outside of the alert dialog.',
          ),
      },
    );

    const createTwoButtonAlert = () =>
      Alert.alert('Alert Title', 'My Alert Msg', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);

    return (
      <>
      <View style={[
        {
          top: 0,
          left: 0,
          width: 906,
          height: 477,
          position: 'absolute',
          backgroundColor: 'powderblue',
        },
      ]}>
        <Image
          source={require('@/assets/images/g2025-fieldview-blue.png')} 
          style={{ width: 524, height: 477 }} 
        />
    </View>
    <View style={[
        {
          top: 100,
          left: 100,
          width: 50,
          height: 50,
          position: 'absolute',
          backgroundColor: 'powderblue',
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}
    >
      <TouchableOpacity
            activeOpacity={0.5}
            key="plus1"
            onPress={showAlert}>
            <Ionicons name="add" size={32} color="white" />
          </TouchableOpacity>
    </View>
    <View style={[
        {
          top: 100,
          left: 300,
          width: 50,
          height: 50,
          position: 'absolute',
          backgroundColor: 'powderblue',
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}
    >
      <TouchableOpacity
            activeOpacity={0.5}
            key="plus2"
            onPress={createTwoButtonAlert}>
            <Ionicons name="add" size={32} color="white" />
          </TouchableOpacity>
    </View>
    </>

    );
}

const styles = StyleSheet.create({
  contentText: {
    fontSize: 22,
  },
});

export default TeleOp;
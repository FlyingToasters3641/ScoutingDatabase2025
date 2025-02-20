import React, { useState } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'; //https://icons.expo.fyi/Index
import Entypo from '@expo/vector-icons/Entypo';

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
          backgroundColor: 'black',
        },
      ]}>
    </View>
    <View>
      <Image
        source={require('@/assets/images/g2025-fieldview-teleop-blue.png')} 
        style={{ left: 10, width: 412, height: 470 }} 
      />
      <TouchableOpacity
        style={[
          styles.smallButton,
          {
            top: 115,
            left: 86,
          },
        ]}
        activeOpacity={0.5}
        key="plus1"
        onPress={showAlert}>
        <Entypo name="circle" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.smallButton,
          {
            top: 80,
            left: 155,
          },
        ]}
        activeOpacity={0.5}>
        <Entypo name="circle" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.smallButton,
          {
            top: 80,
            left: 218,
          },
        ]}
        activeOpacity={0.5}>
        <Entypo name="circle" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.smallButton,
          {
            top: 115,
            left: 286,
          }
        ]}
        activeOpacity={0.5}
        key="plus2"
        onPress={createTwoButtonAlert}>
        <Entypo name="circle" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.smallButton,
          {
            top: 172,
            left: 315,
          },
        ]}
        activeOpacity={0.5}>
        <Entypo name="circle" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.smallButton,
          {
            top: 243,
            left: 315,
          },
        ]}
        activeOpacity={0.5}>
        <Entypo name="circle" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.smallButton,
          {
            top: 295,
            left: 286,
          },
        ]}
        activeOpacity={0.5}>
        <Entypo name="circle" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.smallButton,
          {
            top: 331,
            left: 218,
          },
        ]}
        activeOpacity={0.5}>
        <Entypo name="circle" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.smallButton,
          {
            top: 331,
            left: 162,
          },
        ]}
        activeOpacity={0.5}>
        <Entypo name="circle" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.smallButton,
          {
            top: 295,
            left: 90,
          },
        ]}
        activeOpacity={0.5}>
        <Entypo name="circle" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.smallButton,
          {
            top: 243,
            left: 65,
          },
        ]}
        activeOpacity={0.5}>
        <Entypo name="circle" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.smallButton,
          {
            top: 169,
            left: 65,
          },
        ]}
        activeOpacity={0.5}>
        <Entypo name="circle" size={24} color="black" />
      </TouchableOpacity>
    </View>

    <TouchableOpacity
        style={[
          styles.bigButton,
          {
            top: 10,
            left: 490,
          },
        ]}
        activeOpacity={0.5}>
        <Entypo name="circle-with-plus" size={30} color="black" /><Text style={styles.bigButtonText}>Coral Scored</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.bigButton,
          {
            top: 10,
            left: 685,
          },
        ]}
        activeOpacity={0.5}>
        <Entypo name="circle-with-cross" size={30} color="black" /><Text style={styles.bigButtonText}>Coral Missed</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.bigButton,
          {
            top: 110,
            left: 490,
          },
        ]}
        activeOpacity={0.5}>
        <Entypo name="circle-with-plus" size={30} color="black" /><Text style={styles.bigButtonText}>Net Scored</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.bigButton,
          {
            top: 110,
            left: 685,
          },
        ]}
        activeOpacity={0.5}>
        <Entypo name="circle-with-cross" size={30} color="black" /><Text style={styles.bigButtonText}>Net Missed</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.bigButton,
          {
            top: 210,
            left: 490,
          },
        ]}
        activeOpacity={0.5}>
        <Entypo name="circle-with-plus" size={30} color="black" /><Text style={styles.bigButtonText}>Processor Scored</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.bigButton,
          {
            top: 210,
            left: 685,
          },
        ]}
        activeOpacity={0.5}>
        <Entypo name="circle-with-cross" size={30} color="black" /><Text style={styles.bigButtonText}>Processor Missed</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.midButton,
          {
            top: 360,
            left: 490,
          },
        ]}
        activeOpacity={0.5}>
        <Text style={styles.midButtonText}>Coral Ground Pick-Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.midButton,
          {
            top: 360,
            left: 620,
          },
        ]}
        activeOpacity={0.5}>
        <Text style={styles.midButtonText}>Coral Station Pick-Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.midButton,
          {
            top: 360,
            left: 750,
          },
        ]}
        activeOpacity={0.5}>
        <Text style={styles.midButtonText}>Algae Pick-Up</Text>
      </TouchableOpacity>
  </>

  );
}

const styles = StyleSheet.create({
  contentText: {
    fontSize: 22,
  },
  midButtonText: {
    fontSize: 14,
    textAlign: 'center',
  },
  bigButtonText: {
    fontSize: 18,
    textAlign: 'center',
  },
  smallButton: {
    borderRadius: 8,
    width: 50,
    height: 50,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'oldlace'
  },
  bigButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 8,
    width: 182,
    height: 75,
    position: 'absolute',
    backgroundColor: 'oldlace',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  midButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 8,
    width: 115,
    height: 75,
    position: 'absolute',
    backgroundColor: 'oldlace',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});

export default TeleOp;
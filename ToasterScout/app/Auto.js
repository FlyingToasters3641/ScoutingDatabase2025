import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'; //https://icons.expo.fyi/Index
import image from "./img/Auton.pdf"; 

function Component() {
  return (
    <div style={{ backgroundImage:`url(${image})` }}>
      .
    </div>
  );
}

export { Component };

const Auto = () => {
    return (
        <>
        <Text style={styles.contentText}></Text>
        <View
              style={[
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
              <Ionicons name="add" size={32} color="black" />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
  contentText: {
    fontSize: 22,
  },
});

export default Auto;
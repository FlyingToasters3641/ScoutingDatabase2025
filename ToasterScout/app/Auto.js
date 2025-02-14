import React, { useState } from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'; //https://icons.expo.fyi/Index

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
      <Image
          source={require('@/assets/images/react-logo.png')} 
          style={{ width: 524, height: 477 }} 
        />
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
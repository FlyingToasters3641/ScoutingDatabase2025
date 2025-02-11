import React, { useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';

const SaveMatch = () => {
  const [pressed1, setPressed1] = useState(false);

  const handlePress = () => {
    setPressed1(true);
  };


    return (
      <>
        <TouchableOpacity onPress={handlePress}>
        <View
          style={[
            {
              top: 100,
              left: 25,
              width: 200,
              height: 100,
              position: 'absolute',
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            },
          ]}
        >
          <Text style={styles.buttonText}>Generate QRCode</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePress}>
        <View
          style={[
            {
              top: 275,
              left: 25,
              width: 200,
              height: 100,
              position: 'absolute',
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            },
          ]}
        >
          <Text style={styles.buttonText}>New Match</Text>
        </View>
        </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
  contentText: {
    fontSize: 22,
  },
  buttonText: {
    fontSize: 20,
  },
});

export default SaveMatch;
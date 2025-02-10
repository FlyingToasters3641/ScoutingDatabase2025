import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';


const TeleOp = () => {
    return (
        <Text style={styles.contentText}>This is content for TeleOp.</Text>
    );
}

const styles = StyleSheet.create({
  contentText: {
    fontSize: 22,
  },
});

export default TeleOp;
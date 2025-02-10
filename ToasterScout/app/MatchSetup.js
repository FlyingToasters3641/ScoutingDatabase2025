import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';


const MatchSetup = () => {
    return (
        <Text style={styles.contentText}>This is content for Match Setup.</Text>
    );
}

const styles = StyleSheet.create({
  contentText: {
    fontSize: 22,
  },
});

export default MatchSetup;
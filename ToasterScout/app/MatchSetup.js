import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';


const MatchSetup = () => {
    return (
        <Text style={styles.contentText}>This is content for Match Setup - New Format.</Text>
    );
}

const styles = StyleSheet.create({
  contentText: {
    fontSize: 45,
  },
});

export default MatchSetup;
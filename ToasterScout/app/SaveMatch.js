import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';


const SaveMatch = () => {
    return (
        <Text style={styles.contentText}>This is content for Save Match.</Text>
    );
}

const styles = StyleSheet.create({
  contentText: {
    fontSize: 22,
  },
});

export default SaveMatch;
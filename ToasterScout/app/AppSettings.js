import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';


const AppSettings = () => {
    return (
        <Text style={styles.contentText}>This is content for Settings</Text>
    );
}

const styles = StyleSheet.create({
  contentText: {
    fontSize: 22,
  },
});

export default AppSettings;
import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';


const PostMatch = () => {
    return (
        <>
          
          <View
                style={[
                  {
                    top: 0,
                    left: 0,
                    width: 906,
                    height: 508,
                    position: 'absolute',
                    backgroundColor: 'powderblue',
                  },
                ]}
              />
              <Text style={styles.contentText}>This is content for Post Match Results.</Text>
              <Text style={styles.contentText}>906px {"\n"}x {"\n"}508px</Text>
          </>
    );
}

const styles = StyleSheet.create({
  contentText: {
    fontSize: 22,
  },
});

export default PostMatch;
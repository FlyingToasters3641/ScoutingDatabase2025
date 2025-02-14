import React, { useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';


const MatchSetup = ({scoutName, onScoutNameChange}) => {

  //onScoutNameChange('JacobK');
  
  const matchs = [
    {"match": 1}, {"match": 2}, {"match": 3}, {"match": 4}, {"match": 5}, {"match": 6},
    {"match": 7}, {"match": 8}, {"match": 9}, {"match": 10}, {"match": 11}, {"match": 12},
    {"match": 13}, {"match": 14}, {"match":15}, {"match": 16}, {"match": 17}, {"match": 18},
    {"match": 19}, {"match": 20}, {"match":21}, {"match": 22}, {"match": 23}, {"match": 24},
  ];

    return (
      <>
        <View // This view is the show the usable screen space on teh actually tablet. can be remvoed in future release
          style={[
            {
              top: 0,
              left: 0,
              width: 906,
              height: 477,
              position: 'absolute',
              backgroundColor: 'powderblue',
            },
          ]}
        />
        <Text style={[styles.contentText, {backgroundColor: 'yellow'}]}>The current Scouter is {scoutName}</Text>
        <Text style={[styles.contentText, {backgroundColor: 'green'}]}>Select a match to scout:</Text>
        <View style={{flexWrap: 'wrap'}}>
          {matchs.map(value => (
             <TouchableOpacity
             key={value.match}
             onPress={() => console.log('Pressed')}
             style={[styles.button, styles.selected]}>
             <Text
               style={[
                 styles.buttonLabel,
               ]}>
               {value.match}
             </Text>
           </TouchableOpacity>


          ))}


        </View>

      </>
    );
}

const styles = StyleSheet.create({
  contentText: {
    fontSize: 22,
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: 'oldlace',
    // alignSelf: 'flex-start',
    marginHorizontal: '1%',
    marginBottom: 15,
    width: 100,
    height: 75,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLabel: {
    fontSize: 22,
    fontWeight: '500',
    color: 'coral',
  },
});

export default MatchSetup;
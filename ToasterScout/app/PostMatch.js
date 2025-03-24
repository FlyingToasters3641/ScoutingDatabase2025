import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Image, Pressable } from 'react-native';


const PostMatch = ({
  gameData,
  setGameData,
}) => {

// Climb
const [displayClimbSelect, setDisplayClimbSelect] = useState(gameData.bzl); // Barge Zone Location

// information
let tempinfo= gameData.snp.split(',');
console.log(tempinfo);
const [info1Toggled, setInfo1Toggled] = useState(tempinfo.includes('1'));
const [info2Toggled, setInfo2Toggled] = useState(tempinfo.includes('2'));
const [info3Toggled, setInfo3Toggled] = useState(tempinfo.includes('3'));

const infoToggled1 = () => {
  setInfo1Toggled(!info1Toggled);
  console.log(info1Toggled);
};

const infoToggled2 = () => {
  setInfo2Toggled(!info2Toggled);
};

const infoToggled3 = () => {
  setInfo3Toggled(!info3Toggled);
};

// *** Update gameData when Post Match data has changed ***
  useEffect(() => {
      setGameData(prevGameData => ({...prevGameData, bzl: displayClimbSelect}));
      var tempGameData = (info1Toggled ? '1,': '') + (info2Toggled ? '2,' : '') + (info3Toggled ? '3,' : '');//`${info1Toggled},${info2Toggled},${info3Toggled}`;
        setGameData(prevGameData => ({...prevGameData, snp: tempGameData}));
  }, [displayClimbSelect, info1Toggled, info2Toggled, info3Toggled]);



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
            backgroundColor: 'black',
          },
        ]}
      />
      <View>
        <Image
          source={require('@/assets/images/Cage.png')} 
          style={{ left: 100, width: 268.4, height: 429 }} 
        />
        <Pressable
          onPress={() => {displayClimbSelect === 'H' ? setDisplayClimbSelect('') : setDisplayClimbSelect('H');}}
          style={[styles.button,
            {
              left: 57,
              top: 110,
            },
            displayClimbSelect === 'H' && styles.selected,
          ]}
        >
          <Text style={styles.contentText}>High Climb</Text>
        </Pressable>
        <Pressable
          onPress={() => {displayClimbSelect === 'L' ? setDisplayClimbSelect('') : setDisplayClimbSelect('L');}}
          style={[styles.button,
            {
              left: 255,
              top: 302,
            },
            displayClimbSelect === 'L' && styles.selected,
          ]}
        >
          <Text style={styles.contentText}>Low Climb</Text>
        </Pressable>
        <Pressable
          onPress={() => {displayClimbSelect === 'P' ? setDisplayClimbSelect('') : setDisplayClimbSelect('P');}}
          style={[styles.button,
            {
              left: 75,
              top: 433,
            },
            displayClimbSelect === 'P' && styles.selected,
          ]}
        >
          <Text style={styles.contentText}>Park</Text>
        </Pressable>
        <Pressable
          onPress={() => {displayClimbSelect === 'N' ? setDisplayClimbSelect('') : setDisplayClimbSelect('N');}}
          style={[styles.button,
            {
              left: 250,
              top: 433,
            },
            displayClimbSelect === 'N' && styles.selected,
          ]}
        >
          <Text style={styles.contentText}>No Attempt</Text>
        </Pressable>
      </View>

      {/* Statements */}
      <View style={[
        styles.border,
          {
          top: 0,
          left: 465,
          position: 'absolute',
          width: 420,
          }
        ]}>
          <Text style={[styles.title, {textAlign: 'center'}]}>Match Notes Picklist</Text>
        <Pressable 
          style={[styles.buttonAuto, info1Toggled && styles.selected,]} 
          onPress={infoToggled1}>
          <Text style={styles.contentText}>
            Preformed Defense
          </Text>
        </Pressable>
        <Pressable
          style={[styles.buttonAuto, info2Toggled && styles.selected,]} 
          onPress={infoToggled2}>
          <Text style={styles.contentText}>
            Stopped Mid-Match
          </Text>
        </Pressable>
        <Pressable
          style={[styles.buttonAuto, info3Toggled && styles.selected,]} 
          onPress={infoToggled3}>
          <Text style={styles.contentText}>
            No Auto
          </Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  contentText: {
    fontSize: 22,
  },
  title: {
    textAlign: 'center',
    // marginBottom: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',

  },
  contentTextInfo: {
    fontSize: 18,
    color: 'white',
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: 'oldlace',
    marginHorizontal: '1%',
    marginTop: 8,
    marginBottom: 8,
    width: 140,
    height: 55,
    position: 'absolute',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonAuto: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: 'oldlace',
    marginHorizontal: '1%',
    marginTop: 8,
    marginBottom: 8,
    width: 'auto',
    height: 60,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    backgroundColor: 'limegreen',
  },
  border: {
    borderWidth: 2,
    borderColor: 'gray', // Change color to your desired border color
    borderRadius: 8,
    padding: 10,
  },
});

export default PostMatch;
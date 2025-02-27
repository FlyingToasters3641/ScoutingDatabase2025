import React, { useState, useRef } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import sha1 from 'js-sha1';
import QRCode from 'react-native-qrcode-svg';
import RNFS from 'react-native-fs';
import defaultGameData from "@/app/gameData2025"

const SaveMatch = ({
  appData,
  setAppData,
  matchData,
  setMatchData,
  gameData,
  setGameData,
}) => {
  const [isQRSaveButtonDisabled, setIsQRSaveButtonDisabled] = useState(true);
  const [isNewMatchButtonDisabled, setIsNewMatchButtonDisabled] = useState(true);
  const [jsonData, setJsonData] = useState({});
  const [qrCodeSize, setQrCodeSize] = useState(0);
  const qrCodeRef = useRef();

  //let defaultQRCodeData = {};

  const handlePress1 = async() => {
    let defaultQRCodeData = {schemaVar: '1.0.0', dataSHA1:'', data: gameData};
    defaultQRCodeData={...defaultQRCodeData, data: {...defaultQRCodeData.data, ...appData}}
    let sataSHA1 = await sha1(JSON.stringify(gameData));
    defaultQRCodeData.dataSHA1 = sataSHA1;
    // setJsonData({e :"2025event", sN :"Jacob K", mN:"qm1", rP:"R1", dP:"RD1", tN:"7553", mK :"2025event_qm1", sP :"000", dP :"000", cA :"0000", cB :"0000", cC :"0000", cD :"0000", cE :"0000", cF :"0000", cG :"0000", cH :"0000", cI :"0000", cJ :"0000", cK :"0000", cL :"0000", aG :"000000", cP :"000", gCI :4, pCI :2, cM :4, gAI :7, nS :4, pS :5});
    setJsonData(defaultQRCodeData);
    setQrCodeSize(400);
    console.log('QR Code Data:', JSON.stringify(defaultQRCodeData));
    setIsQRSaveButtonDisabled(false);
  };

  const saveQrCodeToFile = () => {
    qrCodeRef.current.toDataURL((dataURL) => {
      const path = `${RNFS.DownloadDirectoryPath}/2025-match${appData.currentMatch}-team${appData.currentTeam}.png`;
      RNFS.writeFile(path, dataURL, 'base64')
        .then(() => {
          console.log('QR code saved to', path);
        })
        .catch((error) => {
          console.error('Failed to save QR code', error);
        })
        .finally(() => {
          setIsNewMatchButtonDisabled(false);
        });
    });
    
    Alert.alert('QR Code Saved', 'QR Code saved to Download directory');
  };

  const handlePress2 = async() => {
    // Alert the user confirming they want to start a new match
    Alert.alert(
      'New Match',
      'Are you sure you want to start a new match?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => handleNewMatch(),
        },
      ],
      { cancelable: false }
    );
  };

  const handleNewMatch = () => {
    setGameData(defaultGameData); // Clear gameData
    setIsQRSaveButtonDisabled(true);
    setIsNewMatchButtonDisabled(true);
    setJsonData({});
    setQrCodeSize(0);
    // Update matchStatus to 2 (completed) for the current match
    setMatchData(prevMatchData =>
      prevMatchData.map(match => match.matchNumber === appData.currentMatch ? { ...match, matchStatus: 2 } : match)
    );  
  };

  const qrCodeData = JSON.stringify(jsonData);


  return (
    <>
      <View // This view is the show the usable screen space on the actually tablet. can be remvoed in future release
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

      <TouchableOpacity style={[
        styles.largeButton,
        {
          top: 60,
          left: 70,
        },
      ]}
      onPress={handlePress1}
      >
        <Text style={styles.buttonText}>Generate QRCode</Text>
      </TouchableOpacity>


      <TouchableOpacity
        style={[
          styles.largeButton,
          {
            top: 210,
            left: 70,
          },
          isQRSaveButtonDisabled && styles.disabledButton, 
        ]}
        onPress={saveQrCodeToFile}
        disabled={isQRSaveButtonDisabled}
      >
        <Text style={styles.buttonText}>Save QRCode</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[
        styles.largeButton,
        {
          top: 360,
          left: 70,
        },
        isNewMatchButtonDisabled && styles.disabledButton,
      ]}
      onPress={handlePress2} 
      disabled={isNewMatchButtonDisabled}
      >
        <Text style={styles.buttonText}>New Match</Text>
      </TouchableOpacity>

        

      <View
        style={[
          {
            top: 35,
            left: 360,
            width: 400,
            height: 400,
            position: 'absolute',
          },
        ]}
      >
        <QRCode 
          value={qrCodeData}
          size={qrCodeSize}
          quietZone={10}
          getRef={(ref) => (qrCodeRef.current = ref)}
        />
        <Text style={styles.contentTextInfo}>{'\n'}{JSON.stringify(gameData)}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  contentText: {
    fontSize: 22,
  },
  contentTextInfo: {
    fontSize: 16,
    color: 'white',
  },
  buttonText: {
    fontSize: 20,
  },
  largeButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 8,
    width: 200,
    height: 85,
    position: 'absolute',
    backgroundColor: 'oldlace',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  disabledButton: {
    backgroundColor: 'gray', // Gray out the button when disabled
  },

});

export default SaveMatch;
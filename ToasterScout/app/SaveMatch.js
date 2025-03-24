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
    // removing the SHA1 hash for now, as it is not used and causes the QR code to be too large
    // let sataSHA1 = await sha1(JSON.stringify(gameData));
    // defaultQRCodeData.dataSHA1 = sataSHA1;

    setJsonData(defaultQRCodeData);
    setQrCodeSize(400);
    console.log('QR Code Data:', JSON.stringify(defaultQRCodeData));
    setIsQRSaveButtonDisabled(false);
  };

  const saveQrCodeToFile = () => {
    qrCodeRef.current.toDataURL((dataURL) => {
        const randomCode = Math.floor(100 + Math.random() * 900); // Generate a 3-digit random code
        const path = `${RNFS.DownloadDirectoryPath}/2025-${appData.allianceLocation[0]+appData.allianceLocation.slice(-1)}-m${appData.currentMatch}-t${appData.currentTeam}-${randomCode}.png`; // Append random code to filename

        RNFS.writeFile(path, dataURL, 'base64')
            .then(() => {
              // Update matchStatus to 2 (completed) for the current match
              setMatchData(prevMatchData =>
                prevMatchData.map(match => match.matchNumber === appData.currentMatch ? { ...match, matchStatus: 2 } : match)
              ); 
              console.log('QR code saved to', path);
              Alert.alert('QR Code Saved', `QR Code saved to Download directory as ${path}`);
              setIsQRSaveButtonDisabled(true); // Disable the "Save QRCode" button
            })
            .catch((error) => {
                console.error('Failed to save QR code', error);
                Alert.alert('Error', 'Failed to save QR Code. Please inform a Scouting Lead.');
            })
            .finally(() => {
                setIsNewMatchButtonDisabled(false);
            });
    });
};

  const handleNewMatch = () => {
    setGameData(defaultGameData); // Clear gameData
    setIsQRSaveButtonDisabled(true);
    setIsNewMatchButtonDisabled(true);
    setJsonData({});
    setQrCodeSize(0);
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
      onPress={handleNewMatch} 
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
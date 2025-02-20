import React, { useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const SaveMatch = ({
  appData,
  setAppData,
  matchData,
  setMatchData,
  selectedContent,
  setSelectedContent,
}) => {
  const [pressed, setPressed] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [jsonData, setJsonData] = useState({});
  const [qrCodeSize, setQrCodeSize] = useState(0);

  const handlePress1 = async() => {
    setPressed(true);
    setJsonData({e :"2025event", sN :"Jacob K", mN:"qm1", rP:"R1", dP:"RD1", tN:"7553", mK :"2025event_qm1", sP :"000", dP :"000", cA :"0000", cB :"0000", cC :"0000", cD :"0000", cE :"0000", cF :"0000", cG :"0000", cH :"0000", cI :"0000", cJ :"0000", cK :"0000", cL :"0000", aG :"000000", cP :"000", gCI :4, pCI :2, cM :4, gAI :7, nS :4, pS :5});
    setQrCodeSize(400);
    // onQrCodeGenerated();
    setIsButtonDisabled(false);
  };
  const handlePress2 = async() => {
    setPressed(true);
    setIsButtonDisabled(true);
    setJsonData({});
    setQrCodeSize(0);
  };

  const qrCodeData = JSON.stringify(jsonData);

  const onQrCodeGenerated = () => {
    // Update matchStatus to 1 for the current match
    setMatchData(prevMatchData =>
      prevMatchData.map(match =>
        match.matchNumber === appData.currentMatch ? { ...match, matchStatus: 1 } : match
      )
    );
  };


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
          top: 100,
          left: 70,
        },
      ]}
      onPress={handlePress1}
      >
        <Text style={styles.buttonText}>Generate QRCode</Text>
      </TouchableOpacity>

        <TouchableOpacity style={[
          styles.largeButton,
          {
            top: 250,
            left: 70,
          },
        ]}
        onPress={handlePress2} 
        disabled={isButtonDisabled}
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
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  contentText: {
    fontSize: 22,
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
    height: 100,
    position: 'absolute',
    backgroundColor: 'oldlace',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  }

});

export default SaveMatch;
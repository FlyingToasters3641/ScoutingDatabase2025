import React, { useState } from 'react';
import { Text, StyleSheet, View, ScrollView, Switch  } from 'react-native';


const AppSettings = () => {

  const [isOption1Enabled, setOption1Enabled] = useState(false);
  const [isOption2Enabled, setOption2Enabled] = useState(false);

  const toggleOption1 = () => setOption1Enabled(!isOption1Enabled);
  const toggleOption2 = () => setOption2Enabled(!isOption2Enabled);

  return (
    <>
      <View // This view is the show the usable screen space on teh actually tablet. can be remvoed in future release
        style={[
          {
            top: 0,
            left: 0,
            width: 906,
            height: 508,
            position: 'absolute',
            // backgroundColor: 'powderblue',
            backgroundColor: 'black',
          },
        ]}
      />
      <Text style={[styles.contentText, {backgroundColor: 'black', marginLeft: 10, fontWeight: 'bold', fontSize: 28,}]}>Settings</Text>
      <ScrollView>
        <SettingsGroup title="General Settings">
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={[styles.contentText,]}>Option 1</Text>
            <Switch 
              onValueChange={toggleOption1}
              value={isOption1Enabled}
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={[styles.contentText,]}>Option 2</Text>
            <Switch 
              onValueChange={toggleOption2}
              value={isOption2Enabled}
            />
          </View>
        </SettingsGroup>

        <SettingsGroup title="Advanced Settings">
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={[styles.contentText,]}>Option A</Text>
            <Switch />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={[styles.contentText,]}>Option B</Text>
            <Switch />
          </View>
        </SettingsGroup>

      </ScrollView>
    </>
  );
}

function SettingsGroup({ title, children }) {
  return (
    <View style={styles.group}>
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={styles.box}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentText: {
    fontSize: 22,
    color: 'white',
  },
  group: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 22,
    marginBottom: 5,
    color: 'white',
  },
  box: {
    borderWidth: 3,
    borderColor: 'gray', // Change color to your desired border color
    borderRadius: 5,
    padding: 10,
  },
});

export default AppSettings;
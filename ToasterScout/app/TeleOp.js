import React, { useState } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'; //https://icons.expo.fyi/Index
import Entypo from '@expo/vector-icons/Entypo';

const TeleOp = () => {

  const [displayNetScored, setDisplayNetScored] = useState(0);


  const addNetScored = () => {
    setDisplayNetScored(displayNetScored + 1);
  };
  const subNetScored = () => {
    setDisplayNetScored(displayNetScored - 1);
  };

  const showAlert = () =>
    Alert.alert(
      'Alert Title',
      'My Alert Msg',
      [
        {
          text: 'Cancel',
          onPress: () => Alert.alert('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert(
            'This alert was dismissed by tapping outside of the alert dialog.',
          ),
      },
    );

    const createTwoButtonAlert = () =>
      Alert.alert('Alert Title', 'My Alert Msg', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);

    return (
      <>
      <View style={[
        {
          top: 0,
          left: 0,
          width: 906,
          height: 508,
          position: 'absolute',
          backgroundColor: 'black',
        },
      ]}>
    </View>
    <View>
      <Image
        source={require('@/assets/images/g2025-fieldview-teleop.png')} 
        style={{ left: 10, width: 456, height: 478 }} 
      />

      {/* Coral Scoring */}

      {/* location L */}
      {/* <TouchableOpacity
        style={[
          styles.smallButton,
          {
            top: 75,
            left: 62,
          },
        ]}
        activeOpacity={0.5}>
        <Entypo name="circle" size={24} color="black" />
      </TouchableOpacity> */}

      {/* location K */}
      <TouchableOpacity
        style={[
          styles.smallButton,
          {
            top: 43,
            left: 105,
          },
        ]}
        activeOpacity={0.5}>
        <Entypo name="circle" size={24} color="black" />
      </TouchableOpacity>

      {/* location J */}
      {/* <TouchableOpacity
        style={[
          styles.smallButton,
          {
            top: 25,
            left: 260,
          },
        ]}
        activeOpacity={0.5}>
        <Entypo name="circle" size={24} color="black" />
      </TouchableOpacity> */}

      {/* location I */}
      <TouchableOpacity
        style={[
          styles.smallButton,
          {
            top: 43,
            left: 309,
          }
        ]}
        activeOpacity={0.5}>
        <Entypo name="circle" size={24} color="black" />
      </TouchableOpacity>

      {/* location H */}
      {/* <TouchableOpacity
        style={[
          styles.smallButton,
          {
            top: 164,
            left: 405,
          },
        ]}
        activeOpacity={0.5}>
        <Entypo name="circle" size={24} color="black" />
      </TouchableOpacity> */}

      {/* location G */}
      <TouchableOpacity
        style={[
          styles.smallButton,
          {
            top: 215,
            left: 405,
          },
        ]}
        activeOpacity={0.5}>
        <Entypo name="circle" size={24} color="black" />
      </TouchableOpacity>

      {/* location F */}
      {/* <TouchableOpacity
        style={[
          styles.smallButton,
          {
            top: 355,
            left: 358,
          },
        ]}
        activeOpacity={0.5}>
        <Entypo name="circle" size={24} color="black" />
      </TouchableOpacity> */}

      {/* location E */}
      <TouchableOpacity
        style={[
          styles.smallButton,
          {
            top: 380,
            left: 315,
          },
        ]}
        activeOpacity={0.5}>
        <Entypo name="circle" size={24} color="black" />
      </TouchableOpacity>

      {/* location D */}
      {/* <TouchableOpacity
        style={[
          styles.smallButton,
          {
            top: 415,
            left: 155,
          },
        ]}
        activeOpacity={0.5}>
        <Entypo name="circle" size={24} color="black" />
      </TouchableOpacity> */}

      {/* location C */}
      <TouchableOpacity
        style={[
          styles.smallButton,
          {
            top: 380,
            left: 110,
          },
        ]}
        activeOpacity={0.5}>
        <Entypo name="circle" size={24} color="black" />
      </TouchableOpacity>

      {/* location B */}
      {/* <TouchableOpacity
        style={[
          styles.smallButton,
          {
            top: 262,
            left: 20,
          },
        ]}
        activeOpacity={0.5}>
        <Entypo name="circle" size={24} color="black" />
      </TouchableOpacity> */}

      {/* location A */}
      <TouchableOpacity
        style={[
          styles.smallButton,
          {
            top: 215,
            left: 20,
          },
        ]}
        activeOpacity={0.5}>
        <Entypo name="circle" size={24} color="black" />
      </TouchableOpacity>


    {/* Algae Removed */}

        {/* Location AA */}
        <TouchableOpacity
        style={[
          styles.algaeSmallButton,
          {
            top: 215,
            left: 105,
          },
        ]}
        activeOpacity={0.5}>
        <Entypo name="circle" size={24} color="black" />
      </TouchableOpacity>

      {/* location AB */}
      <TouchableOpacity
        style={[
          styles.algaeSmallButton,
          {
            top: 300,
            left: 155,
          },
        ]}
        activeOpacity={0.5}>
        <Entypo name="circle" size={24} color="black" />
      </TouchableOpacity>

      {/* location AC */}
      <TouchableOpacity
        style={[
          styles.algaeSmallButton,
          {
            top: 300,
            left: 265,
          },
        ]}
        activeOpacity={0.5}>
        <Entypo name="circle" size={24} color="black" />
      </TouchableOpacity>

            {/* location AD */}
            <TouchableOpacity
        style={[
          styles.algaeSmallButton,
          {
            top: 215,
            left: 311,
          },
        ]}
        activeOpacity={0.5}>
        <Entypo name="circle" size={24} color="black" />
      </TouchableOpacity>

      {/* location AE */}
      <TouchableOpacity
        style={[
          styles.algaeSmallButton,
          {
            top: 125,
            left: 265,
          },
        ]}
        activeOpacity={0.5}>
        <Entypo name="circle" size={24} color="black" />
      </TouchableOpacity>

      {/* location AF */}
      <TouchableOpacity
        style={[
          styles.algaeSmallButton,
          {
            top: 125,
            left: 155,
          },
        ]}
        activeOpacity={0.5}>
        <Entypo name="circle" size={24} color="black" />
      </TouchableOpacity>
    </View>

    {/* Coral Scoring Levels */}
    <View style={[
      styles.border,
        {
        top: 0,
        left: 482,
        position: 'absolute',
        }
      ]}>

      {/* Coral Level 1 */}
      <View style={[{flexDirection:'row', justifyContent:'space-between', width:150, paddingBottom: 5, paddingTop: 5}]}>
        <TouchableOpacity style={[styles.addButton, {backgroundColor: 'red', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}><Entypo name="circle-with-minus" size={30} color="black" /></TouchableOpacity>
        <View style={[styles.box, {backgroundColor: 'oldlace', flex:2, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}><Text>Level 1</Text></View>
        <TouchableOpacity style={[styles.addButton, {backgroundColor: 'green', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}><Entypo name="circle-with-plus" size={30} color="black" /></TouchableOpacity>
      </View>

      {/* Coral Level 2 */}
      <View style={[{flexDirection:'row', justifyContent:'space-between', width:150, paddingBottom: 5, paddingTop: 5}]}>
        <TouchableOpacity style={[styles.addButton, {backgroundColor: 'red', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}><Entypo name="circle-with-minus" size={30} color="black" /></TouchableOpacity>
        <View style={[styles.box, {backgroundColor: 'oldlace', flex:2, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}><Text>Level 2</Text></View>
        <TouchableOpacity style={[styles.addButton, {backgroundColor: 'green', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}><Entypo name="circle-with-plus" size={30} color="black" /></TouchableOpacity>
      </View>

      {/* Coral Level 3 */}
      <View style={[{flexDirection:'row', justifyContent:'space-between', width:150, paddingBottom: 5, paddingTop: 5}]}>
        <TouchableOpacity style={[styles.addButton, {backgroundColor: 'red', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}><Entypo name="circle-with-minus" size={30} color="black" /></TouchableOpacity>
        <View style={[styles.box, {backgroundColor: 'oldlace', flex:2, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}><Text>Level 3</Text></View>
        <TouchableOpacity style={[styles.addButton, {backgroundColor: 'green', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}><Entypo name="circle-with-plus" size={30} color="black" /></TouchableOpacity>
      </View>

      {/* Coral Level 4 */}
      <View style={[{flexDirection:'row', justifyContent:'space-between', width:150, paddingBottom: 5, paddingTop: 5}]}>
        <TouchableOpacity style={[styles.addButton, {backgroundColor: 'red', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}><Entypo name="circle-with-minus" size={30} color="black" /></TouchableOpacity>
        <View style={[styles.box, {backgroundColor: 'oldlace', flex:2, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}><Text>Level 4</Text></View>
        <TouchableOpacity style={[styles.addButton, {backgroundColor: 'green', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}><Entypo name="circle-with-plus" size={30} color="black" /></TouchableOpacity>
      </View>
    </View>
    

      {/* Coral Missed */}
      {/* <TouchableOpacity
        style={[
          {
            top: 180,
            left: 185,
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderRadius: 8,
            marginTop: 8,
            marginBottom: 8,
            width: 100,
            height: 100,
            position: 'absolute',
            backgroundColor: 'oldlace',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          },
        ]}
        activeOpacity={0.5}>
        <Entypo name="circle-with-cross" size={30} color="black" /><Text style={styles.bigButtonText}>Coral{'\n'} Missed</Text>
      </TouchableOpacity> */}
      <View style={[
        {
          top: 198,
          left: 167,
          position: 'absolute',
        }
        ]}>
        <View style={[{flexDirection:'row', justifyContent:'space-between', width:135, paddingBottom: 5, paddingTop: 5}]}>
          <TouchableOpacity style={[styles.addButton, {backgroundColor: 'red', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}><Entypo name="circle-with-minus" size={30} color="black" /></TouchableOpacity>
          <View style={[styles.box, {backgroundColor: 'oldlace', flex:2, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}><Text>Coral Ground Pick-Up</Text></View>
          <TouchableOpacity style={[styles.addButton, {backgroundColor: 'green', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}><Entypo name="circle-with-plus" size={30} color="black" /></TouchableOpacity>
        </View>
      </View>
  

      {/* Scoring */}
      <View style={[
      styles.border,
        {
        top: 0,
        left: 675,
        position: 'absolute',
        alignItems: 'center',
        },
      ]}>

        {/* Net Scoring */}
        <View style={[{flexDirection:'row', justifyContent:'space-between', width:175, paddingBottom: 5, paddingTop: 5}]}>
        <TouchableOpacity style={[styles.addButton, {backgroundColor: 'red', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]} onPress={subNetScored}><Entypo name="circle-with-minus" size={30} color="black" /></TouchableOpacity>
          <View style={[styles.box, {backgroundColor: 'oldlace', flex:2, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}><Text>Net Scored{'\n'}{displayNetScored}</Text></View>
          <TouchableOpacity style={[styles.addButton, {backgroundColor: 'green', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]} onPress={addNetScored}><Entypo name="circle-with-plus" size={30} color="black" /></TouchableOpacity>
        </View>
        <View style={[{flexDirection:'row', justifyContent:'space-between', width:175, paddingBottom: 5, paddingTop: 5}]}>
        <TouchableOpacity style={[styles.addButton, {backgroundColor: 'red', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}><Entypo name="circle-with-minus" size={30} color="black" /></TouchableOpacity>
          <View style={[styles.box, {backgroundColor: 'oldlace', flex:2, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}><Text>Net Missed</Text></View>
          <TouchableOpacity style={[styles.addButton, {backgroundColor: 'green', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}><Entypo name="circle-with-plus" size={30} color="black" /></TouchableOpacity>
        </View>

        {/* Processor Scoring */}
        <View style={[{flexDirection:'row', justifyContent:'space-between', width:175, paddingBottom: 5, paddingTop: 5}]}>
        <TouchableOpacity style={[styles.addButton, {backgroundColor: 'red', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}><Entypo name="circle-with-minus" size={30} color="black" /></TouchableOpacity>
          <View style={[styles.box, {backgroundColor: 'oldlace', flex:2, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}><Text>Processor Scored</Text></View>
          <TouchableOpacity style={[styles.addButton, {backgroundColor: 'green', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}><Entypo name="circle-with-plus" size={30} color="black" /></TouchableOpacity>
        </View>
        <View style={[{flexDirection:'row', justifyContent:'space-between', width:175, paddingBottom: 5, paddingTop: 5}]}>
        <TouchableOpacity style={[styles.addButton, {backgroundColor: 'red', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}><Entypo name="circle-with-minus" size={30} color="black" /></TouchableOpacity>
          <View style={[styles.box, {backgroundColor: 'oldlace', flex:2, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}><Text>Processor Missed</Text></View>
          <TouchableOpacity style={[styles.addButton, {backgroundColor: 'green', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}><Entypo name="circle-with-plus" size={30} color="black" /></TouchableOpacity>
        </View>
      </View>
      
      {/* Intaking */}

      {/* Coral Ground Pick-Up */}
      <View style={[
        {
          top: 395,
          left: 460,
          position: 'absolute',
        }
        ]}>
        <View style={[{flexDirection:'row', justifyContent:'space-between', width:135, paddingBottom: 5, paddingTop: 5}]}>
          <TouchableOpacity style={[styles.addButton, {backgroundColor: 'red', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}><Entypo name="circle-with-minus" size={30} color="black" /></TouchableOpacity>
          <View style={[styles.box, {backgroundColor: 'oldlace', flex:2, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}><Text>Coral Ground Pick-Up</Text></View>
          <TouchableOpacity style={[styles.addButton, {backgroundColor: 'green', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}><Entypo name="circle-with-plus" size={30} color="black" /></TouchableOpacity>
        </View>
      </View>

      {/* Coral Station Pick-Up */}
      <View style={[
        {
          top: 395,
          left: 605,
          position: 'absolute',
        }
        ]}>
        <View style={[{flexDirection:'row', justifyContent:'space-between', width:135, paddingBottom: 5, paddingTop: 5}]}>
          <TouchableOpacity style={[styles.addButton, {backgroundColor: 'red', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}><Entypo name="circle-with-minus" size={30} color="black" /></TouchableOpacity>
          <View style={[styles.box, {backgroundColor: 'oldlace', flex:2, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}><Text>Coral Station Pick-Up</Text></View>
          <TouchableOpacity style={[styles.addButton, {backgroundColor: 'green', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}><Entypo name="circle-with-plus" size={30} color="black" /></TouchableOpacity>
        </View>
      </View>

      {/* Algae Pick-Up */}
      <View style={[
        {
          top: 395,
          left: 750,
          position: 'absolute',
        }
        ]}>
        <View style={[{flexDirection:'row', justifyContent:'space-between', width:135, paddingBottom: 5, paddingTop: 5}]}>
          <TouchableOpacity style={[styles.addButton, {backgroundColor: 'red', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}><Entypo name="circle-with-minus" size={30} color="black" /></TouchableOpacity>
          <View style={[styles.box, {backgroundColor: 'oldlace', flex:2, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}><Text>Algae Pick-Up</Text></View>
          <TouchableOpacity style={[styles.addButton, {backgroundColor: 'green', flex:1, justifyContent: 'center', alignItems: 'center', textAlign: 'center',}]}><Entypo name="circle-with-plus" size={30} color="black" /></TouchableOpacity>
        </View>
      </View>
  </>

  );
}

const styles = StyleSheet.create({
  contentText: {
    fontSize: 22,
  },
  midButtonText: {
    fontSize: 14,
    textAlign: 'center',
  },
  bigButtonText: {
    fontSize: 18,
    textAlign: 'center',
  },
  smallButton: {
    borderRadius: 8,
    width: 50,
    height: 50,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'oldlace',
  },
  algaeSmallButton: {
    borderRadius: 8,
    width: 50,
    height: 50,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'mediumaquamarine',
  },
  bigButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 8,
    width: 182,
    height: 75,
    backgroundColor: 'oldlace',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  midButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 8,
    width: 115,
    height: 75,
    position: 'absolute',
    backgroundColor: 'oldlace',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  sMidButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 8,
    width: 91,
    height: 75,
    backgroundColor: 'oldlace',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  addButton: {
    width: 'auto',
    height: 75,
  },
  border: {
    borderWidth: 2,
    borderColor: 'gray', // Change color to your desired border color
    borderRadius: 8,
    padding: 10,
  }
});

export default TeleOp;
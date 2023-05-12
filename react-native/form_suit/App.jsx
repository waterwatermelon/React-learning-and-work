
import React from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';
import SimpleReactForm from './SimpleReactForm';
import { useFormr } from 'react-formr';
import ReactFormrHook from './ReactFormrHook';


function App() {

  const backgroundStyle = {
    backgroundColor: '#F0F1F5',
  };


  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        // backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Text >Form Suit</Text>

        <ReactFormrHook />
      </ScrollView>
    </SafeAreaView>
  );
}



export default App;

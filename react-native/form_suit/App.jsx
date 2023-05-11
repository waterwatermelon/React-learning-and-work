
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  TextInput,
} from 'react-native';
import SimpleReactForm from './SimpleReactForm';


function App() {

  const backgroundStyle = {
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>

        <SimpleReactForm />
        
      </ScrollView>
    </SafeAreaView>
  );
}



export default App;

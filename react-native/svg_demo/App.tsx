import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';

import SvgDemo from './SvgDemo';
import SvgFile from './SvgFile';

function App(): JSX.Element {

  const backgroundStyle = {
    backgroundColor: '#efefef',
  };


  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <SvgFile />
        <SvgDemo />
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;

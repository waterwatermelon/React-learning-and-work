/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  Button,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { MySendIntent } from './MySendIntent';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const handlePress = () => {
    MySendIntent.send('ping');
  };

  const handleCreateAlarm = () => {
    // no activity
    MySendIntent.createAlarm(8, 0, 'setup');
  };

  const getModuleName = () => {
    MySendIntent.getModuleName().then(res => {
      console.log('res:', res);
    });
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Button title='open' onPress={handlePress} />
      <Button title='alarm' onPress={handleCreateAlarm} />
      <Button title='getName' onPress={getModuleName} />
    </SafeAreaView>
  );
}


export default App;

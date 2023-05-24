/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { FixedDimensionBasic, FlexDirectionBasic, Images, Links, MyFetchButton, MyList, MySectionList, MyStepIndicator, MyTextInput, Test } from './page';



function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Text> hello world</Text>
        <Test />
        <MyTextInput />
        <FixedDimensionBasic />
        <Images />
        <FlexDirectionBasic />
        <MyList />
        <MySectionList />
        <MyStepIndicator />
        <MyFetchButton />
        <Links />
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;

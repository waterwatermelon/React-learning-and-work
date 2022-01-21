/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { ScrollView, Text, } from 'react-native';
import { MyTextInput, MyList, MyFetchButton, MySectionList, MyStepIndicator, Test, FixedDimensionBasic,FlexDirectionBasic } from './page';

const App = () => {
  console.log('hello');
  return (
    <ScrollView>

      <Text> hello world</Text>
      <Test />
      <MyTextInput />
      <FixedDimensionBasic />
      <FlexDirectionBasic />
      <MyList />
      <MySectionList />
      <MyStepIndicator />
      <MyFetchButton />

    </ScrollView>
  );
};

export default App;

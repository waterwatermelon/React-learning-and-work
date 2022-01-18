/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Text, TextInput, View} from 'react-native';
import MyList from './page/MyList';
import MySectionList from './page/MySectionList';
import MyTextInput from './page/MyTextInput';

const App = () => {
  console.log('hello');
  return (
    <View>
      <Text> hello world</Text>
      <MyTextInput />
      {/* <View style={{height: 900, backgroundColor: 'pink'}}>
        <Text style={{fontSize: 200}}>\n a \n b c d e f g h i</Text>
      </View> */}
      <MyList />
      <MySectionList />
    </View>
  );
};

export default App;

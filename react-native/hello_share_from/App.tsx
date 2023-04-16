/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Share from 'react-native-share';


function App(): JSX.Element {



  const handleShare = () => {
    Share.open({
      message: 'from share',
      email: '1044264633@qq.com',
    }).then(res => {
      console.log('success:', res)
    }).catch(err => {
      console.log('share err:', err);
    });
  };
  return (
    <SafeAreaView style={{}}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
      >
        <Button title='share(text)' onPress={handleShare} />

      </ScrollView>
    </SafeAreaView>
  );
}



export default App;

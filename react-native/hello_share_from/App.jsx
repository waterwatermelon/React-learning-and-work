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
// import ShareExtension from 'rn-extensions-share';
function App() {  


  // const handleUrlSchema = () => {
  //   // ShareExtension.openURL('tel://')
  // };
  
  const handleShare = () => {
    Share.open({
      message: 'from [react-native-share]',
      title: 't',
    })
    .then(res => {
      console.log('success:', res)
    })
    .catch(err => {
      console.log('share err:', err);
    });
  };
  return (
    <SafeAreaView style={{}}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
      >
        <Button title='share(text)' onPress={handleShare} />
        {/* <Button title='tel://' onPress={handleUrlSchema} /> */}
      </ScrollView>
    </SafeAreaView>
  );
}



export default App;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useRef, useState } from 'react';
import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Share from 'react-native-share';
import ViewShot from 'react-native-view-shot';

function App() {


  // TODO:使用URLschema打开某个APP
  // const handleUrlSchema = () => {
  //   // ShareExtension.openURL('tel://')
  //   Share.open({
  //     url: 'sharereceiver://',
  //   });
  // };
  const viewShotRef = useRef();
  const [uri, setUri] = useState('');
  const handleShareText = () => {
    const options = {
      message: 'from [react-native-share]',
      title: 't',
      isNewTask: true,
    };
    // console.log('options', options);
    Share.open(options)
      .then(res => {
        console.log('success:', res)
      })
      .catch(err => {
        console.log('share err:', err);
      });
  };

  const handleSharePic = () => {
    viewShotRef.current.capture()
      .then(uri => {
        console.log('uri:', uri);
        Share.open({
          title: 'share pic',
          url: uri,
          // filename: 'shot.png',
          type: 'image/png',
          isNewTask: true,
        });
        setUri(uri);
      })
      .catch(err => {
        console.error(err)
      });
  };
  return (
    <SafeAreaView style={{}}>
      <ScrollView      >
        <ViewShot ref={viewShotRef} options = {{fileName:'shot-'}}>
          <Button title='share(text)' onPress={handleShareText} />
          <Button title='share(file)' onPress={handleSharePic} />
        </ViewShot>

        <Image style={{
          width: 200,
          height: 120,
          borderWidth: 2,
          borderColor: 'red',
        }} source={{ uri }} />
      </ScrollView>
    </SafeAreaView>
  );
}



export default App;

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
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Share from 'react-native-share';
import ViewShot from 'react-native-view-shot';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import * as WeChat from 'react-native-wechat-lib';

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
  async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }

  async function hasAndroidPermission2() {
    const permission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }
  const handleSharePic = async () => {
    const uri = await viewShotRef.current.capture();
    console.log('uri:', uri);
    setUri(uri);

    if (Platform.OS === "android" && !(await hasAndroidPermission()) && !(await hasAndroidPermission2())) {
      console.log('没权限');
      return false;
    }


    const picUri = await CameraRoll.save(uri, {
      type: 'photo',
    });
    console.log('picUri', picUri);

    Share.open({
      // title: 'share pic',
      url: uri,
      // filename: 'shot.png',
      // type: 'image/png',
      isNewTask: true,
    });
  };

  const handleShareWeChat = async () => {
    await WeChat.registerApp('wxb4c9e0aeacdef301', ''); // appId没有审核过，不能分享数据
    WeChat.shareText({
      text: 'ping',
    });
  };
  return (
    <SafeAreaView>
      <ScrollView >
        <ViewShot ref={viewShotRef} options={{ fileName: 'shot-' }}>
          <Button title='share(text)' onPress={handleShareText} />
          <Button title='share(file)' onPress={handleSharePic} />
          <Button title='share(wechat)' onPress={handleShareWeChat} />
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

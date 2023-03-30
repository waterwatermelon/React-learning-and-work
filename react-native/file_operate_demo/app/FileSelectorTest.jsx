import React, { useState } from 'react';
import {
  Button,
  StatusBar,
  Text,
  View,
} from 'react-native';


import RNFileSelector from 'react-native-file-selector';
import { styles } from './style';
import Header from '../component/Header';

function FileSelectorTest() {

  const [visible, setVisible] = useState(false);

  const path = '/data/user/0/com.file_operate_demo';
  const openFileSelector = () => {
    setVisible(true);
  };

  const handleDone = (e) => {
    console.log('[done] e', e);
    setVisible(false);
  };

  const handleCancel = () => {

    setVisible(false);
  };

  return (
    <>
      <Header title='File Picker' />
      <View style={styles.box}>
        <Button onPress={openFileSelector} title='open file' />
      </View>
      <RNFileSelector title='file selector' path={path} visible={visible} onDone={handleDone} onCancel={handleCancel} />
    </>
  );
}


export default FileSelectorTest;

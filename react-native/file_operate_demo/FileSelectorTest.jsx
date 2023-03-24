import React, { useState } from 'react';
import {
  Button,
  StatusBar,
  Text,
} from 'react-native';


import RNFileSelector from 'react-native-file-selector';

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
      <StatusBar />
      <Text >File Picker</Text>

      <Button onPress={openFileSelector} title='open file' />
      <RNFileSelector title='file selector' path={path} visible={visible} onDone={handleDone} onCancel={handleCancel} />

    </>
  );
}


export default FileSelectorTest;

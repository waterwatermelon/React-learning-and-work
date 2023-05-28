import React, { } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import FetchBlobTest from './app/FetchBlobTest';
import FileAccessTest from './app/FileAccessTest';
import FileSelectorTest from './app/FileSelectorTest';
import ImagePickerTest from './app/ImagePicker';
import CacheClear from './app/CacheClear';

function App() {


  return (
    <SafeAreaView>
      <ScrollView>
        <StatusBar />
        <FileAccessTest />
        <FileSelectorTest />
        <FetchBlobTest />
        <ImagePickerTest />
        <CacheClear />
      </ScrollView>
    </SafeAreaView>
  );
}


export default App;

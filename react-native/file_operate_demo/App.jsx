import React, {  } from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';
import FetchBlobTest from './app/FetchBlobTest';

import FileAccessTest from './app/FileAccessTest';
import FileSelectorTest from './app/FileSelectorTest';
import PingTest from './app/PingTest';

function App() {

  

  return (
    <SafeAreaView>
      <StatusBar />
      <FileAccessTest />
      <FileSelectorTest /> 
      {/* <PingTest /> */}
      <FetchBlobTest />
    </SafeAreaView>
  );
}


export default App;

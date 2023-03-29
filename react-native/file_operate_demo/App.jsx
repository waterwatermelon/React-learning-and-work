import React, {  } from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';

import FileAccessTest from './FileAccessTest';
import FileSelectorTest from './FileSelectorTest';
import PingTest from './PingTest';

function App() {

  

  return (
    <SafeAreaView>
      <StatusBar />
      {/* <FileAccessTest />
      <FileSelectorTest /> */}
      <PingTest />
    </SafeAreaView>
  );
}


export default App;

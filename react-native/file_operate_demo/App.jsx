import React, {  } from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';

import FileAccessTest from './FileAccessTest';
import FileSelectorTest from './FileSelectorTest';

function App() {

  

  return (
    <SafeAreaView>
      <StatusBar />
      <FileAccessTest />
      <FileSelectorTest />
    </SafeAreaView>
  );
}


export default App;

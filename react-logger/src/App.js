import React from 'react';
import logo from './logo.svg';
import './style/App.css';
import Logger from './Logger';
function App() {
  return (
    <div className="App">

      <div>
   
      </div>
      <div></div>
      <div></div>
    </div>
  );
}
Logger.addDebugLog('debug log');
Logger.addWarnLog('warn log');
export default App;

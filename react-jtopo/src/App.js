import { useEffect, useRef } from 'react';

import './App.css';
import LinkNode from './LinkNode';
import DeviceRelation from './DeviceRelation';

function App() {


  return (
    <div className="App">
      <DeviceRelation />
      <LinkNode />
    </div>
  );
}

export default App;

import { useRef, useState, useEffect } from 'react';
import './App.css';
import Box from './layout/Box';
import UseCallbackComponentBefore from './UseCallbackComponentBefore';
import UseCallbackComponentAfter from './UseCallbackComponentAfter';
import UseEffectComponent from './UseEffectComponent';
import UseRefArrayComponent from './UseRefArrayComponent';
function RefFunctionComponent(props) {
  const divRef = useRef(/* initialValue */);
  function changeColor() {
    console.log('divRef', divRef);
    divRef.current.style.backgroundColor = 'skyblue';

  }
  return <div ref={divRef} style={{ width: '200px', height: '100px', backgroundColor: 'salmon' }}>
    <button onClick={changeColor}>改变颜色</button>
  </div>
}

function App() {
  return (
    <div className="App">
      <Box title={'function  component (useRef)'}>
        <RefFunctionComponent />
      </Box>

      <Box title={'function component useEffect'}>
        <UseEffectComponent />
      </Box>

      <Box title={'use callback before'}>
        <UseCallbackComponentBefore />
      </Box>
      <Box title={'use callback after'}>
        <UseCallbackComponentAfter />
      </Box>
      <Box>
        <UseRefArrayComponent />
      </Box>
    </div>


  );
}

export default App;

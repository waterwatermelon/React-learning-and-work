import { useRef } from 'react';
import './App.css';

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

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: ' center',
        width: '400px',
        padding: '16px',
        border: '1px solid #e0e0e0',
      }}>

        <h3 >function  component (useRef)</h3>
        <RefFunctionComponent />
      </div>


    </div>
  );
}

export default App;

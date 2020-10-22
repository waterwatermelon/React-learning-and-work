import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Box from './Box';

function App() {
  return (
    <div> 
      <h1>app</h1>
      <Box />
    </div>
  )
}
ReactDOM.render(
  <App />,
  document.getElementById('root')
);

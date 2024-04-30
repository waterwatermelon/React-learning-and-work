import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode ></React.StrictMode> 会导致开发模式下，useEffect执行2遍  
  <>
    <App />
  </>
);
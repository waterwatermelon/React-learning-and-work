import React from 'react';
// react-router v6
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ColorPicker from './colorpickers/ColorPicker';

function App() {
  return (
    <>
      <BrowserRouter >
        <Routes>
          <Route path='/colors' element={<ColorPicker />} />
          <Route element={<>see routes</>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
import React from 'react'
import TranslationViewer from './translation-viewer/TranslationViewer';
import ExamplePage from './example-page/ExamplePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <>
      <BrowserRouter >
        <Routes>
          <Route path='/app' element={<ExamplePage />} />
          <Route path='/viewer' element={<TranslationViewer />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
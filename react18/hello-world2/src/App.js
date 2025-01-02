import React, { useState } from 'react';
import MyModal from './MyModal';

export default function App() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div style={{ background: '#fefefe', }}>

        <h1>hello world 2</h1>
        <p style={{ height: '800px', }}>
          article .................. <br />
          <button onClick={() => { setOpen(true); }}>open modal</button>
        </p>
      </div>
      <MyModal open={open} onClose={()=> { setOpen(false);}} />
    </>
  )
}

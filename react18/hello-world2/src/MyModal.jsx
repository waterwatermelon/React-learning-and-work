import React from 'react'
import { createPortal } from 'react-dom';

export default function MyModal(props) {
  const { open, onClose } = props;
  return (
    <div>{
      open &&
      createPortal(<div style={{
        padding: 0, margin: 0, position: 'absolute', zIndex: 1, background: 'rgba(0,0,0,0.45)', border: '1px solid grey', borderRadius: 4, boxShadow: '1px 1px #aaa',
        top: 0, left: 0, width: '100vw', height: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }} onClick={onClose}>
        <div style={{ background: 'white', width: '800px', padding: '24px', borderRadius: '4px', }}>

          <h3> createPortal modal</h3>
        </div>
      </div>, document.body)
    }</div>
  )
}

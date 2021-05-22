import React from 'react'

export default function Box(props) {
  const { title } = props;
  return (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: ' start',
        width: '400px',
        height: '400px',
        padding: '16px',
        margin: '12px',
        border: '2px solid #abc',
        verticalAlign: 'top'
      }}>
      <h3>{title}</h3>
      {props.children}
    </div>
  )
}

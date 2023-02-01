// 全局组件
import React from 'react'

export default function ToTop() {
  return (
    <div 
    style={{
      position: 'fixed',
      right: '1em',
      bottom: '1em',
      width: '2em',
      height: '2em',
      textAlign:'center',
      lineHeight:'2em',
      border: '1px solid lightgrey',
      backgroundColor: '#efefef',
      cursor: 'pointer',
    }}>↑</div>
  )
}

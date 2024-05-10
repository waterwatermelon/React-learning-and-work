import React from 'react'
import { ConfigProvider } from 'antd'
import './app.css';
import './common.css';
import Portal from './Portal';


export default function App() {

  return (
    <ConfigProvider
      // TBC
      theme={{
        token: {
          // 品牌主色
          colorPrimary: '#1999FF',
          // 一级文本色
          // colorText: '#575967',
          // 基础圆角
          borderRadius: 4,
        },
      }}
    >
      <Portal />
    </ConfigProvider >
  )
}

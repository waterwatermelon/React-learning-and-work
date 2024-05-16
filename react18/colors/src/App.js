import React from 'react'
import { ConfigProvider } from 'antd'
import { generate } from '@ant-design/colors';


function ColorPat({ color }) {
  // 生成色板
  const colors = generate(color);


  const colordarks = generate(color, {
    theme: 'dark',
    backgroundColor: '#141414',
  });
  return <div style={{ display: 'flex', marginBottom: '0.75rem', }}>
    <div style={{ width: '4rem', height: '3rem', marginRight: '1rem', background: color, }}>{color}</div>
    <div >

      {/* light theme */}
      <div style={{ display: 'flex', }}>

        {
          colors.map(color => (<div style={{ width: '4rem', height: '3rem', background: color }}>
            {color}
          </div>))
        }
      </div>
      {/* dark theme */}
      <div style={{ display: 'flex', }}>

        {
          colordarks.map(color => (<div style={{ width: '4rem', height: '3rem', background: color }}>
            {color}
          </div>))
        }
      </div>
    </div>
  </div>
}
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
      <ColorPat color={'red'} />
      <ColorPat color={'blue'} />
      <ColorPat color={'#1890ff'} />
      <ColorPat color={'green'} />
      <ColorPat color={'#aaa'} />

    </ConfigProvider >
  )
}

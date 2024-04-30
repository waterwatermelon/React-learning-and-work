import React from 'react'
import LinePlot from './LinePlots'
import Bar from './Bar';
import { Animation } from './Animation';
import { Event } from './Event';
export default function App() {

  return (
    <>
      <h1>hello d3</h1>
      <div style={{ display: 'flex' }}>

        <LinePlot data={[1, 2, 4]} />
        <Bar />
        <Animation />
        <Event />
      </div>
    </>
  )
}

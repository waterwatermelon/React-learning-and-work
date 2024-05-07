import React from 'react'
import LinePlot from './LinePlots'
import Bar from './Bar';
import { Animation } from './Animation';
import { Event } from './Event';
import Pie from './Pie';
import Tree from './Tree';
export default function App() {

  return (
    <>
      <h1>hello d3</h1>
      <div style={{ display: 'flex' , flexWrap: 'wrap',}}>

        <LinePlot data={[1, 2, 4]} />
        <Bar />
        <Animation />
        <Event />
        <Pie />
        <Tree />
      </div>
    </>
  )
}

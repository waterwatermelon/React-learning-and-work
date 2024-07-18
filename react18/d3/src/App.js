import React from 'react';
import LinePlot from './LinePlots'
import Bar from './Bar';
import { Animation } from './Animation';
import { Event } from './Event';
import Pie from './Pie';
import Tree from './tree/Tree';
// import Axis from './Axis';
import Zoom from './Zoom';
import TreeTwo from './tree/TreeTwo';
export default function App() {

  return (
    <>
      <h1>hello d3</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', }}>
        {/* <Axis /> */}
        <LinePlot data={[1, 2, 4]} />
        <Bar />
        <Animation />
        <Event />
        <Pie />
        <Tree direction={'vertical'}/>
        <TreeTwo direction={'vertical'}/>
        <Zoom />
      </div>
    </>
  )
}

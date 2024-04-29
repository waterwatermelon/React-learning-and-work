import React from 'react'
import LinePlot from './LinePlots'
import Bar from './Bar';
import { ScaleLine } from './ScaleLine';
export default function App() {

  return (
    <>
      <h1>hello d3</h1>
      <LinePlot data={[1, 2, 4]} />
      <Bar />
      <ScaleLine />
    </>
  )
}

import React from 'react'
import LinePlot from './base/LinePlots'
import Bar from './base/Bar';
import Pie from './base/Pie';
import { Event } from './base/Event';
import { Animation } from './base/Animation';

export default function Base() {
  return (
    <div>

      <LinePlot data={[1, 2, 4]} />
      <Bar />
      <Pie />
      <Animation />
      <Event />

    </div>
  )
}

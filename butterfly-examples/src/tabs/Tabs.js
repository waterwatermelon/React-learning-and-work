import React, { useEffect } from 'react'
import { Canvas, Group, Node, Edge } from 'butterfly-dag';
import { Tabs } from 'antd';
import BaseNode from './BaseNode';
import { DeviceView } from './DeviceView';
import { SiteView } from './SiteView';


export default function TabsDemo() {

  return (
    <div className='ns-tabs'>
      <h2> Tabs </h2>
      <Tabs items={[{
        label: 'Site',
        key: 'site',
        children: <SiteView />,
      }, {
        label: 'Device',
        key: 'device',
        children: <DeviceView />,
      }]} />

    </div>
  )
}

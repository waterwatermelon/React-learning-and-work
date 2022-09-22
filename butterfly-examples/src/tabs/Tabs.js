import React, { useEffect } from 'react'
import { Canvas, Group, Node, Edge } from 'butterfly-dag';
import { Tabs } from 'antd';
import BaseNode from './BaseNode';

function SiteView() {
  useEffect(() => {
    const canvas = new Canvas({
      root: document.getElementById('site-box'),
      disLinkable: true, // 可删除连线
      linkable: false,    // 可连线
      draggable: true,   // 可拖动
      zoomable: true,    // 可放大
      moveable: true,    // 可平移
      layout: {
        type: 'concentricLayout',
        options: {
          maxLevelDiff: 0.5,
          sortBy: 'degree',
          minNodeSpacing: 100,
          preventOverlap: true,
        },
      },
    });
    canvas.draw({
      groups: [],
      nodes: [{
        id: 'test1',
        name: '小蝴蝶',
        type: 'main',
        iconType: 'iconapplication',
        className: 'icon-background',
        Class: BaseNode,
        degree: 10,
        size: 10,
      }, {
        id: 'test2',
        name: '自定义',
        type: 'prop',
        iconType: 'iconapplication',
        className: 'icon-background',
        // Class: Node,
        Class: BaseNode,
        degree: 3,
        size: 10,
      },],
      edges: [{
        id: 'edge2',
        source: 'test1',
        target: 'test2',
        label: 'text',
        Class: Edge,
      },],
    });
    
  }, []);
  return (
    <div>
      <div id='site-box' className='butterfly-box'>

      </div>
    </div>
  ) 
}

function DeviceView() {
  useEffect(() => {
    const canvas = new Canvas({
      root: document.getElementById('device-box'),
      disLinkable: true, // 可删除连线
      linkable: false,    // 可连线
      draggable: true,   // 可拖动
      zoomable: true,    // 可放大
      moveable: true,    // 可平移
      layout: {
        type: 'concentricLayout',
        options: {
          maxLevelDiff: 0.5,
          sortBy: 'degree',
          minNodeSpacing: 100,
          preventOverlap: true,
        },
      },
    });
    canvas.draw({
      groups: [],
      nodes: [{
        id: 'test1',
        name: '小蝴蝶',
        type: 'main',
        iconType: 'iconapplication',
        className: 'icon-background',
        Class: BaseNode,
        degree: 10,
        size: 10,
      }, {
        id: 'test2',
        name: '自定义',
        type: 'prop',
        iconType: 'iconapplication',
        className: 'icon-background',
        // Class: Node,
        Class: BaseNode,
        degree: 3,
        size: 10,
      },],
      edges: [{
        id: 'edge2',
        source: 'test1',
        target: 'test2',
        label: 'text',
        Class: Edge,
      },],
    });
    
  }, []);
  return (
    <div>
      <div id='device-box' className='butterfly-box'>

      </div>
    </div>
  )
}
export default function TabsDemo() {

  return (
    <div className='ns-tabs'>
      <h2> Tabs </h2>
      <Tabs items={[{
        label: 'Site',
        key: 'site',
        children: <SiteView  />,
      }, {
        label: 'Device',
        key: 'device',
        children: <DeviceView />,
      }]} />
      
    </div>
  )
}

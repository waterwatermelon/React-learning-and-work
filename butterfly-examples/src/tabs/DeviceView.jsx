import React, { useEffect } from 'react'
import { Canvas, Group, Node, Edge } from 'butterfly-dag';
import BaseNode from './BaseNode';

export function DeviceView() {

  const deviceViewData = {
    topoModel: 'HUB_SPOKE',
    deviceList: [{
      id: 1,
      sn: 'SN',
      role: '',
      // 图片
      subNetList: [{
        interfaceName: 'LAN1',
        subNet: '10.10.10.1/24',
        vlan: 1,
      }]
    },],
  };

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
    <div className='device-view'>
      <div id='device-box' className='butterfly-box'>

      </div>
      <div className='node-info-box'>
        节点信息
      </div>
    </div>
  )
}
import React, { useEffect } from 'react'
import { Canvas, Group, Node, Edge } from 'butterfly-dag';

import BaseNode from './BaseNode';
export default function GroupDemo() {

  useEffect(() => {
    const canvas = new Canvas({
      root: document.getElementById('butterfly-box'),
      disLinkable: true, // 可删除连线
      linkable: true,    // 可连线
      draggable: true,   // 可拖动
      zoomable: true,    // 可放大
      moveable: true,    // 可平移
      // layout: {
      //   type: 'concentricLayout',
      //   options: {
      //     maxLevelDiff: 0.5,
      //     sortBy: 'degree',
      //     minNodeSpacing: 100,
      //     preventOverlap: true,
      //   },
      // },
    });
    canvas.draw({
      groups: [{
        id: 'group1',
        options: {
          title: 'group1',
        },
        width: 400,
        // scope: 'group1',
        draggable: true,
        resize: true,
      }],
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
      <h2> Simple Demo</h2>
      <div id='butterfly-box' className='butterfly-box'>

      </div>
    </div>
  )
}

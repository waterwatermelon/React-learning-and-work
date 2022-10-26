import React, { useEffect } from 'react'
import { Canvas, Group, Node, Edge } from 'butterfly-dag';

import BaseNode from './BaseNode';
import BaseEdge from './Edge';
export default function ThemeDemo() {

  useEffect(() => {
    const canvas = new Canvas({
      root: document.getElementById('butterfly-box'),
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
      theme: {
        endpoint: {
          expandArea: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          }
        },
        edge: {
          shapeType: 'Manhattan',
          lineType: 'dash-line',
          Class: BaseEdge,
        }
      }
    });
    // 覆盖默认构造类
    canvas._NodeClass = BaseNode;
    canvas.theme.edge = {
      ...canvas.theme.edge,
      // lineType: 'dash-line', // 需要重写Canvas的addEdges方法
    };

    canvas.draw({
      groups: [],
      nodes: [{
        id: 'test1',
        name: '小蝴蝶',
        type: 'main',
        iconType: 'iconapplication',
        className: 'icon-background',
        // Class: BaseNode,
        degree: 10,
        size: 10,
      }, {
        id: 'test2',
        name: '自定义',
        type: 'prop',
        iconType: 'iconapplication',
        className: 'icon-background',
        // Class: Node,
        // Class: BaseNode,
        degree: 3,
        size: 10,
      },],
      edges: [{
        id: 'edge2',
        source: 'test1',
        target: 'test2',
        label: 'text',
        lineType: 'dash-line',
        // Class: Edge,
      },],
    });
  }, []);
  return (
    <div className='ns-theme'>
      <h2> Theme Demo</h2>
      <div id='butterfly-box' className='butterfly-box'>

      </div>
      <div className='butterfly-guide'></div>
    </div>
  )
}

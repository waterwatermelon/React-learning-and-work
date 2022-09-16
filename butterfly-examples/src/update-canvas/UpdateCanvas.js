import React, { useEffect, useRef } from 'react'
import { Canvas, Group, Node, Edge } from 'butterfly-dag';

import BaseNode from './BaseNode';
export default function UpdateCanvas() {
  const canvasRef = useRef();
  const handleUpdate = () => {
    const data = canvasRef.current.getDataMap();
    console.log('data', data)
    canvasRef.current.redraw({
      ...data,
      nodes: [
        ...data.nodes,
        {
          id: 'test1',
          name: 'update',
          Class: BaseNode,
        }],
    }, () => {
      console.log('[redraw][finish]');
      const dataMap = canvasRef.current.getDataMap();
      console.log('dataMap', dataMap);
      const node = canvasRef.current.getNode('aaa');
      console.log('node', node);
    })
    // const node = canvasRef.current.getNode('test1');
    // console.log('node', node)
    // node.options.name = 'update';
  };
  useEffect(() => {
    canvasRef.current = new Canvas({
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
    });
    canvasRef.current.draw({
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
      <h2> Update Canvas</h2>
      <div id='butterfly-box' className='butterfly-box'>

      </div>
      <button onClick={handleUpdate}> update </button>
    </div>
  )
}

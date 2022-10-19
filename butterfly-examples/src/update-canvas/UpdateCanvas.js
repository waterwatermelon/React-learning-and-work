import React, { useEffect, useRef, useState } from 'react'
import { Canvas, Group, Node, Edge } from 'butterfly-dag';
import BaseNode from './BaseNode';
import ImageNode from '../image-node/ImageNode';
import { useInterval } from 'ahooks';
import { delay } from '../fetchs';
import { EVENT_TYPE } from '../constant';


export default function UpdateCanvas() {
  const canvasRef = useRef();
  const [autoUpdate, setAutoUpdate] = useState(false);
  const [updateNodeTime, setUpdateNodeTime] = useState();
  // const [updating, setUpdating] = useState(false);

  // 如何获取所有节点？
  const updateNode = (node) => {
    node.update(Math.random() > 0.5 ? 'alarm' : 'offline');
  };

  const getAllNodes = () => {
    const dataMap = canvasRef.current.getDataMap();
    console.log('dataMap', dataMap);
    console.log('typeof dataMap', typeof dataMap);
    console.log('canvasRef.current.nodes', canvasRef.current.nodes);
    const nodes = dataMap.nodes;
    // setUpdating(true);
    console.log('[UpdateCanvas] get node state [start]');
    delay(2000)
      .then(() => {
        console.log('autoUpdate', autoUpdate)
        console.log('[UpdateCanvas] get node state [finish]');
        for (const node of nodes) {
          node.update(Math.random() > 0.5 ? 'alarm' : 'offline');
        }
        // setUpdating(false);
      });
  }

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
      }, {
        id: 'image-node',
        name: 'image',
        Class: ImageNode,
        bgSrc: '/images/olt.png',
        userData: {
          alarm: '/images/olt_alarm.png',
          offline: '/images/olt_offline.png',
        },
      }],
      edges: [{
        id: 'edge2',
        source: 'test1',
        target: 'test2',
        label: 'text',
        Class: Edge,
      },],
    });
    canvasRef.current.on('events', data => {
      const { type, node } = data;
      console.log('type', type);
      if (type === EVENT_TYPE.NODE_CLICK && node) {
        updateNode(node);
      }
    });
  }, []);

  useEffect(() => {
    if (autoUpdate) {
      setUpdateNodeTime(5000);
    } else {
      setUpdateNodeTime();
    }
  }, [autoUpdate]);

  useInterval(getAllNodes, updateNodeTime);

  return (
    <div className='ns-update'>
      <h2> Update Canvas</h2>
      <div id='butterfly-box' className='butterfly-box'>

      </div>

      <div className='butterfly-operate'>
        {/* <button onClick={handleRedraw}> redraw （bug)</button> */}

        <input type='checkbox' value={autoUpdate} onChange={e => setAutoUpdate(e.target.checked)} /> 自动更新
      </div>
      <div className='butterfly-guide'>
        点击节点，随机更新节点颜色
      </div>

    </div>
  )
}

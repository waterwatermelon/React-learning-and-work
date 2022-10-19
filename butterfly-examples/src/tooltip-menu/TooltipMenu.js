import React, { useEffect, useRef } from 'react'
import { Canvas, Group, Node, Edge, Tips } from 'butterfly-dag';

import BaseNode from './BaseNode';
export default function TooltipMenu() {
  const canvasRef = useRef();

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
        name: 'tooltip',
        type: 'main',
        iconType: 'iconapplication',
        className: 'icon-background',
        Class: BaseNode,
        degree: 10,
        size: 10,
      }, {
        id: 'test2',
        name: 'menu',
        type: 'prop',
        iconType: 'iconapplication',
        className: 'icon-background',
        // Class: Node,
        Class: BaseNode,
        degree: 3,
        size: 10,
      },],
      edges: [{
        id: 'edge1',
        source: 'test1',
        target: 'test2',
        label: 'wan-link',
        Class: Edge,
      },],
    });

    canvasRef.current.on('events', data => {
      console.log('data', data);
      const { type, node } = data;

      if (type.includes('click') && type.includes('node')) {
        if (node.id.includes('1')) {
          Tips.createTip({
            className: 'butterfly-custom-tips',
            targetDom: node.dom,
            genTipDom: () => {
              const dom = document.createElement('div');
              dom.innerText = 'Tooltip';
              return dom;
            },
            placement: 'top',
          })
        }
        if (node.id.includes('2')) {
          Tips.createMenu({
            className: 'butterfly-custom-menu',
            targetDom: node.dom,
            genTipDom: () => {
              const dom = document.createElement('div');
              dom.innerText = 'Menu';
              return dom;
            },
            action: 'clic',
            closable: true,
          });
        }

      }
    });

  }, []);
  return (
    <div className='ns-tooltip'>
      <h2> Tooltip Menu </h2>
      <div id='butterfly-box' className='butterfly-box'>

      </div>
      <div className='butterfly-guide'>
        点击或悬浮节点，显示菜单或者提示信息
      </div>
    </div>
  )
}

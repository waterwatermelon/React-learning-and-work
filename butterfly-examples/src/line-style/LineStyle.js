import { useEffect } from 'react'
import { Canvas } from 'butterfly-dag';
import Node from './BaseNode';
import Edge from './Edge';

export default function LineStyle() {
  useEffect(() => {
    const canvas = new Canvas({
      root: document.getElementById('butterfly-box'),
      disLinkable: true, // 可删除连线
      linkable: true,    // 可连线
      draggable: true,   // 可拖动
      zoomable: true,    // 可放大
      moveable: true,    // 可平移
      theme: {
        edge: {
          shapeType: 'AdvancedBezier',
          arrow: true
        }
      },
    });
    canvas.draw({
      nodes: [{
        id: '1',
        label: 'Number',
        className: 'icon-background',
        iconType: 'icon-wo',
        top: 25,
        left: 380,
        Class: Node,
        endpoints: [{
          id: 'bottom',
          orientation: [0, 1],
          pos: [0.5, 0]
        }],
      },
      {
        id: '2',
        label: 'Name',
        className: 'icon-background',
        iconType: 'icon-wo',
        top: 25,
        left: 520,
        Class: Node,
        endpoints: [{
          id: 'bottom',
          orientation: [0, 1],
          pos: [0.5, 0]
        }]
      },
      {
        id: '3',
        label: 'Skills',
        className: 'icon-background',
        iconType: 'icon-wo',
        top: 25,
        left: 660,
        Class: Node,
        endpoints: [{
          id: 'bottom',
          orientation: [0, 1],
          pos: [0.5, 0]
        }]
      },
      {
        id: '4',
        label: 'Employee',
        className: 'icon-background',
        iconType: 'icon-guanlian',
        top: 125,
        left: 520,
        Class: Node,
        endpoints: [{
          id: 'top',
          orientation: [0, -1],
          pos: [0.5, 0]
        }, {
          id: 'right',
          orientation: [1, 0],
          pos: [0, 0.5]
        }, {
          id: 'bottom',
          orientation: [0, 1],
          pos: [0.5, 0]
        }]
      },],
      edges: [{
        id: 'line1',
        source: 'bottom',
        target: 'top',
        sourceNode: '1',
        targetNode: '4',
        type: 'endpoint',
        arrow: true,
        arrowPosition: 0.5,
        Class: Edge,
        // custom property
        lineType: 'dash-line',
        color: 'red',
      },
      {
        source: 'bottom',
        target: 'top',
        sourceNode: '2',
        targetNode: '4',
        type: 'endpoint',
        arrow: true,
        arrowPosition: 0.5,
        Class: Edge,
        lineType: 'strong-line',
        color: 'warn',
      },
      {
        source: 'bottom',
        target: 'top',
        sourceNode: '3',
        targetNode: '4',
        type: 'endpoint',
        arrow: true,
        arrowPosition: 0.5,
        Class: Edge,
        // lineType: 'strong-line',
        color: 'green',
      },],
    });

  }, []);
  return (
    <div className='ns-line-style'>
      <h2> Line Style</h2>
      <div id='butterfly-box' className='butterfly-box'>

      </div>
    </div>
  )
}

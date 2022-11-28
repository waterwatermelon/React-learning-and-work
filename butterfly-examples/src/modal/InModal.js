import React, { useEffect, useState } from 'react'
import { Canvas, Edge } from 'butterfly-dag';

import BaseNode from './BaseNode';
import { Button, Modal, Spin } from 'antd';
export default function InModal() {

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    setLoading(true);
    return new Promise(() => {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    });
  };
  const handleClose = () => {
    setOpen(false)
  };
  useEffect(() => {
    if (!open) {
      return;
    }
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
  }, [open]);
  return (
    <div className='ns-simple'>
      <h2> In Modal Demo</h2>

      <div className='butterfly-guide'>在模态框中显示的拓扑图</div>
      <Button onClick={handleOpen}> open modal</Button>
      <Modal width={640} title='topo-modal' open={open} onCancel={handleClose}>
        <Spin spinning={loading}>
          <div id='butterfly-box' className='butterfly-box'>
          </div>
        </Spin>
      </Modal>
    </div>
  )
}

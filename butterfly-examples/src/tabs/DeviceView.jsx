import React, { useEffect, useState } from 'react'
import { Canvas, Group, Node, Edge } from 'butterfly-dag';
import BaseNode from './BaseNode';
import { EVENT_TYPE } from '../constant';

const TOPO_MODEL = {
  HUB_SPOKE: 'HUB_SPOKE',
  FULL_MESH: 'FULL_MESH',
};

const TUNNEL_TYPE = {
  IPSEC: 'IPSEC',
  VXLAN: 'VXLAN',
};

export function DeviceView() {

  const [selectedData, setSelectedData] = useState();
  
  // 业务层数据
  const deviceViewData = {
    topoModel: 'HUB_SPOKE',
    deviceList: [{
      id: 111,
      sn: 'SN',
      role: 'HUB',
      // TODO:图片
      subNetList: [{
        interfaceName: 'LAN1',
        subNetwork: '10.10.10.1/24',
        vlan: 1,
      }]
    },],
  };

  // 渲染层数据
  const displayData = {
    nodes: [{
      id: 1,
      name: 'SN',
      Class: BaseNode,
      userData: {
        deviceId: 111 ,
        connectInterface: 'g0/0',
        subNetList: [{
          interfaceName: 'LAN1',
          subNetwork: '10.10.10.1/24',
          vlan: 1,
        }]
      }
    }],
  };

  // TODO:业务层数据
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
        },
      },
    });

    canvas.draw(displayData);
    canvas.on('events', data => {
      const { type, node } = data;
      if (type.includes(EVENT_TYPE.NODE_CLICK)) {
        console.log('node', node);
        // 通过节点信息找到对应的业务数据
      }
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
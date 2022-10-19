import React, { useEffect } from 'react'
import { Canvas, Node, Edge } from 'butterfly-dag';

import BaseNode from './BaseNode';
import { ENDPOINT_ORIENTATION } from '../constant';
import { EndPointWithLabel } from './EndPoint';
export default function Topo() {
  const siteList = [{
    id: '1',
    name: 'site-1',
    type: 'hub',
    port: 'g1',
  }, {
    id: '2',
    name: 'site-2',
    type: 'spoke',
    port: 'g0',
  }, {
    id: '3',
    name: 'site-3',
    type: 'spoke',
    port: 'g0',
  }, {
    id: '4',
    name: 'site-4',
    type: 'spoke',
    port: 'g0',
  }, {
    id: '5',
    name: 'site-5',
    type: 'spoke',
    port: 'g0',
  }, {
    id: '6',
    name: 'site-6',
    type: 'spoke',
    port: 'g0',
  },];

  const siteDataToNodeData = (e) => {
    // TODO:图片渲染
    return {
      id: e.id,
      name: e.name,
      type: e.type,
      Class: BaseNode,
    }
  };
  // link to node 
  const linkToNode = () => {
    const displayData = {
      nodes: [],
      edges: [],
    };
    const hubNode = siteList.find(e => e.type === 'hub');
    // site data to node data
    displayData.nodes.push(siteDataToNodeData(hubNode));
    const spokeList = siteList.filter(e => e.id !== hubNode.id);
    for (let i = 0; i < spokeList.length; i++) {
      const spokeNode = spokeList[i];
      const edg = {
        id: hubNode.id + spokeNode.id,
        source: hubNode.id,
        target: spokeNode.id,
        Class: Edge,
      };
      displayData.nodes.push(siteDataToNodeData(spokeNode));
      displayData.edges.push(edg);
    }
    return displayData;
  };

  const linkToEndpoint = () => {
    const displayData = {
      nodes: [],
      edges: [],
    };
    const hubNode = siteList.find(e => e.type === 'hub');
    const nodeData = siteDataToNodeData(hubNode);
    nodeData.endpoints = [{
      id: 'top',
      orientation: ENDPOINT_ORIENTATION.UP,
      pos: [0.5, 0],
      Class: EndPointWithLabel,
      // 
      label: hubNode.port,
    }, {
      id: 'bottom',
      orientation: ENDPOINT_ORIENTATION.DOWN,
      pos: [0.5, 0],
      Class: EndPointWithLabel,
      // 
      label: hubNode.port,
    }];
    displayData.nodes.push(nodeData);
    const spokeList = siteList.filter(e => e.id !== hubNode.id);
    const spliteIndex = spokeList.length / 2;
    const upList = spokeList.slice(0, spliteIndex + 1);
    const downList = spokeList.slice(spliteIndex + 1);
    for (let i = 0; i < upList.length; i++) {
      const siteData = upList[i];
      const upNode = siteDataToNodeData(siteData);
      upNode.endpoints = [{
        id: 'bottom',
        orientation: ENDPOINT_ORIENTATION.DOWN,
        pos: [0.5, 0],
        Class: EndPointWithLabel,
        label: siteData.port,downList,
      }]
      const edge = {
        id: hubNode.id + upNode.id,
        source: 'bottom',
        target: 'top',
        sourceNode: upNode.id,
        targetNode: hubNode.id,
        type: 'endpoint',
        Class: Edge,
      }
      displayData.nodes.push(upNode);
      displayData.edges.push(edge);
    }

    for (let i = 0; i < downList.length; i++) {
      const siteData = downList[i];
      const downNode = siteDataToNodeData(downList[i]);
      downNode.endpoints = [{
        id: 'top',
        orientation: ENDPOINT_ORIENTATION.UP,
        pos: [0.5, 0],
        Class: EndPointWithLabel,
        label: siteData.port,
      }]
      const edge = {
        id: hubNode.id + downNode.id,
        source: 'bottom',
        target: 'top',
        sourceNode: hubNode.id,
        targetNode: downNode.id,
        type: 'endpoint',
        Class: Edge,
      }
      displayData.nodes.push(downNode);
      displayData.edges.push(edge);
    }
    return displayData;
  };

  useEffect(() => {
    const canvas = new Canvas({
      root: document.getElementById('butterfly-box'),
      disLinkable: true, // 可删除连线
      linkable: false,    // 可连线
      draggable: true,   // 可拖动
      zoomable: true,    // 可放大
      moveable: true,    // 可平移
      theme: {
        edge: {
          shapeType: 'AdvancedBezier',
        }
      },
      layout: {
        type: 'dagreLayout',
        options: {
          rankdir: 'TB',
          nodesep: 40,
          ranksep: 40,
          controlPoints: false,
        },
      },
      
    });
    // siteList to render layer data

    canvas.draw(linkToEndpoint());

  }, []);
  return (
    <div className='ns-topo'>
      <h2> Topo Hub Spoke</h2>
      <div id='butterfly-box' className='butterfly-box'>

      </div>
    </div>
  )
}

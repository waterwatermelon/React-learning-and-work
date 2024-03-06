
import { Menu } from 'antd'
import React from 'react'

export default function MenuExample() {
  return (
    <Menu
      style={{ width: '240px' }}
      mode='inline'
      items={[{
        label: '状态',
        key: 'status',
        children: [{
          label: '网络状态',
          key: 'status-network',
        }, {
          label: 'PBX状态',
          key: 'status-pbx',
        },]
      }, {
        label: '网络',
        key: 'network',
        children: [{
          label: 'LAN侧配置',
          key: 'network-lan',
          children: [{
            label: 'IPv4',
            key: 'network-lan-ipv4',
          }, {
            label: 'IPv6',
            key: 'network-lan-ipv6',
          },]
        },]
      },]}
    />
  )
}

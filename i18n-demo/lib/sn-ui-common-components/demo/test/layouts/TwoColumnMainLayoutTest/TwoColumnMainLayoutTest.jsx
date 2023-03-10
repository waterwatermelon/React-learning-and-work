import React from 'react';
import { TwoColumnMainLayout } from 'src';

const menus = [{
  id: 1,
  title: 'title1',
  parentId: 0,
  key: '/app-one',
  // icon: 'FastBackwardOutlined'
}, {
  id: 2,
  title: 'title2',
  parentId: 0,
  key: '/app-two',
  icon: 'FastBackwardOutlined',
  children: [{
    id: 3,
    title: 'title1-3',
    parentId: 1,
    key: '/app-two/three',
    icon: 'FastBackwardOutlined'
  }],
}, {
  id: 4,
  title: 'title3',
  parentId: 1,
  key: '/app-one/sub',
  icon: 'FastBackwardOutlined'
}, {
  id: 4,
  title: 'title3',
  parentId: 1,
  key: '/app-one/sub',
  icon: 'FastBackwardOutlined'
}, {
  id: 4,
  title: 'title3',
  parentId: 1,
  key: '/app-one/sub',
  icon: 'FastBackwardOutlined'
}, {
  id: 4,
  title: 'title3',
  parentId: 1,
  key: '/app-one/sub',
  icon: 'FastBackwardOutlined'
}, {
  id: 4,
  title: 'title3',
  parentId: 1,
  key: '/app-one/sub',
  icon: 'FastBackwardOutlined'
}, {
  id: 4,
  title: 'title3',
  parentId: 1,
  key: '/app-one/sub',
  icon: 'FastBackwardOutlined'
}, {
  id: 4,
  title: 'title3',
  parentId: 1,
  key: '/app-one/sub',
  icon: 'FastBackwardOutlined'
}, {
  id: 4,
  title: 'title3',
  parentId: 1,
  key: '/app-one/sub',
  icon: 'FastBackwardOutlined'
}, {
  id: 4,
  title: 'title3',
  parentId: 1,
  key: '/app-one/sub',
  icon: 'FastBackwardOutlined'
}, {
  id: 4,
  title: 'title3',
  parentId: 1,
  key: '/app-one/sub',
  icon: 'FastBackwardOutlined'
}, {
  id: 4,
  title: 'title3',
  parentId: 1,
  key: '/app-one/sub',
  icon: 'FastBackwardOutlined'
}, {
  id: 4,
  title: 'title3',
  parentId: 1,
  key: '/app-one/sub',
  icon: 'FastBackwardOutlined'
}];

export default function TwoColumnMainLayoutTest(props) {
  return (
    <div>
      <TwoColumnMainLayout menus={menus} {...props} selectedKeys={['/app-one/three']}/>
    </div>
  )
}

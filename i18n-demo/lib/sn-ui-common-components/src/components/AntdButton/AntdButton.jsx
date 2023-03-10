import React from 'react';
import { Button } from 'antd';

// 测试编译配置
export default function AntdButton(props) {
  return (
    <div>
      <Button >{props.children} </Button>
    </div>
  );
} 
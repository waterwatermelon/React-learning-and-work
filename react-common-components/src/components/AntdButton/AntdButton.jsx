import React from 'react';
import { Button } from 'antd';
export default function AntdButton(props) {
  return (
    <div>
      <Button >{props.children} </Button>
    </div>
  );
} 
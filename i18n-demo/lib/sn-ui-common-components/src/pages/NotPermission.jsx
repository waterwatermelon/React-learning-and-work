import React from 'react';
import { Result } from 'antd';

export default function NotPermission(props) {
  const { status ='403', title = '403', subTitle = '很抱歉，您没有对应权限' } = props;

  return (
    <Result
      status={status}
      title={title}
      subTitle={subTitle}
    />
  )
}

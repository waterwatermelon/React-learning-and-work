import React from 'react';
import { Result } from 'antd';
export default function NotFound(props) {
  const { status ='404', title = '404', subTitle = '很抱歉，没有找到当前页面' } = props;

  return (
    <Result
      status={status}
      title={title}
      subTitle={subTitle}
    />
  )
}

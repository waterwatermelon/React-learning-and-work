import { BetaSchemaForm } from '@ant-design/pro-components'
import React from 'react'

export default function JsonSchemaForm() {
  const style = {
    box: {
      margin: '20px auto',
      width: 800,
    },
  };
  const options = [{
    label: 'VOIP',
    value: 'VOIP',
  },{
    label: 'INTERNET',
    value: 'INTERNET',
  },]
  const columns = [{
    title: '标题',
    dataIndex: 'title',
    valueType: 'text',
    formItemProps: {
      rules: [{
        required: true,
      }],
    },
    // set
    convertValue: value => {
      return 'http://' + value;
    },
    // get 
    transform: value => {
      return { 
        title: value.split('//')[1] 
      };
    },
  }, {
    title: '使能',
    dataIndex: 'switch', 
    valueType: 'switch',
  }, {
    title: '类型',
    dataIndex: 'type', 
    valueType: 'select',
    valueEnum: {
      open: '未处理',
      close: '已解决'
    },
  }, {
    title: '开关',
    dataIndex: 'enable',
    valueType: 'checkbox',
    fieldProps: {
      options: [''],
    }
  }];
  return (
    <div style={style.box}>
      <BetaSchemaForm columns={columns} />

    </div>
  )
}

import React, { useState } from 'react'
import { ProForm, ProFormCheckbox, ProFormDigit, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { useForm } from 'antd/lib/form/Form';

export default function ProFormFields() {
  const style = {
    box: {
      margin: '20px auto',
      width: 800,
    },
  };
  const [form] = useForm();
  return (
    <div style={style.box}>
      <ProForm form={form}>

        <ProFormText label='标题' name={'text'} rules={[{ required: true, }]} />
        <ProFormText readonly label='标题' name={'text'} />
        <ProFormText.Password label='密码' name={'text'} />

        <ProFormDigit label='小数' />
        <ProFormSelect label='IP协议'
          options={[{ label: 'IPv4', value: '0', }, { label: 'IPv6', value: '1', }, { label: 'IPv4/IPv6', value: '2', },]}
        />
        <ProFormCheckbox label='使能' />
        <ProFormCheckbox.Group label='端口' name={'interface'}  options={['LAN1', 'LAN2']} />
      </ProForm>

    </div>
  )
}

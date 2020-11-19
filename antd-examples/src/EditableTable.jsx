import React, { Component, useState } from 'react'
import { Table, Form, Input, Button } from 'antd'



const EditableCell = ({
  editing,
  editable,
  dataIndex,
  children,
  ...restProps
}) => {
  
  if (!editable) {
    return <td {...restProps}>{children}</td>
  }

  let childNode = children;
  childNode = editing ? (
    <Form.Item

      name={dataIndex}
      rules={[{ required: true, message: '请选择数量' }, { pattern: /^[0-9]{1,1}$/, message: '请填写数字' }]}>
      <Input style={{ width:'100px'}} />
    </Form.Item>
  ) : (
      <div>
        {children}
      </div>
    )

  return <td {...restProps}>{childNode}</td>
}
export default class EditableTable extends Component {
  constructor() {
    super();
    this.columns = [{
      title: '产品名称',
      dataIndex: 'name',
    }, {
      title: '数量',
      dataIndex: 'number',
      editable: true,
    }, {
      title: '备注',
      dataIndex: 'remark',
      editable: true,
    }, {
      title: 'action',
      editable: false,
      render: () => {
        return (
          <span>
            <Button size='small' onClick={this.handleDeleteRow}>delete</Button>
          </span>
        )
      }
    }];
    this.state = {
      dataSource: [{ 
        id:1,
        name: 'SVP3390',
        number: 11,
        remark: '',
      },{ 
        id:2,
        name: 'SVP3390',
        number: 11,
        remark: '',
      },{ 
        id:3,
        name: 'SVP3390',
        number: 11,
        remark: '',
      }],
      editing: true,
    }
  }
  handleDeleteRow = () => {
     
  }
  render() {

    const components = {
      body: {
        cell: EditableCell,
      }
    }
    const mergeredColumns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          dataIndex:[col.dataIndex],
          editable: col.editable,
          editing: this.state.editing,
        })
      }
    })
    return (
      <Form>
        <Table
          size='small'
          components={components}
          columns={mergeredColumns}
          dataSource={this.state.dataSource} />
      </Form>
    )
  }
}

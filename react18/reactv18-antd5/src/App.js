import React from 'react'
import { Button, Card, Checkbox, Col, ConfigProvider, Form, Input, Menu, Radio, Row, Select, Table } from 'antd'
import { CaretRightOutlined, SunOutlined, ThunderboltOutlined } from '@ant-design/icons';

const options = [{ label: 'apple', value: 'apple', }, { label: 'pear', value: 'pear', }, { label: 'banana', value: 'banana' }];
export default function App() {
  /* functions */
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  
  return (
    <ConfigProvider
      // TBC
      theme={{
        token: {
          colorPrimary: '#1999FF',
          borderRadius: '4px',
          // colorText: '#575967',
          colorTextBase: '#575967',

        },
        components: {
          Menu: {
            // 菜单项激活态背景色
            itemActiveBg: '#1999FF',
            // 菜单项悬浮态背景色
            itemHoverBg: '#1999FF',
            // 菜单项选中态背景色
            itemSelectedBg: '#1999FF',
            // 菜单项文字悬浮颜色
            itemHoverColor: 'white',
            itemSelectedColor: 'white',
          },

          Table: {
            headerBg: '#E7E7E7',
          },
        }
      }}>

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
      <Row gutter={[8, 8]}>
        <Col>
          <Card title='Inputs'>
            <Input placeholder="Basic usage" />
            <Radio.Group options={options} />
            <br />
            <Select style={{ width: "200px" }} showSearch={true} options={options} />
          </Card>
        </Col>
        <Col  span={8}>
          <Card title='Buttons'>
            <Button >Button</Button>
            <Button type='primary'>Button</Button>
          </Card>
        </Col>
        <Col  span={8}>
          <Card title='Form'>
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              style={{
                maxWidth: 600,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col  span={8} >
          <Card title='Tables'>
            <Table
              columns={[{ title: 'username', dataIndex: 'username', }, { title: 'password', dataIndex: 'password', }]}
              dataSource={[{ username: 'gill', password: 'abc', }, { username: 'sue', password: 'haha' }]} />
          </Card>
        </Col>

        <Col  span={8}>
          <Card title='Icons'>
            <SunOutlined />
            <ThunderboltOutlined />
            <CaretRightOutlined />
          </Card>
        </Col>

      </Row>
    </ConfigProvider>
  )
}

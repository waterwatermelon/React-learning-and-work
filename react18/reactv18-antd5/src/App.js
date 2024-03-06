import React from 'react'
import { Breadcrumb, Button, Card, Col, ConfigProvider, Row, Table } from 'antd'
import { CaretRightOutlined, SunOutlined, ThunderboltOutlined } from '@ant-design/icons';
import FormExample from './examples/FormExample';
import MenuExample from './examples/MenuExample';
import InputExample from './examples/InputExample';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import './app.css';
import EditTableExample from './examples/EditTableExample';


export default function App() {

  return (
    <ConfigProvider
      // TBC
      theme={{
        token: {
          // 品牌主色
          colorPrimary: '#1999FF',
          // 一级文本色
          colorText: '#575967',
          // 基础圆角
          borderRadius: '4px',
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
            // 菜单项的圆角
            // itemBorderRadius: 8,
          },

          Table: {
            headerBg: '#E7E7E7',
            // 标题字体颜色
            colorTextHeading: '#332',
            // 一级文本色 覆盖全局主题的colorText
            colorText: '#135',
          },
        }
      }}>
      <Row >
        <Col span={4}>
          <MenuExample />
        </Col>
        <Col span={20}>
          <Breadcrumb
            items={[
              {
                title: 'Home',
              },
              {
                title: <a href="">Application Center</a>,
              },
              {
                title: <a href="">Application List</a>,
              },
              {
                title: 'An Application',
              },
            ]}
          />

          <div style={{ padding: '12px 0' }}>
            {/* 此处单独设置Row组件的gutter会导致整个文档出现水平方向的滚动条 */}
            <Row gutter={[0, 8]}>
              <Col>
                <Card title='Inputs'>
                  <InputExample />
                </Card>
              </Col>
              <Col span={8}>
                <Card title='Buttons'>
                  <Button >Button</Button>
                  <Button type='primary'>Button</Button>
                </Card>
              </Col>
              <Col span={8}>
                <Card title='Form'>
                  <FormExample />
                </Card>
              </Col>
              <Col span={8} >
                <Card title='Tables'>
                  <Table
                    columns={[{ title: 'username', dataIndex: 'username', }, { title: 'password', dataIndex: 'password', }]}
                    dataSource={[{ username: 'gill', password: 'abc', }, { username: 'sue', password: 'haha' }]} />
                </Card>
              </Col>

              <Col span={8}>
                <Card title='Icons'>
                  <SunOutlined />
                  <ThunderboltOutlined />
                  <CaretRightOutlined />
                </Card>
              </Col>

              <Col span={8}>
                <Card title='procomponents'>
                  <ProForm                    
                    onFinish={async (values) => {
                      console.log(values);
                    }}
                  >
                    <ProFormText
                      name="name"
                      label="姓名"
                      rules={[{
                        validator: (_, value) => {
                          if (value && value.includes('#')) {
                            return Promise.reject('包含非法字符');
                          }
                        }
                      }]} />
                  </ProForm>
                </Card>
              </Col>
              <Col span={24}>
                <Card title='procomponents'>
                   <EditTableExample />
                </Card>
              </Col>
            </Row>
          </div>
        </Col>

      </Row>

    </ConfigProvider >
  )
}

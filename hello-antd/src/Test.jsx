import React, { Component } from 'react';
import { Layout, Pagination, Input, Select, TreeSelect, Button, Icon, Form, Divider, Table } from 'antd';
import GroupList from './views/system/GroupList.jsx'
// import styles from './test.less';
import HeaderCustom from './components/HeaderCustom.jsx'
import SiderCustom from './components/SiderCustom.jsx'
import SiderMenu from './components/SiderMenu.jsx'
import { menus } from './constants/menus'

const { Content, Footer } = Layout;
const FormItem = Form.Item;
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuValue: menus,
    };
    // console.log('styles :', styles);
    console.log('menus :', menus);
  }

  render() {
    return (
      <Layout>
        <SiderCustom collapsed={false} />
        <Layout style={{ flexDirection: 'column' }} className="main">
          <HeaderCustom />
          <SiderMenu
            style={{ backgroundColor:'rgba(255,255,255,.05)'}}
            menus={this.state.menuValue}
            mode="horizontal"
          />
          <Content style={{ margin: '0 16px', overflow: 'initial', minHeight: 'auto' }}>
              <GroupList />
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            管理后台 ©2020 Created by
          </Footer>
        </Layout>
      </Layout>);
  }
}

export default Main;

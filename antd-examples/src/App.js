import './App.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Route, Switch, Link } from 'react-router-dom';
import Cart from './quote/Cart'
import Collection from './quote/Collection';
import ProductEditor from './quote/editor';
import DeviceSelect from './olt/DevcieSelect';
import FormList from './olt/FormList';
const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

function Quotation() {
  return 'quotation';
}
function App(props) {
  return (
    <Layout style={{ height: '100vh' }}>
      <Header >
        <Menu mode='horizontal' theme='dark' defaultOpenKeys={['2']}>
          <Menu.Item key='1'>nav 1</Menu.Item>
          <Menu.Item key='2'>nav 2</Menu.Item>
          <Menu.Item key='3'>nav 3</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }} >
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item >home </Breadcrumb.Item>
          <Breadcrumb.Item >list</Breadcrumb.Item>
          <Breadcrumb.Item >app</Breadcrumb.Item>
        </Breadcrumb>

        <Layout className='site-layout-background'>
          <Sider className='site-layout-background' width={200}>
            <Menu mode='inline' style={{ height: '100%' }} >
              <SubMenu key='sub1' title='报价系统'>
                <Menu.Item key='/cart'>
                  <Link to='/cart'>
                    购物车
                  </Link>
                </Menu.Item>
                <Menu.Item key='/quotation'>
                  <Link to='/quotation'>
                    报价管理
                  </Link>
                </Menu.Item>
                <Menu.Item key='/product-editor'>
                  <Link to='/product-editor'>
                    产品编辑
                  </Link>
                </Menu.Item>
                <Menu.Item key='/collection'>
                  <Link to='/collection'>
                    我的收藏
                  </Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key='sub2' title='OLT控制器'>
                <Menu.Item key='/device-select'>
                  <Link to='/device-select'>
                    设备选择
                  </Link>
                </Menu.Item>
                <Menu.Item key='/form-list'>
                  <Link to='/form-list'>
                    form list
                  </Link>
                </Menu.Item>
                <Menu.Item key='6'>option6</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Content style={{ padding: '24px', minHeight: 280 }}>
            {/* Route */}
            <Switch>
              <Route path='/cart' component={Cart}></Route>
              <Route path='/quotation' component={Quotation}></Route>
              <Route path='/collection' component={Collection}></Route>
              <Route path='/product-editor' component={ProductEditor}></Route>
              {/*  */}
              <Route path='/device-select' component={DeviceSelect} />
              <Route path='/form-list' component={FormList} />
            </Switch>
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
}

export default App;

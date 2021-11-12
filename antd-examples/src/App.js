import './App.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Route, Switch, Link, useHistory } from 'react-router-dom';
// import { BrowserRouter as Router } from 'react-router-dom';
import Cart from './quote/Cart'
import Collection from './quote/Collection';
import ProductEditor from './quote/editor';
import DeviceSelect from './olt/device-select/DevcieSelect';
import FormList from './olt/form-list/FormList';
import SearchBox from './components/example/SearchBoxExample';
import BusinessForm from './olt/business/BusinessForm';
import { useEffect, useState } from 'react';
const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;
const routeList = [{
  id: 1,
  path: '/quo',
  name: '报价系统',
  parentId: 0,
}, {
  id: 11,
  parentId: 1,
  path: '/quo/cart',
  name: '购物车'
}, {
  id: 12,
  parentId: 1,
  path: '/quo/quotation',
  name: '报价管理',
}, {
  id: 13,
  parentId: 1,
  path: '/quo/product-editor',
  name: '产品编辑'
}, {
  id: 14,
  parentId: 1,
  path: '/quo/collection',
  name: '我的收藏'
}, {
  id: 2,
  parentId: 0,
  path: '/olt',
  name: 'OLT控制器',
}, {
  id: 21,
  parentId: 2,
  path: '/olt/device-select',
  name: '设备选择'
}, {
  id: 22,
  parentId: 2,
  path: '/olt/form-list',
  name: 'form-list'
}, {
  id: 23,
  parentId: 2,
  path: '/olt/business-form',
  name: '多重表单'
}, {
  id: 3,
  parentId: 0,
  path: '/com',
  name: '组件',
}, {
  id: 31,
  parentId: 3,
  path: '/com/search',
  name: '搜索框'
},];

function Quotation() {
  return 'quotation';
}

// 动态渲染面包屑导航内容
function BreadcrumbNav() {

  const history = useHistory();
  const [breadcrumbList, setBreadcrumbList] = useState([]);

  function getCurrentBreabcrumbList() {
    const breadcrumbListTemp = [];
    const currentPath = history.location.pathname;
    const currentRouteItem = routeList.find(route => route.path === currentPath);
    if (currentRouteItem) {
      let childRouteItem = currentRouteItem;
      let parentRouteItem;
      while (childRouteItem && childRouteItem.id !== 0) {
        breadcrumbListTemp.unshift(childRouteItem);
        parentRouteItem = routeList.find(route => route.id === childRouteItem.parentId);
        childRouteItem = parentRouteItem;
      }
    }
    setBreadcrumbList(breadcrumbListTemp);
  }
  useEffect(() => {
    history.listen(() => {
      getCurrentBreabcrumbList();
    });

  }, [history.location.pathname]);


  return (
    <Breadcrumb style={{ margin: '16px 0' }}>
      {
        breadcrumbList.map(item => (
          <Breadcrumb.Item >{item.name} </Breadcrumb.Item>
        ))
      }
    </Breadcrumb>
  );
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
        <BreadcrumbNav />

        <Layout className='site-layout-background'>
          <Sider className='site-layout-background' width={200}>
            <Menu mode='inline' style={{ height: '100%' }} >
              <SubMenu key='sub1' title='报价系统'>
                <Menu.Item key='/quo/cart'>
                  <Link to='/quo/cart'>
                    购物车
                  </Link>
                </Menu.Item>
                <Menu.Item key='/quo/quotation'>
                  <Link to='/quo/quotation'>
                    报价管理
                  </Link>
                </Menu.Item>
                <Menu.Item key='/quo/product-editor'>
                  <Link to='/quo/product-editor'>
                    产品编辑
                  </Link>
                </Menu.Item>
                <Menu.Item key='/quo/collection'>
                  <Link to='/quo/collection'>
                    我的收藏
                  </Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key='sub2' title='OLT控制器'>
                <Menu.Item key='/device-select'>
                  <Link to='/olt/device-select'>
                    设备选择
                  </Link>
                </Menu.Item>
                <Menu.Item key='/olt/form-list'>
                  <Link to='/olt/form-list'>
                    form list
                  </Link>
                </Menu.Item>
                <Menu.Item key='/olt/business-form'>
                  <Link to='/olt/business-form'>
                    多重表单
                  </Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key='sub3' title='组件' >
                <Menu.Item key=''>
                  <Link to='/com/search'>
                    搜索框
                  </Link>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Content style={{ padding: '24px', minHeight: 280 }}>

            {/* Routes */}
            <Switch>
              <Route path='/quo/cart' component={Cart}></Route>
              <Route path='/quo/quotation' component={Quotation}></Route>
              <Route path='/quo/collection' component={Collection}></Route>
              <Route path='/quo/product-editor' component={ProductEditor}></Route>

              <Route path='/olt/device-select' component={DeviceSelect} />
              <Route path='/olt/form-list' component={FormList} />
              <Route path='/olt/business-form' component={BusinessForm} />

              <Route path='/com/search' component={SearchBox} />
            </Switch>
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
}

export default App;

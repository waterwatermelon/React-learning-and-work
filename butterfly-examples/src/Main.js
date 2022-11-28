import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { Layout, Menu } from 'antd';
import './main.css';

const { Sider, Content } = Layout;
export default function Main() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log('location', location)
  const handleClick = (item) => {
    console.log('click item', item);
    // navigate({ to: item.key });
    navigate(item.key);
  };
  return (
    <Layout className='main-layout'>
      <Sider theme={'light'}>
        <Menu
          selectedKeys={[location.pathname]}
          items={[{
            label: 'simple',
            key: '/main/simple',
          },
          {
            label: 'event',
            key: '/main/event',
          },
          {
            label: 'archor',
            key: '/main/archor',
          },
          {
            label: 'group',
            key: '/main/group',
          },
          {
            label: 'updateCanvas',
            key: '/main/updateCanvas',
          },
          {
            label: 'tooltip',
            key: '/main/tooltip',
          },
          {
            label: 'line-style',
            key: '/main/line-style',
          },
          {
            label: 'tabs',
            key: '/main/tabs',
          },
          {
            label: 'theme',
            key: '/main/theme',
          },
          {
            label: 'topo',
            key: '/main/topo',
          },
          {
            label: 'in modal',
            key: '/main/modal',
          }]}
          onClick={handleClick}
        />
      </Sider>
      <Layout className='main-content'>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>

  )
}

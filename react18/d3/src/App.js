import React from 'react';
import { createBrowserRouter, Outlet, RouterProvider, useNavigate } from 'react-router-dom';
import Base from './Base';
import Topo from './Topo';

function Menu(props) {

  const navigate = useNavigate();
  const itemStyle = {
    border: '1px solid grey',
    display: 'inline',
    padding: '8px 12px',
    cursor: 'pointer',
  };
  const handleClickMenu = (path) => {
    navigate(path);
  };
  return <div>
    <h1>hello d3</h1>
    <ul style={{ marginBottom: '12px' }}>
      <li style={itemStyle} onClick={() => handleClickMenu('/base')}>base</li>
      <li style={itemStyle} onClick={() => handleClickMenu('/topo')} >topo</li>
    </ul>
    {/* {props.children} */}
    <hr />
    <Outlet />
  </div>
}

export default function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Menu />,
      children: [{
        path: '/base',
        element: <Base />,
      },
      {
        path: '/topo',
        element: <Topo />,
      },],
    },

  ]);

  return (
    <>
      <RouterProvider router={router} >
        <Menu />
      </RouterProvider>
    </>
  )
}

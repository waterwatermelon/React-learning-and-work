import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import * as icons from '@ant-design/icons';
import './index.scss';

const { SubMenu } = Menu;


function LeftMenuPanel(props) {
  const COLLAPSED_WIDTH = 80;    // 折叠之后的宽度
  const UNCOLLAPSED_WIDTH = 220; // 未折叠的宽度
  const {
    menus,
    selectedKeys,
    // TODO:控制可折叠
    collapsible = true,
  } = props;
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState([]);
  const [menuNodes, setMenuNodes] = useState([]);
  const [width, setWidth] = useState(UNCOLLAPSED_WIDTH);
  const menuItems = routes => {
    if (routes) {
      return routes.map((item) => {
        const MyIcon = icons[item.icon];
        return (

          <Menu.Item key={item.key} icon={MyIcon && <MyIcon />}>
            <span>{item.title}</span>
          </Menu.Item>);
      });
    }
    return null;
  };

  const handleClickMenuTitle = (title) => {
    props.onMenuTitleClick && props.onMenuTitleClick(title);
  }
  const renderMenus = () => {

    if (!menus || menus.length === 0) {
      return null;
    }
    return menus.map((item) => {
      const MyIcon = icons[item.icon];

      if (!item.children) {
        return (
          <Menu.Item key={item.key} icon={MyIcon && <MyIcon />}>
            <span>{item.title}</span>
          </Menu.Item>);
      }

      const cItem = item?.children?.find(cItem => selectedKeys.indexOf(cItem.key) === 0);

      if (cItem) {
        let selectedKey = []
        selectedKey.push(item.key);
        setOpenKeys(selectedKey);
      }

      return (
        <SubMenu
          key={item.key}
          title={item.title}
          icon={MyIcon && <MyIcon />}
          onTitleClick={handleClickMenuTitle}
        >
          {menuItems(item.children)}
        </SubMenu>);
    });
  };

  useEffect(() => {
    setMenuNodes(renderMenus());
  }, []);

  const openChange = (values) => {
    // 关闭二级目录
    if (values.length === 0) {
      setOpenKeys(values);
      return
    }

    // length===2为点开其中一个,length===1为页面前进后退(未发请求)由其他函数主动传入
    if (values.length > 1) {
      values.splice(0, 1)
      setOpenKeys(values);
    } else {
      setOpenKeys(values);
    }
  }

  const handleClickMenuItem = e => {
    props.onMenuItemClick && props.onMenuItemClick(e);
  };

  const handleOpenMenu = e => {
    openChange(e);
  };

  const handleToggleSiderWidth = () => {
    setWidth(collapsed ? UNCOLLAPSED_WIDTH : COLLAPSED_WIDTH);
    setCollapsed(!collapsed);
  }

  return (
    <div className="left-panel" style={{ width: width }}>
      <Menu
        className="left-panel-menu"
        mode="inline"
        style={{ width }}
        onClick={handleClickMenuItem}
        onOpenChange={handleOpenMenu}
        inlineCollapsed={collapsed}
        defaultOpenKeys={openKeys}
        openKeys={openKeys}
        selectedKeys={selectedKeys}
      >
        {
          menuNodes
        }
      </Menu>
      {
        collapsible &&
        <div className='menu-fold-btn' onClick={handleToggleSiderWidth}>
          {
            collapsed
              ? <icons.DoubleRightOutlined />
              : <icons.DoubleLeftOutlined />
          }
        </div>
      }
    </div>
  );
}

export { LeftMenuPanel };
export default LeftMenuPanel;
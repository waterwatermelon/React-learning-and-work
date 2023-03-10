import React from "react";
import LeftMenuPanel from "../../components/LeftMenuPanel";
import { Layout } from 'antd';
import './two-column-main-layout.scss';

const { Content } = Layout;



/**
 *
 *
 * @export
 * @param {*} props
 * @param {array} props.menus 侧边菜单栏数据
 * @example
 * menus = [{
 *  id: 1,
 *  key: '',
 *  parentId: 0,
 *  title: 'title',
 * }]
 * @param {function} props.onMenuItemClick 
 * @returns
 */
function TwoColumnMainLayout(props) {
  const {
    children,
    style,
    collapsible = true,
    // layoutProps
  } = props;
  return (
    <div className="two-column-main" {...style}  >
      <aside className="main-left">
        <LeftMenuPanel collapsible={collapsible} menus={props.menus} selectedKeys={props.selectedKeys} onMenuItemClick={props.onMenuItemClick} onMenuTitleClick={props.onMenuTitleClick} />
      </aside>
      <Layout className="main-right">
        <Content>
          {children}
        </Content>
      </Layout>
    </div>
  );
}

export { TwoColumnMainLayout };
export default TwoColumnMainLayout;

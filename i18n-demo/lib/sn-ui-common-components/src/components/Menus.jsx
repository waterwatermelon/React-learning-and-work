import React from "react";
import {
  Menu,
  Dropdown
} from "antd";
import { DownOutlined } from '@ant-design/icons';

const {
  Item
} = Menu;


/**
 *
 *
 * @export 渲染下拉式菜单
 * @param {array}    props.schema        定义操作列表的模式
 * @param {string}   props.schema[].text 每个操作项目要显示的名称  
 * @param {any}      props.schema[].key  传给onClick的参数
 * @param {function} props.schema[].onClick 点击操作项目 时触发的回调
 * @param {string}   props.title 
 * @returns
 */
export default function Menus(props) {
  const {
    schema,
    title
  } = props;

  const menu = (
    <Menu>
      {schema.length ? schema.map((value, index) => {
        const {
          id,
          isDanger,
          onClick,
          text,
          key
        } = value;
        return (
          <Item
            id={id}
            danger={!!isDanger}
            key={index}
          >
            <a target="_blank" onClick={() => onClick(key)}>
              {text}
            </a>
          </Item>
        );
      }) : <Item>无</Item>}
    </Menu>
  );

  return (
    <Dropdown
      overlay={menu}
    >
      <a
        onClick={e => e.preventDefault()}
        style={{
          whiteSpace: "nowrap"
        }}
      >
        {title} <DownOutlined />
      </a>
    </Dropdown>
  );
}
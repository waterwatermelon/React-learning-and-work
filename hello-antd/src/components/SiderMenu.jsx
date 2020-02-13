import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const renderMenuItem =
    ({ key, title, icon, link, ...props }) =>
        <Menu.Item
            key={key || link}
            {...props}
        >
            <Link to={link || key} replace>
                {icon && <Icon type={icon} style={{ fontSize: 14 }} />}
                <span className="nav-text" style={{ fontSize: 15 }}>{title}</span>
            </Link>
        </Menu.Item>;

export default ({ menus, ...props }) => <Menu {...props}>
    {
        console.log('menus :', menus)
    }
    {menus && menus.map(item =>
        renderMenuItem(item)
    )}
</Menu>;
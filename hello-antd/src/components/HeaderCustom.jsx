/**
 * Created by hao.cheng on 2017/4/13.
 */
import React, { Component } from 'react';
import { Menu, Icon, Layout, Popover, Modal, Form, Input } from 'antd';
// import {actions as devActions, reducer as dev} from '@/reducers/devManagerReducer'

const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;

class HeaderCustom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            visible: false,
            mvisible: false,
            formLayout: 'horizontal',
            phone: '',
            comment: '',
        };
    }

    render() {
        /* let webAvater = ''
        if(this.props.user && this.props.user.userInfo.avatar !== '') {
            webAvater = this.props.user.userInfo.avatar
        }*/


        const { formLayout } = this.state;
        const formItemLayout = formLayout === 'horizontal' ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
        } : null;

        return (
            <Header style={{ padding: 0, height: 65 }} className="header" >
                <Icon
                    className="trigger custom-trigger"
                    type={'menu-fold'}
                />
                <Menu
                    mode="horizontal"
                    style={{ lineHeight: '64px', float: 'right' }}
                >
                    <Menu.Item key="full" >
                        <Icon type="arrows-alt" />
                    </Menu.Item>

                    {/* <SubMenu title={<span className="avatar"><i className="on bottom b-white" /></span>}>
                            <MenuItemGroup>
                                <Menu.Item key="setting:1">你好 - admin </Menu.Item>
                                <Menu.Item key="modify"><span>修改密码</span></Menu.Item>
                                <Menu.Item key="logout"><span >退出登录</span></Menu.Item>
                            </MenuItemGroup>
                        </SubMenu> */}
                </Menu>
                <style>{`
                    .ant-menu-submenu-horizontal > .ant-menu {
                        width: 120px;
                        left: -40px;
                    }
                `}</style>
            </Header>
        )
    }
}

export default HeaderCustom;

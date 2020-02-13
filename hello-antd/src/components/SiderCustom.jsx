import React, { Component } from 'react';
import { Layout } from 'antd';
import SiderMenu from './SiderMenu'; 
import { menus } from '../constants/menus' 

const { Sider } = Layout;

class SiderCustom extends Component {

    state = {
        collapsed: false,
        mode: 'inline',
        openKey: '',
        selectedKey: '',
        firstHide: true,// 点击收缩菜单，第一次隐藏展开子菜单，openMenu时恢复
        menusNew: menus,
        subMenu: [],
        logopng:'',
        dataSource:[],
    };

    
    componentWillReceiveProps(nextProps) {
    }
    setMenuOpen = props => {
        const { pathname } = props.location;
        this.setState({
            openKey: pathname.substr(0, pathname.lastIndexOf('/')),
        });
    };
    onCollapse = (collapsed) => {
        // console.log(collapsed);
        this.setState({
            collapsed,
            firstHide: collapsed,
            mode: collapsed ? 'vertical' : 'inline',
        });
    };
    // menuClick = e => {
    //     this.setState({
    //         selectedKey: e.key
    //     });
    //     let len = this.state.menusNew.length;
    //     let subMenu = []
    //     let subKey = "";
    //     for(let i = 0; i < len; i++) {
    //         if (this.state.menusNew[i].key === e.key) {
    //             let sub = this.state.menusNew[i].sub;
    //             sub.map(function (item) {
    //                 let param = {};
    //                 param.id = item.id;
    //                 param.key = item.key;
    //                 param.title = item.title;
    //                 param.icon = item.icon;
    //                 param.sub = [];
    //                 subMenu.push(param)
    //             })
    //         }
    //     }
    //     if(subMenu.length != 0) {
    //         subKey = subMenu[0].key
    //     }
    //     this.props.refresh_menu_value(subMenu);
    //     this.props.refresh_child_menu_value(subKey);
        
    //     this.setState({
    //         subMenu: subMenu
    //     })

    //     // console.log(this.state);
    //     const { popoverHide } = this.props; // 响应式布局控制小屏幕点击菜单时隐藏菜单操作
    //     popoverHide && popoverHide();
    // };
    openMenu = v => {
        // console.log(v);
        this.setState({
            openKey: v[v.length - 1],
            firstHide: false,
        })
    };
    render() {
        return (
            <Sider
                trigger={null}
                breakpoint="lg"
                collapsed={this.props.collapsed}
                style={{ overflowY: 'auto' }}
            >
                <div className="logo" style={{ textAlign:"center" }}>
                    <span style={{ fontSize: 18, fontWeight:"bold", color: "#FFF" }}>ICON</span>
                </div>
                <SiderMenu
                    menus={this.state.menusNew}
                    // onClick={this.menuClick}
                    // theme="dark"
                    mode="inline"
                    selectedKeys={[this.state.selectedKey]}
                    openKeys={this.state.firstHide ? null : [this.state.openKey]}
                    onOpenChange={this.openMenu}
                /> 
            </Sider>
        )
    }
}


export default SiderCustom

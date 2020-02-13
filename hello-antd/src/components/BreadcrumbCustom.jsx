/**
 * Created by hao.cheng on 2017/4/22.
 */
import React from 'react';
import { Breadcrumb, Switch, Icon } from 'antd';
import { Link } from 'react-router-dom';

class BreadcrumbCustom extends React.Component {
    state = {

    };

    render() {

        const first = <Breadcrumb.Item>{this.props.first}</Breadcrumb.Item> || '';
        const second = <Breadcrumb.Item>{this.props.second}</Breadcrumb.Item> || '';
        return (
            <span>
                <Breadcrumb style={{ margin: '12px 0' }}>
                    <Breadcrumb.Item><Link replace={Boolean(true)} to={'/app/dashboard'}>首页</Link></Breadcrumb.Item>
                    {first}
                    {second}
                </Breadcrumb>


            </span>
        )
    }
}

export default BreadcrumbCustom;

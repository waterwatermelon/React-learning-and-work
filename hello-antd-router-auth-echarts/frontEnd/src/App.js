import React, { Component } from 'react';
import Movie from './component/Movie';
import DashBoard from './component/DashBoard';
import ComponentOne from './component/ComponentOne';
import ComponentTwo from './component/ComponentTwo';
import { Layout,Button } from 'antd';
import './App.css';
import { NavLink,Route } from 'react-router-dom';
const { Content } = Layout;
class App extends Component {
 
  async componentDidMount() {
    console.log('=========== in App  componentDidMount========');
    console.log('history',this.props.history);
  }
 
  async handleClickLogout() {
    console.log('=========== in [App]  handleClickLogout========');
    console.log('history',this.props.history);
    // const response = await logout;
    // if (response.data.success) {
      sessionStorage.setItem('isLogin',false);
      this.props.history.push('/');
    // } else {

    // }
  }
  render() {
    return (
      <div className="app">
        <Button className='logout-btn' onClick={this.handleClickLogout.bind(this)}>登出系统</Button>
        <div className='nav-bar'>
          <NavLink className='nav-link' to="/app/dashboard">仪表盘</NavLink>
          <NavLink className='nav-link' to="/app/movie">电影列表</NavLink>
          <NavLink className='nav-link' to="/app/componentOne">组件一</NavLink>
          <NavLink className='nav-link' to="/app/componentTwo">组件二</NavLink>
        </div>
        {/* 定义路由 */}
        <Content style={{padding:'20px'}}>

          <div className='content'>
            <Route path='/app/dashboard' component={DashBoard}/>
            <Route path='/app/movie' component={Movie}/>
            <Route path='/app/componentOne' component={ComponentOne}/>
            <Route path='/app/componentTwo' component={ComponentTwo}/>
          </div>
        </Content>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import Movie from './component/Movie';
import ComponentOne from './component/ComponentOne.jsx';
import ComponentTwo from './component/ComponentTwo.jsx';
import { Button } from 'antd';
import './App.css';
import { NavLink,Route } from 'react-router-dom';

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
          <NavLink className='nav-link' to="/app/movie">电影列表</NavLink>
          <NavLink className='nav-link' to="/app/componentOne">组件一</NavLink>
          <NavLink className='nav-link' to="/app/componentTwo">组件二</NavLink>
        </div>
        {/* 定义路由 */}
        <div className='content'>
          <Route path='/app/movie' component={Movie}/>
          <Route path='/app/componentOne' component={ComponentOne}/>
          <Route path='/app/componentTwo' component={ComponentTwo}/>
        </div>
      </div>
    );
  }
}

export default App;

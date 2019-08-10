import React, { Component } from 'react';
import './App.css';
import Toolbar from './Toolbar';
import Title from './Title';
import List from './List';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title:'',
      list:[]
    }
  }
  handleRefresh(data){
    this.setState({
      title:data.title,
      list: data.list
    })
  }  
  handleClear(){
    this.setState({
      title:'',
      list:[]
    })
  }  
  render() {
    return (
      <div className="box"> 
        <Toolbar 
        refresh={this.handleRefresh.bind(this)} 
        clear={this.handleClear.bind(this)}/>
        { this.state.list.length === 0
        ? <div className="none-data">暂无数据</div>
        : <Title title={this.state.title}/> 
        }
        <List list = {this.state.list}/> 
      </div>
    );
  }
}

export default App;

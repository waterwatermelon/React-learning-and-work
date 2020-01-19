import React,{ Component } from 'react';
import {
    Link
} from 'react-router-dom';

// todo:改造成根据props渲染按钮和菜单
class SearchBar extends Component {
  constructor(props){
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }
  handleSearch(){
    // 设置loading
    if(this.props.handleSearch){
      this.props.handleSearch();
    }
  }
  render(){
    return (
        <div style={{ display:'flex'}}>
        <input style={{ flex:'1'}} /> <button style={{ width:'6em'}}onClick={this.handleSearch}>search</button>
      </div>
    );
  }
}

export default SearchBar;

import React, { Component } from 'react';

// todo:改造成根据props渲染按钮和菜单
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }
  handleSearch() {
    // 设置loading
    if (this.props.handleSearch) {
      this.props.handleSearch();
    }
  }
  render() {
    return (
      <div style={{ display: 'flex', padding: '8px 12px' }}>
        <input style={{ flex: '1' }} /> <button style={{ width: '6em' }} onClick={this.handleSearch}>search</button>
      </div>
    );
  }
}

export default SearchBar;

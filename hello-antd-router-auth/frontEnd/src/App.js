import React, { Component } from 'react';
import Toolbar from './Toolbar';
import Title from './Title';
import List from './List';
import MovieForm from './MovieForm';
import { Modal, Pagination, Button } from 'antd';
import './App.css';
import getResponse from './api/api'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      keyWord: '',
      page: 1,
      size: 10,
      total: 0,
      modalVisble: false
    }
  }
  async componentDidMount() {
    console.log('=========== in App  componentDidMount========');
    console.log('history',this.props.history);
    let { keyWord, page, size } = this.state;
    let response = await getResponse('/api/searchMovie', { keyWord, page, size });
    let res = response.data;
    if (res.success) {
      this.setState({
        list: res.data.list,
        total: res.data.total
      })
    }
  }
  async handleClickLogout() {
    console.log('=========== in [App]  handleClickLogout========');
    console.log('history',this.props.history);
    const response = await getResponse('/api/logout');
    if (response.data.success) {
      sessionStorage.setItem('isLogin',false);
      this.props.history.push('/');
    } else {

    }
  }
  async handleClickSearch(keyWord) {
    let { page, size } = this.state;
    let response = await getResponse('/api/searchMovie', { keyWord, page, size });
    let res = response.data;
    if (res.success) {
      this.setState({
        list: res.data.list,
        total: res.data.total
      })
    }
  }
  async handleClear() {

    let response = await getResponse('/api/searchMovie',
      { keyWord: '', page: 1, size: this.state.size });
    let res = response.data;
    if (res.success) {
      this.setState({
        list: res.data.list,
        total: res.data.total
      })
    }
    this.setState({
      list: res.data.list,
      total: res.data.total,
      page: 1
    })
  }
  handleAdd = () => {
    this.setState({
      modalVisble: true,
    });
  }
  // page 当前页面
  // pageSize 每页条数
  async handlePageChange(page, pageSize) {
    let { keyWord } = this.state;
    let response = await getResponse('/api/searchMovie', { keyWord, page, size: pageSize });
    console.log('list', response.data.data);
    let res = response.data;
    if (res.success) {
      this.setState({
        list: res.data.list,
        total: res.data.total,
      })
    }
  }
  handleModalCancel(){
    this.setState({
      modalVisble:false
    })
  }
  async insertMovie(err,values){
    console.log('values',values);
    if(!err){
      let response = await getResponse('/api/insertMovie',values);
      let res = response.data;
      if(res.success){
        this.setState({
          modalVisble:false
        });
        
      }else{

      }
    }
  }
  handleModalOk(){
    // 拿到modal中的form
    let form = this.refs.MovieForm;
    form.validateFields(this.insertMovie.bind(this));
  }
  render() {
    return (
      <div className="box">
        <Button className='logout-btn' onClick={this.handleClickLogout.bind(this)}>登出系统</Button>
        <Title title={'电影清单'} />
        <Toolbar
          search={this.handleClickSearch.bind(this)}
          clear={this.handleClear.bind(this)}
          add={this.handleAdd.bind(this)}
        />
        <List
          list={this.state.list}
          keyWord={this.state.keyWord}
          page={this.state.page}
          size={this.state.size} />
        <Pagination
          defaultCurrent={this.state.page}
          total={this.state.total}
          onChange={this.handlePageChange.bind(this)} />
        <Modal
          title='电影'
          visible={this.state.modalVisble}
          onCancel={this.handleModalCancel.bind(this)}
          onOk={this.handleModalOk.bind(this)}
        >
          <MovieForm ref='MovieForm'/>
        </Modal>
      </div>
    );
  }
}

export default App;

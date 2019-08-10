import React,{Component} from 'react';
import axios from 'axios';
import {Input,Button} from 'antd';
import './Toolbar.css';

class Search extends Component{
    constructor(props) {
        super(props);
        this.state = {
            key:''
        }
    }
    handleKeyChange=(e)=>{
        let key = e.target.value;
        this.setState({
            key:key
        });
    }
    handleSearch=()=>{
        console.log('click search button');
        console.log('key = ',this.state.key);
        let key = this.state.key;
        if(this.props.search){
            this.props.search(key);
        }
    }
    handleClear=()=>{
        if(this.props.clear){
            this.props.clear();
        }
        this.setState({
            key:''
        })
    }
    handleAdd=()=>{
        if(this.props.add){
            this.props.add();
        }
    }
    render(){
        return(
            <div className="search-box">
                <input  value={this.state.key}onChange={this.handleKeyChange} className="search-input" type="text" placeholder="请输入关键字"/>
                <Button type='primary' className="search-btn"  onClick={this.handleSearch}>搜索</Button>
                <Button className="clear-btn" onClick={this.handleClear} >清空</Button>
                <Button type='primary' className="add-btn" onClick={this.handleAdd} >添加</Button>
            </div>
        )
    }
}
export default Search;
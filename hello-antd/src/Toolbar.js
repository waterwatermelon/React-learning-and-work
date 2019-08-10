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
        let baseUrl = 'https://www.easy-mock.com/mock/5c9b89e9654f582502058b09/example';
        let url = '';

        switch (key) {
            case '导演':
                url = baseUrl + '/director';
                break;
            case '演员':
                url = baseUrl + '/actor';
                break;
            default:
                url = baseUrl + '/movie';
                break;
        }
        // 更换为数据层的行为？
        axios.get(url)
        .then((res)=>{
            let data = res.data.content;
            console.log(data);
            if(this.props.refresh){
                this.props.refresh(data);
            }
        })
        .catch((err)=>{
            console.error(err);
        }); 
    }
    handleClear=()=>{
        if(this.props.clear){
            this.props.clear();
        }
    }
    handleAdd=()=>{
        if(this.props.add){
            this.props.add();
        }
    }
    render(){
        return(
            <div className="search-box">
                <input onChange={this.handleKeyChange} className="search-input" type="text" placeholder="请输入关键字"/>
                <Button type='primary' className="search-btn"  onClick={this.handleSearch}>搜索</Button>
                <Button className="clear-btn" onClick={this.handleClear} >清空</Button>
                <Button type='primary' className="add-btn" onClick={this.handleAdd} >添加</Button>
            </div>
        )
    }
}
export default Search;
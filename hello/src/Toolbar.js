import React,{Component} from 'react';
import axios from 'axios';

class Search extends Component{
    constructor(props) {
        super(props);
        this.state = {
            key:''
        }
    }
    handleKeyChange(e){
        let key = e.target.value;
        this.setState({
            key:key
        });
    }
    handleSearch(){
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
    handleClear(){
        if(this.props.clear){
            this.props.clear();
        }
    }
    render(){
        return(
            <div className="search-box">
                <input onChange={this.handleKeyChange.bind(this)} className="search-input" type="text" placeholder="请输入关键字"/>
                <button className="search-btn"onClick={this.handleSearch.bind(this)} >搜索</button>
                <button className="clear-btn"onClick={this.handleClear.bind(this)} >清空</button>
            </div>
        )
    }
}
export default Search;
import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import MovieForm from './MovieForm';
import './Item.css';
import getResponse from './api/api';
import { format } from 'url';
class Item extends Component {
    state={
        modalVisble:false
    }
    handleClickEdit=()=>{
        this.setState({
            modalVisble:true
        })
    }
    handleModalCancel(){
        this.setState({
            modalVisble:false
        })
    }
    async updateMovieCallback(err,values){
        let id = this.props.data.id;
        if(!err){
            let response = await getResponse('/api/updateMovie', {...values,id});
            let res = response.data;
            if (res.success) {
                this.setState({
                    modalVisble:false
                })
                alert('更新成功');
            }
        }
    }
    handleModalOk=async()=>{
        let form = this.refs.MovieForm;
        form.validateFields(this.updateMovieCallback.bind(this));
    }
    handleDelete = async () => {
        let id = this.props.data.id;
        console.log(id)
        let response = await getResponse('/api/deleteMovie', { id });
        let res = response.data;
        if (res.success) {
            alert('删除成功')
        }
    }
    render() {
        const data = this.props.data;
        return (
            <div className="item">
                <div className="dp item-l">
                    <img className="item-img" src={data.img} alt="" />
                </div>
                <div className="dp item-r">
                    <p className="item-name">{data.title}</p>
                    <p>
                        导演: {data.director} | 上映年份：{data.year}
                    </p>
                    <p className="item-rate">评分：{data.rate}</p>
                    <p className="item-info">{data.quote}</p>
                </div>
                <Button onClick={this.handleClickEdit}>编辑</Button>
                <div className='item-del' onClick={this.handleDelete}>X</div>
                <Modal
                    title='电影'
                    visible={this.state.modalVisble}
                    onCancel={this.handleModalCancel.bind(this)}
                    onOk={this.handleModalOk.bind(this)}
                >
                    <MovieForm ref='MovieForm' movie={data} />
                </Modal>
            </div>
        )
    }
}

export default Item;
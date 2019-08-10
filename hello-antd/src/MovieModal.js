import React,{Component} from 'react';
import {Modal} from 'antd';
import MovieForm from './MovieForm';
class MovieModel extends Component{

    render(){
        return(
            <Modal 
            visible={false}
            title={this.props.title}
            onCancel={this.handleCancel}
            onOk={this.props.onOk}
            >
                <MovieForm 
                // model={this.props.movie}
                >
                </MovieForm>
            </Modal>
        );
    }
}
export default MovieModel; 
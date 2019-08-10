import React, { Component } from 'react';
import { Form, Input, Select,Rate } from 'antd';
const { Option } = Select;

class MovieForm extends Component {
    state = {
        rate:0
    }
    componentDidMount(){
        let movie = this.props.movie;
        let form = this.props.form;
        if(movie){
            form.setFieldsValue(movie);
        }
    }
    handleRateChange=(value)=>{
        this.setState({
            rate:value
        })
    }
    genYearlist(){
        let i,n= 20,date = new Date(),year= date.getFullYear(),arr=[];
        for(i=0;i<n;i++){
            arr[i]= year-i;
        }
        return arr.map((item,idx)=>{
            return <Option value={item} key={idx}>{item}</Option>
        })
    }
    render() {
        const FormItem = Form.Item;
        const formItemLayout = {
            labelCol: {
                xs: 24,
                sm: 6
            },
            wrapperCol: {
                xs: 24,
                sm: 18
            }
        }
        const { getFieldDecorator } = this.props.form;
        const { TextArea } = Input;
        return (
            <Form {...formItemLayout}>
                <FormItem label='电影名称'>
                    {
                        getFieldDecorator('title', {
                            rules: [{
                                required: true,
                                message: '请输入电影名称'
                            }]
                        })(<Input />)
                    }
                </FormItem>
                <FormItem label='电影导演'>
                    {
                        getFieldDecorator('director', {
                            rules: [{
                                required: true,
                                message: '请输入电影导演'
                            }]
                        })(<Input />)
                    }
                </FormItem>
                <FormItem label='电影评分'>
                    {
                        getFieldDecorator('rate', {
                            rules: [{
                                required: true,
                                message: '请输入电影评分'
                            }]
                        })(<Rate allowHalf onChange={this.handleRateChange}  count={10}/>)
                    }<span className='ant-rate-text'>{this.state.rate}</span>
                </FormItem>
                <FormItem label='电影年份'>
                    {
                        getFieldDecorator('year', {
                            rules: [{
                                required: true,
                                message: '请输入电影年份'
                            }]
                        })(<Select>
                            {this.genYearlist()}
                        </Select>)
                    }
                </FormItem>
                <FormItem label='电影简介'>
                    {
                        getFieldDecorator('quote', {
                            rules: [{
                                required: true,
                                message: '请输入电影简介'
                            }]
                        })(<TextArea autosize={false} style={{ resize: "none" }} />)
                    }
                </FormItem>
            </Form>
        );
    }
}
 
MovieForm = Form.create({})(MovieForm);
export default MovieForm; 
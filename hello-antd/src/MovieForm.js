import React,{Component} from 'react';
import {Form,Input} from 'antd'; 
class MovieForm extends Component{

    render(){
        const FormItem = Form.Item;
        const formItemLayout = {
            labelCol:{
                xs:24,
                sm:6
            },
            wrapperCol:{
                xs:24,
                sm:18
            }
        }
        const {getFieldDecorator} = this.props.form;
        return(
            <Form {...formItemLayout}>
                <FormItem label='电影名称'>
                    {
                        getFieldDecorator('name',{
                            rules:[{
                                required:true,
                                message:'请输入电影名称'
                            }]
                        })(<Input/>)
                    }
                </FormItem>
            </Form>
        );
    }
}
MovieForm = Form.create({})(MovieForm);
export default MovieForm; 
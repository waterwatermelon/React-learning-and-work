import React,{Component} from 'react';
import {Form,Input,Button} from 'antd';
import './Login.css';
class Login extends Component{


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
        return (
            <Form {...formItemLayout} className='login-form'>
                <FormItem label='登录账号'>
                    <Input />
                </FormItem>
                <FormItem label='密码'>
                    <Input />
                </FormItem>
                {/* <FormItem> */}
                   <Button type='primary' className='login-btn'>登录</Button>
                {/* </FormItem> */}
            </Form>
        );
    }
}
export default Login;
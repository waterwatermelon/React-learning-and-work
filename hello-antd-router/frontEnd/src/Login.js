import React,{Component} from 'react';
import {Form,Input,Button} from 'antd';
import './Login.css';
import axios from 'axios'; 
import getResponse from './api/api';
class Login extends Component{
       
    constructor(props){ 
        super(props);
    }
    componentDidMount(){
        // ? 从url中获取参数,失败
        // <Route  path="/login/:name" component={Login}/>
        // let params = this.props.params;
        // console.log('params',params); 

    }
    async handleClick(){
        // 登录校验 
        // err 错误
        // values 表单域的值
        async function validateFunction(err,values){
            if(!err){
                console.log('values =',values);
                let response = await getResponse('/api/login',values); 
                console.log('response =',response);
                if(response.data.success){
                    this.props.history.push('/index');
                }    
            }else{
                console.log('err =',err); 
            }
        }
        this.props.form.validateFields(validateFunction.bind(this));
        
    }
    render(){
        const FormItem = Form.Item;
        // 用于对表单数据进行双向绑定
        const {getFieldDecorator} = this.props.form;
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
                    {
                        getFieldDecorator('account',{
                            rules:[{
                                required:true,
                                message:'请填写账号'
                            }]
                        })(<Input/>)
                    }
                    
                </FormItem>
                <FormItem label='密码'>
                    {
                        getFieldDecorator('password',{
                            rules:[{
                                required:true,
                                message:'请填写密码'
                            }]
                        })(<Input type='password'/>)
                    }
                </FormItem>
                <Button type='primary' className='login-btn' onClick={this.handleClick.bind(this)}>登录</Button>
            </Form>
        );
    }
}
Login = Form.create({
    onValuesChange:(props,changedValues,allValues)=>{
        console.log('field value change');
        console.log('props',props);
        console.log('changedValues',changedValues);
        console.log('allValues',allValues);
    }
})(Login);
export default Login;
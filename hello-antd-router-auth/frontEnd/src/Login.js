import React,{Component} from 'react';
import {Form,Input,Button} from 'antd';
import './Login.css';
class Login extends Component{
       
    constructor(props){ 
        super(props);
    }
    async handleClick(){
        // 登录校验 
        // err 错误
        // values 表单域的值
        async function validateFunction(err,values){
            if(!err){
                console.log('values =',values);
                if(values.account === 'admin'&& values.password!=='') {
                    sessionStorage.setItem('isLogin',true);
                    this.props.history.push('/app');
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
                            initialValue:'admin',
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
                            initialValue:'admin',
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
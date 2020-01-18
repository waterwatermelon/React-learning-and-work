import React,{Component} from 'react';

class Login extends Component{
    constructor(){
        super();
        this.state = {}
    }
    submitHandle = () => {
        console.log('this.props :', this.props);
        sessionStorage.setItem("isLogin",true);
        this.props.history.push('/user/main');
    }
    render(){
        return (
            <div>
                登录界面
                <form onSubmit={this.submitHandle}>
                    <p>账号：<input/></p>
                    <p>密码：<input type="password"/></p>
                    <button>登录</button>
                </form>
            </div>
        );
    }
}

export default Login;
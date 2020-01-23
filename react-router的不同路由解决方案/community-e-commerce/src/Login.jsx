import React, { Component } from 'react';
import './style/style.css'
class Login extends Component {
    constructor() {
        super();
        this.state = {}
    }
    submitHandle = () => {
        console.log('this.props :', this.props);
        sessionStorage.setItem("isLogin", true);
        this.props.history.push('/user/main');
    }
    render() {
        return (
            <div>
                <div className="lg-container">
                    <div className="lg-title">登录</div>
                    <div className="lg-box">
                        <form onSubmit={this.submitHandle}>
                            <div className="lg-row">
                                <span className="lg-label">账号</span>
                                <input type="text" className="lg-input" placeholder="请填写账户" />
                            </div>
                            <div className="lg-row">
                                <span className="lg-label">密码</span>
                                <input type="password" className="lg-input" placeholder="请填写密码" />
                            </div>
                            <div className="lg-ft">
                                <button className="btn-block btn-lg">登录</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
                    );
                }
            }
            
export default Login;
import React,{Component} from 'react';
import { Route,Redirect } from 'react-router-dom';
class AuthRoute extends Component{

    render(){
        const { component:Component } = this.props;
        console.log('this.props :', this.props);
        return (
            <Route render={(p) => {
                const isLogin = sessionStorage.getItem("isLogin");
                if (isLogin) {
                    return <Component />
                } else {
                    console.log('未登录访问');
                    return <Redirect to='/login'/>
                }
            }}/>
        );
    }
}

export default AuthRoute;
import React,{Component} from 'react';
import { Route,Redirect } from 'react-router-dom';
class AuthRoute extends Component{

    render(){
        const { component:Component } = this.props;
        return (
            <Route render={(p) => {
                const isLogin = sessionStorage.getItem("isLogin");
                if (isLogin) {
                    return <Component />
                } else {
                    return <Redirect to='/login'/>
                }
            }}/>
        );
    }
}

export default AuthRoute;
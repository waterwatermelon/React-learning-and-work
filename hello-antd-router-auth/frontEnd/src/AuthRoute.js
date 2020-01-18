import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Route, Redirect } from 'react-router-dom'

class AuthRoute extends Component {
    render() {  
        const { component: Component, ...rest } = this.props
        const isLogin = sessionStorage.getItem("isLogin")==='true' ? true:false;
        console.log('isLogin = ',isLogin);
        return (
            <Route {...rest} render={props => {
              return  isLogin
                  ? <Component {...props} />
                  : <Redirect to="/login" />
            }} />
        )
      }
}
// withRouter 的作用
export default withRouter(AuthRoute); 
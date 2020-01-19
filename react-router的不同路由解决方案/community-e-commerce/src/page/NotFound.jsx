import React,{Component} from 'react';
import { Link } from 'react-router-dom';
class NotFound extends Component{

    render(){
        return (
            <div>
                sorroy! we can't find the page.will return to this 
                <Link to="/user/main">
                    first page 
                </Link>
            </div>
        );
    }
}

export default NotFound;
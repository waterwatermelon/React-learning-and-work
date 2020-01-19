import React,{Component} from 'react';
import { Link } from 'react-router-dom';
class Address extends Component{
    render(){
        return (
            <div>
                address list 
                <ul>
                    <li>
                        <Link to="/user/address/detail">
                            地址1
                        </Link>  
                    </li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                </ul>
            </div>
        );
    }
}

export default Address;
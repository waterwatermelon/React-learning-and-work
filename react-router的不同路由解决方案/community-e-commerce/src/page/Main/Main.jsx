import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../layout/MainLayout.jsx';
import SearchBar from '../../public/SearchBar.jsx';
class Main extends Component{

    render(){
        return (
            <MainLayout>
                <SearchBar/>
                <div>
                    <ul>
                        <li>
                            <Link to={"/user/product/detail/1?productId=2"}>
                                大头鱼
                            </Link>
                        </li>
                    </ul>
                </div>
            </MainLayout>
        );
    }
}

export default Main;
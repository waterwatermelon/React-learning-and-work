import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../layout/MainLayout.jsx';
import SearchBar from '../../public/SearchBar.jsx';

/**
 * 首页
 * @class Main
 * @extends {Component}
 */
class Main extends Component {

    render() {
        return (
            <MainLayout>
                <SearchBar />
                {/* ProductList */}
                <div>
                    <ul style={{ listStyle: 'none' }}>
                        <Link to={"/user/product/detail/1?productId=2"}>
                            <li style={{ background: '#fff', borderRadius: '.25rem', padding: '.25rem' }}>
                                <div style={{ display: 'flex' }}>

                                    <img style={{ width: '2rem', height: '2rem', border: '1px solid grey', background: 'salmon' }} />
                                    大头鱼

                                </div>

                            </li>
                        </Link>
                    </ul>
                </div>
            </MainLayout>
        );
    }
}

export default Main;
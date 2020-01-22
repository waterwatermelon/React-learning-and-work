import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style/empty.css';
class Empty extends Component {
    state = {}
    render() {
        return (
            <section className="empty-box">
                <div className="empty-content">
                    <p className="empty-text">
                        404 <br />
                        未找到该页面
                </p>
                    <span className="empty-circle-small"></span>
                    <span className="empty-circle-med"></span>
                    <span className="empty-circle-big"></span>
                </div>
                <div className="empty-footer">
                    <a href="/user/main">
                        返回首页
                    </a>
                </div>
            </section>);
    }
}

export default Empty;
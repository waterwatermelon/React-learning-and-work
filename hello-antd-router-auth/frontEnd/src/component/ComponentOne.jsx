import React, { Component } from 'react';
import ComponentTwo from './ComponentTwo.jsx';
class componentOne extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            data: '',
        }
    }
    handleChange(e) {
        const { value } = e.target;
        console.log('value :', value);
        this.setState({ data: value });
    }
    render() {
        return (
            <div>
                <h1>Component One</h1>
                <input value={this.state.data} onChange={this.handleChange} />
                <br/>
                <ComponentTwo />
            </div>
        )
    }
}

export default componentOne;
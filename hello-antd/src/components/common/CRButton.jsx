import React, { Component } from 'react';
import { Form, Button } from 'antd';
import { isNullOrUndefined } from '@/utils/util'



class CRButton extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    rendCreateButton = () => {
        if (!isNullOrUndefined(this.props.CButton)) {
            return (
            <Button style={{ display: isNullOrUndefined(this.props.CButton) ? 'none' : '' }}
                icon={isNullOrUndefined(this.props.CButton.icon) ? "plus" : this.props.CButton.icon}
                type={isNullOrUndefined(this.props.CButton.type) ? "primary" : this.props.CButton.type}
                onClick={this.props.CButton.callback}
            >
                {this.props.CButton.name}
            </Button>
            )
        }
    }

    rendReadButton = () => {
        if (!isNullOrUndefined(this.props.RButton)) {
            return (
            <Button style={{ marginLeft: '15px', display: isNullOrUndefined(this.props.RButton) ? 'none' : '' }}
                icon={isNullOrUndefined(this.props.RButton.icon) ? "search" : this.props.RButton.icon}
                type={isNullOrUndefined(this.props.RButton.type) ? "primary" : this.props.RButton.type}
                onClick={this.props.RButton.callback}
            >
                {this.props.RButton.name}
            </Button>
            )
        }
    }    

    render() {
        return (
            <Form layout="inline" style={{ marginBottom: 15, marginTop: 15 }}>
                {this.rendCreateButton()}
                {this.rendReadButton()}
            </Form>
        )
    }
}

export default CRButton;
import React, { Component } from 'react';
import { Modal } from 'antd';
import { changeModal } from '@/utils/pageutil'
import { isNullOrUndefined } from '@/utils/util'

class DModal extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    getPageNum = (delNum) => {
        let that = this.props.te;
        let num = that.state.displaypage;
        if (that.state.displaypage !== 1) {
            const yu = (that.state.total) % (that.state.displaypagesize)
            console.log('page yu is ', yu);
            if (yu === delNum) {
                num = that.state.displaypage - 1
            }
        }
        console.log('page num is ', num);
        return num;
    }    

    DSubmit = () => {
        let that = this.props.te;
        let params = {};
        let visiblestr = this.props.visiblestr;
        params.id = that.state.curid;
        let dthis = this;
    }

    render() {
        return (
            <Modal
                title={isNullOrUndefined(this.props.title) ? '删除' : this.props.title}
                visible={this.props.visible}
                onOk={this.DSubmit}
                onCancel={() => changeModal(this.props.te, this.props.visiblestr, false)}
                destroyOnClose={Boolean(true)}
                okText="确定"
                cancelText="取消"
            >
                <p>确定要删除 {this.props.te.state[this.props.delname]} ？</p>
            </Modal>
        )
    }
}

export default DModal;
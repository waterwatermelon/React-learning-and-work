import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';
import { changeModal, inputHandle } from '@/utils/pageutil'
import { showMessage } from '../util/NoticeMessage';

const FormItem = Form.Item;

class CUModal extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    renderFormItem = () => {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 12 },
        };
        return this.props.cumodalitem.map((element, index) =>
            <FormItem
                key={index}
                label={element.label}
                {...formItemLayout}
            >
                <Input value={this.props.te.state[element.name]} name={element.name} onChange={(event) => inputHandle(event, this.props.te)} />
            </FormItem>
        );
    }

    CUSubmit = () => {
        let that = this.props.te;
        let params = {};
        let errmsg = this.props.checkSubmit();
        let visiblestr = this.props.visiblestr;
        if (errmsg !== '') {
            showMessage("warn", errmsg, "");
            return;
        }

        for (let i = 0; i < this.props.cumodalitem.length; i++) {
            params[this.props.cumodalitem[i].name] = this.props.te.state[this.props.cumodalitem[i].name]
        }

        let url = '';
        let msgTip = '';
        if (this.props.cutype === 'create') {
            url = this.props.createUrl;
            msgTip = '添加成功';
        } else {
            url = this.props.updateUrl
            params.id = that.state.curid;
            msgTip = '修改成功';
        }
       
    }

    render() {
        return (
            <Modal
                title={this.props.title}
                visible={this.props.visible}
                onOk={this.CUSubmit}
                onCancel={() => changeModal(this.props.te, this.props.visiblestr, false)}
                destroyOnClose={Boolean(true)}
                okText="确定"
                cancelText="取消"
            >
                {this.renderFormItem()}
            </Modal>
        )
    }
}

export default CUModal;
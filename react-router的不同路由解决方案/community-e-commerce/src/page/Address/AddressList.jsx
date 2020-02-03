import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAddressListAsync } from '../../redux/actions';
import '../../style/style.css';

/**
 * 地址列表
 * @class Address
 * @extends {Component}
 */
class Address extends Component {
    constructor() {
        super();
    }
    componentDidMount() {
        this.props.getAddressList().then(res => {
            console.log('res :', res);
        });
    }
    renderAddressList() {
        const { list } = this.props;
        if (list.length === 0) {
            return <div>暂无数据</div>
        }
        return list.map(address => {
            return (
                <div key={address.id} class="add">
                    <div class="add-hd">
                        <span class="add-c-name">{address.community}</span>
                        <span class="fr add-ops">
                            <span class="add-op add-ed">编辑</span>
                            <span class="add-op add-del">删除</span>
                        </span>
                    </div>
                    <div class="add-bd">
                        <div class="add-row">
                            <span class="add-re">{address.receiver}</span>
                            <span class="fr add-phone">{address.phone}</span>
                        </div>
                        <p class="add-detail">{address.detail}</p>
                        <div class="add-ft-ops">
                            <div class="add-ft-op">
                                <p class="r-ctn">
                                    <input checked={address.isDefault} class="r-input" type="checkbox" name="" />
                                    <label class="r-label"> </label>
                                </p>
                                <span class="add-r-op-text">默认地址</span>
                            </div>
                            <div class="add-ft-op">
                                <p class="r-ctn">
                                    <input checked={address.isSelf} class="r-input" type="checkbox" name="" />
                                    <label class="r-label"></label>
                                </p>
                                <span class="add-r-op-text">是否本人</span>
                            </div>
                        </div>
                    </div>
                </div>

            );
        });
    }
    render() {
        return (
            <div>
                <div class="adds">
                    {this.renderAddressList()}
                </div>
                <div class="al-ft">
                    <button class="btn btn-block btn-address"><a href="/user/address/detail" javascript=";">添加新地址</a></button>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        list: state.address.list,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getAddressList:() => dispatch(getAddressListAsync())
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Address);
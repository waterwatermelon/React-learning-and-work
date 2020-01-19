import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../style/style.css';
class Address extends Component {
    constructor() {
        super();
        this.state = {
            addressList: [{
                id: 1,
                community: "里仁社区",
                name: "苏三",
                telephone: "132xxxx2222",
                detail: "福建省泉州市石狮市风里街道里仁社区134号",
                isDefault: true,
                isSelf: true,
            }],
        }
    }
    render() {
        return (
            <div>
                <div class="adds">
                    <div class="add">
                        <div class="add-hd">
                            <span class="add-c-name">仁里社区</span>
                            <span class="fr add-ops">
                                <span class="add-op add-ed">编辑</span>
                                <span class="add-op add-del">删除</span>
                            </span>
                        </div>
                        <div class="add-bd">
                            <div class="add-row">
                                <span class="add-re">郭建宁</span>
                                <span class="fr add-phone">13235000200</span>
                            </div>
                            <p class="add-detail">福建省 泉州市 石狮市 风里街道仁里社区 134号</p>
                            <div class="add-ft-ops">
                                <div class="add-ft-op">
                                    <p class="r-ctn">
                                        <input class="r-input" type="checkbox" name="" />
                                        <label class="r-label"> </label>
                                    </p>
                                    <span class="add-r-op-text">默认地址</span>
                                </div>
                                <div class="add-ft-op">
                                    <p class="r-ctn">
                                        <input class="r-input" type="checkbox" name="" />
                                        <label class="r-label"></label>
                                    </p>
                                    <span class="add-r-op-text">是否本人</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="al-ft">
                    <button class="btn btn-block btn-address">添加新地址</button>
                </div>
            </div>
        );
    }
}

export default Address;
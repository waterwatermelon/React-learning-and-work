import React, { Component } from 'react';
import { Layout, Form, Tabs, Select, List, Input, DatePicker, Button, Icon, Divider, Modal, Switch, Upload, TreeSelect } from 'antd';
import ComTable from '../../components/common/ComTable'
import CUModal from '../../components/common/CUModal'
import DModal from '../../components/common/DModal'
import { indexContent, handleTableChange } from '../../utils/pageutil'
import { inputHandle, changeModal } from '@/utils/pageutil'
import { showMessage } from '../../components/util/NoticeMessage';
import { Cascader } from 'antd';

const { Content } = Layout;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
const { ListItem } = List.Item;
class GroupList extends Component {

    constructor(props) {
        super(props);
        this.columns = [{
            title: '序号',
            dataIndex: 'id',
            width: '6%',
            render: (value, row, index) => indexContent(index),
        }, {
            title: '用户组',
            dataIndex: 'name',
            width: '27%',
        }, {
            title: '描述',
            dataIndex: 'remark',
            width: '27%',
        }, {
            title: '操作',
            dataIndex: 'operation',
            width: '40%',
            render: this.renderOp,
        }]

        this.pricolumns = [{
            title: '权限名称',
            dataIndex: 'name',
            align: 'center'
        }]

        this.state = {
            dataSource: [{
                id: 1, name: 'admin', remark: 'remark'
            }, {
                id: 2, name: '省军区用户组', remark: 'remark'
            }, {
                id: 3, name: '军分区用户组', remark: 'remark'
            }],
            total: 10,
            displaypagesize: 5,
            displaypage: 1,
            operGid: -1,
            searchName: '',
            cuvisible: false,
            dvisible: false,
            privisible: false,
            cutitle: '',
            cutype: 'create',
            curid: -1,
            name: '',
            remark: '',
            cumodalitem: [{
                label: '用户组名称',
                name: 'name'
            }, {
                label: '用户组描述',
                name: 'remark'
            }],
            pripage: 1,
            pritotal: 7,
            priSource:
                [{
                    id: 1, name: '用户管理',
                }, {
                    id: 2, name: '用户组管理',
                }, {
                    id: 3, name: '参数配置',
                }, {
                    id: 4, name: '区域配置',
                }, {
                    id: 5, name: '系统备份',
                }, {
                    id: 6, name: '系统授权',
                }, {
                    id: 7, name: '组织架构',
                }],
            privilegeList: [],
            casOptions: [
                {
                    "value": 110000,
                    "label": "北京",
                    isLeaf: false
                }, {
                    "value": 110001,
                    "label": "北京",
                    isLeaf: false
                }, {
                    "value": 110002,
                    "label": "北京",
                    isLeaf: false
                }, {
                    "value": 110003,
                    "label": "北京",
                    isLeaf: false
                }, {
                    "value": 110004,
                    "label": "北京",
                    isLeaf: false
                }, {
                    "value": 110005,
                    "label": "北京",
                    isLeaf: false
                }, {
                    "value": 110006,
                    "label": "北京",
                    isLeaf: false
                }],
            areaList: [
                {
                    "id": 110000,
                    "title": "北京",
                    isLeaf: false
                }, {
                    "id": 110100,
                    "title": "北京市",
                    pId: 110000,
                    isLeaf: false
                }, {
                    "id": 110101,
                    pId: 110100,
                    "title": "朝阳区",
                    isLeaf: true
                }, {
                    "id": 350000,
                    "title": "福建",
                    isLeaf: false
                }, {
                    "id": 350100,
                    "title": "福州市",
                    pId: 350000,
                    isLeaf: false
                }, {
                    "id": 350101,
                    pId: 350100,
                    "title": "鼓楼区",
                    isLeaf: true
                }],
            listData: [
                {
                    title: 'Ant Design Title 1',
                },
                {
                    title: 'Ant Design Title 2',
                },
                {
                    title: 'Ant Design Title 3',
                },
                {
                    title: 'Ant Design Title 4',
                },
            ],
        };
    }

    componentDidMount() {
        // this.setState({
        //     operGid: this.props.user.userInfo.groupId
        // }, handleTableChange(this, 1, 10, this.refreshTable));
    }

    add = () => {
        this.setState({
            cuvisible: true,
            cutitle: '添加用户组',
            cutype: 'create',
            curid: -1,
            name: '',
            remark: '',
        })
    }

    delete = (row) => {
        this.setState({
            dvisible: true,
            curid: row.id,
            name: row.name,
        })
    }

    edit = (row) => {
        this.setState({
            cuvisible: true,
            cutitle: '编辑用户组',
            cutype: 'update',
            name: row.name,
            remark: row.remark,
            curid: row.id,
        })
    }

    pri = (row) => {
        let that = this
        that.setState({
            privisible: true,
            // curid: row.id,
            // name: row.name,
            // remark: row.remark,
            // pripage: 1,
            // priSource: [],
            // privilegeList: row.privilegeList === undefined || row.privilegeList === null ? [] : row.privilegeList,
        }, that.refreshPriTable);
    }

    logout = () => {
        this.props.user.isLogin = false;
        this.props.user_logout(this.props.user.userInfo.id);
        showMessage("warn", "用户组权限变更,请重新登录", "");

    }

    priSubmit = () => {
        let that = this;
        let params = {};
        params.id = that.state.curid;
        params.privilegeList = that.state.privilegeList;

    }

    checkSubmit = () => {
        let errmsg = '';

        return errmsg;
    }

    renderOp = (value, row, index) => {
        if (row.name !== '超级管理员组') {
            return <span>
                <a onClick={() => this.edit(row)} title="编辑"><Icon type="edit" style={{ marginRight: 6 }} />编辑</a>
                <Divider type="vertical" />
                <a onClick={() => this.pri(row)} title="菜单权限"><Icon type="link" style={{ marginRight: 6 }} />菜单权限</a>     <Divider type="vertical" />
                <Divider type="vertical" />
                <a onClick={() => this.delete(row)} title="删除"><Icon type="delete" style={{ marginRight: 6 }} />删除</a>
            </span>
        }
    }

    searchTable = () => {
        this.setState({
            displaypage: 1,
            displaypagesize: 10,
        }, this.refreshTable);
    }

    refreshPriTable = () => {
        let params = {};
        params.page = this.state.pripage;
        params.limit = 5;

    }

    priPageChange = (page, limit) => {
        this.setState({
            pripage: page,
        }, this.refreshPriTable);
    }

    setPriSource = (result) => {
        this.setState({
            priSource: result.content.list,
            pritotal: result.content.total,
        });
    }
    fliterGroupList = (groupList) => {
        // const groupList = [{ id: 1, name: '用户组1', type: 'ADMIN' }, { id: 2, name: '用户组2', type: 'PROARMY' }, { id: 3, name: '用户组3', type: 'SUBARMY' }, { id: 4, name: '用户组4', type: 'ARMY' }]
        const typeRanks = [{ rank: 1, type: 'ADMIN' }, { rank: 2, type: 'PROARMY' }, { rank: 3, type: 'SUBARMY' }, { rank: 4, type: 'ARMY' }];
        let newGroupList = [];
        const curGroupType = this.props.user.userInfo.type;
        const curTypeRank = typeRanks.find(item => item.type === curGroupType);
        newGroupList = groupList.filter((group) => {
            const tempTypeRankIndex = typeRanks.findIndex((typeRank) => {
                return typeRank.type === group.type;
            });
            if (tempTypeRankIndex === -1) {
                console.log('tempTypeRankIndex :', tempTypeRankIndex);
                return false;
            }
            return typeRanks[tempTypeRankIndex].rank >= curTypeRank.rank;
        })
        return newGroupList;
    }
    refreshTable = () => {
        let params = {};
        params.page = this.state.displaypage;
        params.limit = this.state.displaypagesize;

        if (this.state.searchName !== '') {
            params.name = this.state.searchName;
        }
    }

    render() {

        const rowSelection = {
            selectedRowKeys: this.state.privilegeList,
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                this.setState({
                    privilegeList: selectedRowKeys
                });
            },
        };

        return (
            <Layout className="layout">
                <Content style={{ padding: '0 10px' }}>
                    {/* <BreadcrumbCustom first="系统管理" second="用户组管理" /> */}

                    <div className="content-ctn" >
                        <div style={{ margin: '10px 0' }}>


                            <Form layout="inline" style={{ marginBottom: 15, marginTop: 15 }}>


                                <FormItem label="用户名" >
                                    <Input name="searchName" suffix={<Icon type="usergroup-add" />} placeholder="用户组名" />
                                </FormItem>
                                <FormItem label="用户名" >
                                    <Input name="searchName" prefix={<Icon type="usergroup-add" />} placeholder="用户组名" />
                                </FormItem>
                                <FormItem label="用户名" >
                                    <Select placeholder="下拉框" style={{ width: 120, }} >
                                        <Option key={1} value={1}>1</Option>
                                        <Option key={2} value={2}>2</Option>
                                    </Select>
                                </FormItem>
                                <FormItem >
                                    <RangePicker
                                        showTime={{ format: 'HH:mm:ss' }}
                                        format="YYYY-MM-DD HH:mm:ss"
                                        placeholder={['开始时间', '结束时间']}
                                    />
                                </FormItem>
                                <FormItem >
                                    <Switch checkedChildren="on" unCheckedChildren="off" />
                                </FormItem>
                            </Form>
                            <Form layout="inline" style={{ marginBottom: 15, marginTop: 15 }}>
                                <FormItem >
                                    <Button icon="search" type="primary" onClick={this.searchTable} style={{ marginLeft: '15px' }}>查询</Button>
                                </FormItem>
                                <FormItem >
                                    <Button icon="search" type="" onClick={this.searchTable} >清空</Button>
                                </FormItem>
                                <FormItem >
                                    <DatePicker
                                        style={{ marginTop: '1px' }}
                                        showTime
                                        format="YYYY-MM-DD HH:mm:ss"
                                        placeholder="结束时间"
                                    />
                                </FormItem>
                                <FormItem >
                                    <Cascader
                                        options={this.state.casOptions}
                                    />
                                </FormItem>
                                <FormItem >
                                    <Upload
                                        action=""
                                        method="post"
                                    >
                                        <Button loading={this.state.uploadDataFileLoading}>上传数据文件</Button>
                                    </Upload>
                                </FormItem>
                                <FormItem >

                                    <TreeSelect
                                        allowClear
                                        showSearch
                                        placeholder="请选择默认最高地区"
                                        dropdownStyle={{ height: 400, overflow: 'auto' }}
                                        treeDataSimpleMode
                                        treeData={this.state.areaList}
                                    >

                                    </TreeSelect>
                                </FormItem>

                            </Form>


                            <ComTable dataSource={this.state.dataSource}
                                columns={this.columns}
                                te={this}
                                callback={this.refreshTable}
                                total={this.state.total}
                                pageSize={this.state.displaypagesize}
                                current={this.state.displaypage}
                            />
                            <Tabs >
                                <TabPane tab="first" key="1">1</TabPane>
                                <TabPane tab="second" key="2">2</TabPane>
                                <TabPane tab="third" key="3">3</TabPane>
                            </Tabs>

                            <List
                                itemLayout="horizontal"
                                dataSource={this.state.listData}
                                renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta
                                            title={<a href="https://ant.design">{item.title}</a>}
                                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                        />
                                    </List.Item>
                                )}
                            />
                            <CUModal
                                title={this.state.cutitle}
                                visible={this.state.cuvisible}
                                te={this}
                                visiblestr="cuvisible"
                                cutype={this.state.cutype}
                                cumodalitem={this.state.cumodalitem}
                                checkSubmit={this.checkSubmit}
                            />

                            <DModal
                                visible={this.state.dvisible}
                                te={this}
                                visiblestr="dvisible"
                                delname="name"
                            />

                            <Modal
                                title="编辑用户组菜单权限"
                                visible={this.state.privisible}
                                onOk={this.priSubmit.bind(this)}
                                onCancel={() => changeModal(this, "privisible", false)}
                                okText="保存"
                                cancelText="取消"
                            >
                                <p>用户组名称: {this.state.name} </p>

                                <ComTable dataSource={this.state.priSource}
                                    columns={this.pricolumns}
                                    te={this}
                                    callback={this.refreshPriTable}
                                    total={this.state.pritotal}
                                    pageSize={5}
                                    current={this.state.pripage}
                                    pripagefunc={this.priPageChange}
                                    showSizeChanger={Boolean(false)}
                                    rowSelection={rowSelection}
                                />

                            </Modal>

                        </div>
                    </div>
                </Content>
            </Layout>
        )
    }
}


export default GroupList;
import React, { Component } from 'react';
import { Table, Pagination, } from 'antd';
import { handleTableChange } from '@/utils/pageutil'
import { isNullOrUndefined } from '@/utils/util'



class ComTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div style={{ fontSize: 15 }}>

                <Table bordered
                    style={{ margin: '10px 0' }}
                    rowKey="id"
                    dataSource={this.props.dataSource}
                    columns={this.props.columns}
                    pagination={false}
                    rowSelection={this.props.rowSelection}
                />

                <Table 
                    style={{ margin: '10px 0' }}
                    rowKey="id"
                    dataSource={this.props.dataSource}
                    columns={this.props.columns}
                    pagination={false}
                    rowSelection={this.props.rowSelection}
                />
                <Pagination style={{ marginTop: '20px', display: isNullOrUndefined(this.props.display) ? '' : this.props.display }}
                    defaultPageSize={10}
                    showSizeChanger={isNullOrUndefined(this.props.showSizeChanger) ? true : this.props.showSizeChanger}
                    onChange={(page, pageSize) => handleTableChange(this.props.te, page, pageSize, this.props.callback, this.props.pripagefunc)}
                    onShowSizeChange={(page, pageSize) => handleTableChange(this.props.te, 1, pageSize, this.props.callback, this.props.pripagefunc)}
                    defaultCurrent={1}
                    total={this.props.total}
                    pageSize={this.props.pageSize}
                    current={this.props.current}
                    showTotal={(total, range) => isNullOrUndefined(this.props.showTotal) ? `${range[0]}-${range[1]} of ${total} 条` : this.props.showTotal}
                />

            </div>
        )
    }
}

export default ComTable;
import React, { Component } from 'react';
import { Pagination, Input, Select } from 'antd';
// import styles from './test.less';
import './test.less';
class Main extends Component {
  constructor(props) {
    super(props);
    // console.log('styles :', styles);
  }
  render() {
    return (
      <div className="box">
        <Input />
        <Select
          mode="multiple"
          placeholder="please select"
          // className={styles.customSelect}
        >
          <Select.Option key={1} value={1}>1</Select.Option>
          <Select.Option key={2} value={2}>2</Select.Option>
          <Select.Option key={3} value={3}>3</Select.Option>
        </Select>
        <Pagination defaultCurrent={1} total={90} />
      </div>
    );
  }
}

export default Main;

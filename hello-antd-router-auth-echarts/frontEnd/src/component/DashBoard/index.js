import React, { Component } from 'react';
import echarts from 'echarts';
import { Row, Col, Card } from 'antd';
import Chart from './Chart';
class DashBoard extends Component {

  render() {
    return (
      <div>
        <h2>仪表盘</h2>
        <Row>
          <Col span={12}>
            <Card>
              <Chart />
            </Card>
          </Col>
          <Col span={12} />
        </Row>
      </div>
    );
  }
}
export default DashBoard;
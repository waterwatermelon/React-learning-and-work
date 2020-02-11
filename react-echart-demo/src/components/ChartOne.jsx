import React, { Component } from 'react'
import echarts from 'echarts';
class ChartOne extends Component {
    state = {}
    componentDidMount(){
        const dom = document.getElementById('chartOne');
        let chart = echart.init(dom);
    }
    render() {
        return (
            <div id="chartOne">chart one</div>
        );
    }
}

export default ChartOne;
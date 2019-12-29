import React, { Component } from 'react';
import echarts from 'echarts';
class Chart extends Component {

    componentDidMount() {
        let myChart = echarts.init(document.getElementById('chart1'));
        const option = {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        }
        myChart.setOption(option);
    }
    render() {
        return (
            <div id='chart1' style={{width:'100%',height:'260px'}}>

            </div>
        )
    }
}
export default Chart;
import React, { Component } from 'react';
import * as echarts from 'echarts';
// https://www.makeapie.com/editor.html?c=xmQZRm2IHw
const colors = ['#abc', '#bac', '#cba'];
class PieChart extends Component {
    componentDidMount() {
        const dom = document.getElementById("pieChart");
        const myChart = echarts.init(dom);
        // 绘制图表
        // 空隙：在每2个相邻数据之间插入数值极小的项目，项目颜色设置透明度为0
        myChart.setOption({
            color: colors,
            series: [{
                name: '销量',
                type: 'pie',
                radius: [72, 80],

                label: {
                    show: true,
                    color: '#fff',
                    textStyle: {
                        fontSize: 16
                    }
                },
                labelLine: {
                    length: 20,
                    length2: 30
                },
                data: [{
                    name: '1',
                    value: 5,
                    itemStyle: {
                        normal: {
                            borderWidth: 4,
                            borderRadius: 12,
                            borderColor: colors[0],
                            shadowBlur: 10,
                            shadowColor: colors[0],
                        },
                    }
                }, {
                    name: '',
                    value: 0.2,
                    itemStyle: {
                        normal: {
                            label: {
                                show: false,
                            },
                            labelLine: {
                                show: false,
                            },
                            color: 'rgba(0,0,0,0)',
                            borderWidth: 0,
                        }
                    }
                },
                {
                    name: '2',
                    value: 10,
                    itemStyle: {
                        normal: {
                            borderWidth: 4,
                            borderRadius: 12,
                            shadowBlur: 10,
                            borderColor: colors[1],
                            shadowColor: colors[1],
                        },
                    }
                },
                {
                    name: '',
                    value: 0.2,
                    itemStyle: {
                        normal: {
                            label: {
                                show: false,
                            },
                            labelLine: {
                                show: false,
                            },
                            color: 'rgba(0,0,0,0)',
                        }
                    }
                },]
            }]
        });

    }

    render() {
        return <div id='pieChart' style={{ height: '100%' }}></div>
    }
}


export default PieChart;
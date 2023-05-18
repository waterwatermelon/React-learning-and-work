import React, { useState } from 'react';
import { View, Button } from 'react-native';
import RNEChartsPro from 'react-native-echarts-pro';
import TreeChart from './charts/TreeChart';

function RNEChartsPage() {
  const [pieOption, setPieOption] = useState({
    color: ['red', 'green', 'rgba(0,0,255,0.2)', 'pink', 'purple'],
    series: [
      {
        name: "Source",
        type: "pie",
        legendHoverLink: true,
        hoverAnimation: true,
        avoidLabelOverlap: true,
        startAngle: 180,
        radius: "55%",
        center: ["50%", "35%"],
        data: [
          { value: 105.2, name: "Android" },
          { value: 310, name: "IOS" },
          { value: 234, name: "Web" },
        ],
        label: {
          normal: {
            show: true,
            textStyle: {
              fontSize: 12,
              color: "#23273C",
            },
          },
        },
      },
    ],
  });

  const handleGenRandomData = () => {
    const items = ['Android', 'IOS', 'Web'];
    const data = items.map(name => ({
      name,
      value: Math.random() * 100,
    }));

    const pieOptionTemp = { ...pieOption };
    pieOptionTemp.series[0].data = data;
    setPieOption(pieOptionTemp);
  };

  return (
    <>
      <View>

        <TreeChart />
      </View>
      <View >
        <View style={{ width: 120 }}>
          <Button title='饼图随机数据' onPress={handleGenRandomData} />
        </View>
        <RNEChartsPro
          option={pieOption} />
      </View>
      {/* <View>
        <RNEChartsPro
          option={{
            legend: { show: true, },
            xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name: 'cate',
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line',
              }
            ]
          }} />
      </View>
      <View>
        <RNEChartsPro
          option={{
            series: [
              {
                name: 'speed',
                type: 'gauge',
                min: 0,
                max: 1000,
                progress: {
                  show: true,
                  // width: 16,
                },
                splitLine: {
                  // distance: -12,
                  show: false,
                },
                axisLine: {
                  lineStyle: {
                    color: [[1, '#eaeaf0']],
                    width: 16,
                  }
                },
                axisTick: {
                  show: false,
                },
                axisLabel: {
                  distance: -48,
                  fontSize: 16,
                },
                itemStyle: {
                  color: 'blue',
                },
                detail: {
                  formatter: ['{value}{b|MBps}', '{sub|下载速度测试中}'].join('\n'),
                  fontSize: 30,
                  rich: {

                    b: {
                      color: '#666',
                      fontSize: 16,
                    },
                    sub: {
                      color: '#666',
                      fontSize: 14

                    }
                  }
                },
                data: [
                  {
                    value: 50,
                    name: ''
                  },
                ]
              }
            ]
          }} />
      </View> */}

    </>
  )
}

export default RNEChartsPage;
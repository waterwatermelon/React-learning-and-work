import React, { useRef, useEffect, useState } from 'react';
import * as echarts from 'echarts/core';
import { LineChart, GaugeChart, PieChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import { SVGRenderer, SvgChart, SkiaChart } from '@wuba/react-native-echarts';
import { Button, View } from 'react-native';

echarts.use([SVGRenderer, LineChart, GaugeChart, PieChart, GridComponent]);

export default function WubaEcharts() {
  const chartRef = useRef(null);
  let chart;

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
    chart.setOption(pieOptionTemp);

  };

  useEffect(() => {
    const lineOption = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line',
        },
      ],
    };
    const gaugeOption = {
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
    };

    if (chartRef.current) {
      chart = echarts.init(chartRef.current, 'light', {
        renderer: 'svg',
        width: 400,
        height: 400,
      });
      chart.setOption(pieOption);
    }
    return () => chart?.dispose();
  }, []);

  return <View >
    <View style={{ width: 120 }}>
      <Button title='饼图随机数据' onPress={handleGenRandomData} />
    </View>
    <SvgChart ref={chartRef} />
  </View>;
}
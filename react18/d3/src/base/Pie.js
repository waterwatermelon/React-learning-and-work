import React, { useEffect, } from 'react';
import * as d3 from 'd3';

export default function Pie() {


  useEffect(() => {


    var margin = { top: 20, bottom: 20, left: 20, right: 20 }
    var svg = d3.select('#pie');
    var width = svg.attr("width");
    var height = svg.attr("height");
    var g = svg.append("g")
      .attr("transform", "translate(" + margin.top + "," + margin.left + ")");

    var dataset = [30, 10, 43, 55, 13];//需要将这些数据变成饼状图的数据

    //设置一个color的颜色比例尺，为了让不同的扇形呈现不同的颜色
    var colorScale = d3.scaleOrdinal()
      .domain(d3.range(dataset.length))
      // 获取数量为10的调色板
      .range(d3.schemeCategory10);


    //新建一个饼状图
    var pie = d3.pie();
    //新建一个弧形生成器
    var innerRadius = 10;//内半径
    var outerRadius = ((width - margin.left - margin.right) < (height - margin.top - margin.bottom)
      ? width - margin.left - margin.right
      : height - margin.top - margin.bottom) / 2;//外半径
      
    var arc_generator = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);
    //将原始数据变成可以绘制饼状图的数据，
    var pieData = pie(dataset);

    //在浏览器的控制台打印pieData
    console.log(pieData);

    // 给文字和扇形分组
    var gs = g.selectAll(".g")
      .data(pieData)
      .enter()
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")//位置信息

    //绘制饼状图的各个扇形
    gs.append("path")
      .attr("d", function (d) {
        return arc_generator(d);//往弧形生成器中出入数据
      })
      .attr("fill", function (d, i) {
        return colorScale(i);//设置颜色
      });
    //绘制饼状图上面的文字信息
    gs.append("text")
      .attr("transform", function (d) {//位置设在中心处
        return "translate(" + arc_generator.centroid(d) + ")";
      })
      .attr("text-anchor", "middle")
      .text(function (d) {
        return d.data;
      });

  }, []);

  return (
    <div>
      <h2>Pie</h2>
      <svg id='pie' width={320} height={320}></svg>
    </div>
  )
}

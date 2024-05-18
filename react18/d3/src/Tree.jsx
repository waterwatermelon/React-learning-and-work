import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

// X轴和Y轴坐标翻转
function transformXY(nodes) {
  nodes.forEach(node => {
    let tmp;
    tmp = node.x;
    node.x = node.y;
    node.y = tmp;
  });
}

export default function TreeOne(props) {
  const { direction = 'horizontal' } = props;
  const ref = useRef();

  function draw() {
    // prepare data
    // 定义svg画布内边界
    var margin = { top: 32, bottom: 0, left: 90, right: 0 };

    var svg = d3.select(ref.current);
    var width = svg.attr("width"); // get attribute value
    var height = svg.attr("height");

    var g = svg.append("g"); // g:Selection
    g.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // 原始数据
    var dataset = {
      name: "中国",
      children: [
        {
          name: "浙江",
          children: [
            { name: "杭州", value: 100 },
            { name: "宁波", value: 100 },
            { name: "温州", value: 100 },
            { name: "绍兴", value: 100 }
          ]
        },
        {
          name: "广西",
          children: [
            {
              name: "桂林",
              children: [
                { name: "秀峰区", value: 100 },
                { name: "叠彩区", value: 100 },
                { name: "象山区", value: 100 },
                { name: "七星区", value: 100 }
              ]
            },
            { name: "南宁", value: 100 },
            { name: "柳州", value: 100 },
            { name: "防城港", value: 100 }
          ]
        },
        {
          name: "黑龙江",
          children: [
            { name: "哈尔滨", value: 100 },
            { name: "齐齐哈尔", value: 100 },
            { name: "牡丹江", value: 100 },
            { name: "大庆", value: 100 }
          ]
        },
        {
          name: "新疆",
          children:
            [
              { name: "乌鲁木齐" },
              { name: "克拉玛依" },
              { name: "吐鲁番" },
              { name: "哈密" }
            ]
        }
      ]
    };
    // 构建出Node类型的根节点
    var hierarchyData = d3.hierarchy(dataset)
      .sum(function (d) {
        return d.value;
      });
    // 生成一个数据
    console.log('hierarchyData', hierarchyData);
    // generate a layout function, for tree 
    var tree = d3.tree()
      // 可绘制区域的大小
      // 画布大小保留可能会被遮挡的元素空间，120是根节点、叶子节点的高度
      .size([width - 20, height - 120])
      .separation(function (a, b) {
        // return (a.parent === b.parent ? 1 : 2) / a.depth;
        return (a.parent === b.parent ? 1 : 2);
      });

    if (direction === 'vertical')
      tree.size([width - 20, height - 120]);

    console.log('tree', tree);
    var treeData = tree(hierarchyData);
    console.log('treeData', treeData);
    // 得到边和节点（已经完成转换的）
    var nodes = treeData.descendants();
    console.log('nodes', nodes);
    // 
    if (direction === 'vertical') {
      transformXY(nodes);
    }
    var links = treeData.links();
    console.log('links', links);
    // 创建一个贝塞尔生成曲线生成器
    var Bézier_curve_generator;
    if (direction == 'vertical')
      Bézier_curve_generator = d3.linkVertical();

    else
      Bézier_curve_generator = d3.linkHorizontal();

    Bézier_curve_generator.x(function (d) { return d.y; })
      .y(function (d) { return d.x; });

    //绘制边
    g.append("g")
      .selectAll("path")
      .data(links)
      .enter()
      .append("path")
      .attr("d", function (d) {
        var start = { x: d.source.x, y: d.source.y };
        var end = { x: d.target.x, y: d.target.y };
        return Bézier_curve_generator({ source: start, target: end });
      })
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-width", 1);


    // 收集节点数据，设置节点偏移
    var gs = g.append("g")
      .selectAll("g")
      .data(nodes)
      .enter()
      .append("g")
      .attr("transform", function (d) {
        var cx = d.x;
        var cy = d.y;
        return "translate(" + cy + "," + cx + ")";
      });

    // 绘制节点 circle point
    gs.append("circle")
      .attr("r", 6)
      .attr("fill", "white")
      .attr("stroke", "blue")
      .attr("stroke-width", 1);


    //文字
    gs.append("text")
      .attr('font-size', '14');

    if (direction === 'vertical') {
      gs.select('text')
        .attr("y", function (d) {
          // 如果某节点有子节点，则对应的文字左移/上移
          return d.children ? -12 : 14; // 12:fontsize or lineheight
        })
        .attr("x", function (d) {
          console.log('text', d)
          return -12 * d.data.name.length / 2;
        })
      // .attr("dx ,10)
    } else {

      gs.select('text')
        .attr("x", function (d) {
          // 如果某节点有子节点，则对应的文字左移/上移
          return d.children ? -40 : 8; // 8:圆点宽度
        })
        .attr("y", -5)
        .attr("dy", 10)
    }
    gs.selectAll('text')
      .text(function (d) {
        return d.data.name;
      });
  }
  useEffect(() => {
    // destory();
    draw();
  }, [direction]);
  return (
    <div>
      <h3>
        Tree(1) - Province-City-Country
      </h3>
      <svg ref={ref} width={1000} height={720} />
    </div>
  )
}


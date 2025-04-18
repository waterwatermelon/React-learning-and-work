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

function clickNodeHandler(event) {
  // get Selection
  const node = d3.select(event.target).data()[0]; // get Node
  alert(node.data.name);
}
export default function Tree(props) {
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
            { name: "绍兴", value: 100 },
          ]
        },
        {
          name: "广西",
          children: [
            {
              name: "桂林",
              children: [
                { name: "秀峰区", value: 200 },
                { name: "叠彩区", value: 200 },
                { name: "象山区", value: 200 },
                { name: "七星区", value: 200 },
              ]
            },
            { name: "南宁", value: 100 },
            { name: "柳州", value: 100 },
            { name: "防城港", value: 100 },
          ]
        },
        {
          name: "黑龙江",
          children: [
            { name: "哈尔滨", value: 100 },
            { name: "齐齐哈尔", value: 100 },
            { name: "牡丹江", value: 100 },
            { name: "大庆", value: 100 },
          ]
        },
      ]
    };
    // 构建出Node类型的根节点
    var hierarchyData = d3.hierarchy(dataset)
      /* 累加出总数量 */
      .sum(function (d) {
        return d.value;
      });

    console.log('hierarchyData', hierarchyData);

    // 生成布局函数
    var tree = d3.tree()
      // 设置绘制区域的大小
      .size([width / 2, height / 2])
      /* 节点间隔的空间大小 */
      .separation(function (a, b) {
        // return (a.parent === b.parent ? 1 : 2) / a.depth;
        return (a.parent === b.parent ? 1 : 2);
      });

    if (direction === 'vertical')
      tree.size([width - 20, height - 120]);

    // 通过布局函数，生成布局数据
    var treeData = tree(hierarchyData);
    // 得到所有后代节点（已经完成位置计算）
    var nodes = treeData.descendants();
    // X、Y轴翻转
    if (direction === 'vertical') {
      transformXY(nodes);
    }
    // 得到所有连线对象
    var links = treeData.links();
    // 创建一个贝塞尔生成曲线生成器
    var Bézier_curve_generator;
    if (direction === 'vertical')
      Bézier_curve_generator = d3.linkVertical();
    else
      Bézier_curve_generator = d3.linkHorizontal();

    Bézier_curve_generator.x(function (d) { return d.y; })
      .y(function (d) { return d.x; });

    // 绘制连线
    g.append("g")
      .selectAll("g")
      /* 遍历数组元素，执行以下操作 */
      .data(links)
      .enter()
      /* 添加path元素 */
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
    var groupRoot = g.append("g")
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
    groupRoot.append("circle")
      .attr("r", 6)
      .attr("fill", "white")
      .attr("stroke", "blue")
      .attr("stroke-width", 1);
    //文字
    groupRoot.append("text")
      .attr('font-size', '14');
    // 文字居中
    if (direction === 'vertical') {
      groupRoot.select('text')
        .attr("y", function (d) {
          // 如果某节点有子节点，则对应的文字左移/上移
          return d.children ? -12 : 14; // 12:fontsize or lineheight
        })
        .attr("x", function (d) {
          return -12 * d.data.name.length / 2;
        })
      // .attr("dx ,10)
    } else {
      groupRoot.select('text')
        .attr("x", function (d) {
          // 如果某节点有子节点，则对应的文字左移/上移
          return d.children ? -40 : 8; // 8:圆点宽度
        })
        .attr("y", -5)
        .attr("dy", 10)
    }
    groupRoot.selectAll('text')
      .text(function (d) {
        return d.data.name;
      });

    groupRoot.select('circle').on('click', clickNodeHandler)
    return groupRoot;
  }
  useEffect(() => {
    draw();

  }, [direction]);
  return (
    <div>
      <h3>
        Tree(0) - Province-City-Country
      </h3>
      <svg ref={ref} width={1000} height={720} />
    </div>
  )
}


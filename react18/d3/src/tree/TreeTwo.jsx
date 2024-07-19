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


export default function TreeTwo(props) {
  const { direction = 'horizontal' } = props;
  const ref = useRef();
  /* MACRO */
  const NODE_INNER_PADDING = 0;
  /* SIZE */
  const IMAGE_WIDTH = 96;
  const IMAGE_HEIGHT = 56;
  const NODE_WIDTH = IMAGE_WIDTH + NODE_INNER_PADDING * 2;
  const TEXT_FONT_SIZE = 14;
  const NODE_HEIGHT = TEXT_FONT_SIZE + IMAGE_HEIGHT + NODE_INNER_PADDING * 2;

  /* COLOR */
  const NORMAL_BORDER = "#aaa";
  const SELECTED_BORDER = "#f00";

  function draw() {
    // prepare data
    // 定义svg画布内边界
    var margin = { top: 32, bottom: 28, left: 90, right: 0 };

    var svg = d3.select(ref.current);
    var width = svg.attr("width"); // get attribute value
    var height = svg.attr("height");

    var g = svg.append("g"); // g:Selection
    g.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // 原始数据
    var dataset = {
      name: "主网关",
      imgsrc: '/SL8500-GP04.png',
      children: [
        {
          name: "SU3140",
          imgsrc: '/SU3140-AX30.png',
        },
        {
          name: "SU1120",
          imgsrc: '/SU3140-AX30.png',
        },
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
      tree.size([width - NODE_WIDTH, height - NODE_HEIGHT * 2]);

    console.log('tree', tree);
    var treeData = tree(hierarchyData);
    console.log('treeData', treeData);
    // 得到所有后代节点（已经完成转换的）
    var nodes = treeData.descendants();
    console.log('descendants:', nodes); // [Node]
    // 
    if (direction === 'vertical') {
      transformXY(nodes);
    }
    // 得到所有连线
    var links = treeData.links();
    console.log('links', links);
    // 创建一个贝塞尔生成曲线生成器
    var Bézier_curve_generator;
    if (direction == 'vertical')
      Bézier_curve_generator = d3.linkVertical();

    else
      Bézier_curve_generator = d3.linkHorizontal();

    // 贝赛尔曲线的x轴在竖直方向、y轴在水平方向

    Bézier_curve_generator.x(function (d) { return d.y })
      .y(function (d) { return d.x });

    //绘制边
    g.append("g")
      .selectAll("path")
      .data(links)
      .enter()
      .append("path")
      .attr("d", function (d) {
        var start = { x: d.source.x + NODE_HEIGHT, y: d.source.y + NODE_WIDTH / 2 };
        var end = { x: d.target.x, y: d.target.y + NODE_WIDTH / 2 };
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

    console.log('groupRoot', groupRoot);// Selection { _groups:[g,g,g], _parents: [g]}

    // 绘制边界
    groupRoot
      .append("rect")
      .attr("width", NODE_WIDTH)
      .attr("height", NODE_HEIGHT)
      .attr('fill', "transparent")
      .attr('stroke', NORMAL_BORDER)
      .on('click', e => {
        console.log('click rectangle:', e);
        console.log('d3.select(e.target)', d3.select(e.target)); // selection
        const selection = d3.select(e.target);
        const node = selection.data()[0];
        console.log(node);
        node.isSelected = !node.isSelected;
        selection.attr('stroke', node.isSelected ? SELECTED_BORDER : NORMAL_BORDER);
      })

    {/* <image width="96" height="36" xlink:href="static/SL8500-GP04.b0f7286b.png" x="2" y="18"></image> */ }

    // 图片
    groupRoot.append('image')
      .attr('width', IMAGE_WIDTH)
      .attr('height', IMAGE_HEIGHT)
      .attr('xlink:href', element => {
        return element.data.imgsrc;
      })
      .attr('x', NODE_INNER_PADDING)
      .attr('y', NODE_INNER_PADDING)


    // 文字
    groupRoot.append("text")
      .attr('font-size', TEXT_FONT_SIZE)
      .attr('y', NODE_INNER_PADDING + IMAGE_HEIGHT + TEXT_FONT_SIZE)
      .attr('x', NODE_WIDTH / 2)

    /*
  // 文字居中
  if (direction === 'vertical') {
    groupRoot.select('text')
      .attr("y", function (d) {
        return NODE_HEIGHT / 2;
      })
      .attr("x", function (d) {
        console.log('text', d)
      })
  } else {
    groupRoot.select('text')
      .attr("x", function (d) {
        return d.children ? -40 : 8; // 8:圆点宽度
      })
      .attr("y", -5)
      .attr("dy", 10)
  }
  */
    /*
         <foreignObject width="100" height="20px" y="50">
           <div style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;">
             <span style="font-size: 12px; line-height: 16px; color: black; text-align: center;">SL8500-GP04</span>
           </div>
         </foreignObject>
       */

    groupRoot.selectAll('text')
      .text(function (d) {
        return d.data.name;
      });
    /*
     groupRoot.append('foreignObject')
       .attr('width', '100')
       .attr('height', '14')
       .attr('y', NODE_HEIGHT)
       .append('div')
       .attr('style', "width: 100%;height: 100%; display: flex; justify-content: center; align-items: center; background: blue")
       .append('span')
       .attr('style', 'color: black; font-size: 14px; line-height: 14px; text-align: center;')
       .text(d => d.data.name);
     */
    return groupRoot;
  }
  useEffect(() => {
    draw();

  }, [direction]);
  return (
    <div>
      <h3>
        Tree(2) - Province-City-Country
      </h3>
      <svg ref={ref} width={1400} height={720} >
        <g>
          <g>
            <foreignObject width="100" height="20" y="50" transform='translate(10,10)'>
              <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", }} >
                <span style={{ fontSize: "12px", lineHeight: "16px", color: "black", textAlign: "center", }}>TEXT</span>
              </div>
            </foreignObject>
          </g>
        </g>
      </svg>
    </div >
  )
}


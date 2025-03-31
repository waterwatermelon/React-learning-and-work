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
  const NODE_INNER_PADDING = 8;
  /* SIZE */
  const IMAGE_WIDTH = 96;
  const IMAGE_HEIGHT = 56;
  const NODE_WIDTH = IMAGE_WIDTH + NODE_INNER_PADDING * 2;
  const TEXT_FONT_SIZE = 14;
  const SUBTEXT_FONT_SIZE = 13;
  const NODE_HEIGHT = TEXT_FONT_SIZE + SUBTEXT_FONT_SIZE + IMAGE_HEIGHT + NODE_INNER_PADDING * 2;
  const BORDER_RADIUS = 8;
  const NODE_MARGIN = 8;
  /* COLOR */
  const NORMAL_BORDER = "#ccc";
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
      model: "SL8500-GP04",
      deviceName: '主网关',
      imgsrc: '/SL8500-GP04.png',
      children: [
        {
          model: '',
          deviceName: 'SPILTTER_1',
          belongPort: 'PON3',
          imgsrc: '',
          children: [{
            model: 'B0110',
            deviceName: 'B0110',
          }]
        },
        {
          model: "SU3140-AX30",
          deviceName: '11',
          belongPort: 'PON1',
          imgsrc: '/SU3140-AX30.png',
        },
        {
          model: "SU1120-AX30",
          deviceName: '12',
          belongPort: 'PON2',
          imgsrc: '/SU3140-AX30.png',
        },
      ]
    };
    // 构建出Node类型的根节点
    var hierarchyData = d3.hierarchy(dataset)
      .sum(function (d) {
        return d.value;
      });
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

    var treeData = tree(hierarchyData);
    // 得到所有后代节点（已经完成转换的）
    var nodes = treeData.descendants();
    // 
    if (direction === 'vertical') {
      transformXY(nodes);
    }
    // 得到所有连线
    var links = treeData.links();
    // 创建一个贝塞尔生成曲线生成器
    var Bézier_curve_generator;
    if (direction === 'vertical')
      Bézier_curve_generator = d3.linkVertical();

    else
      Bézier_curve_generator = d3.linkHorizontal();

    // 贝赛尔曲线的x轴在竖直方向、y轴在水平方向

    Bézier_curve_generator.x(function (d) { return d.y })
      .y(function (d) { return d.x });

    //绘制边
    const pathgroup = g.append("g").selectAll("path")
      /* 绑定数据 */
      .data(links)
      .enter();

    pathgroup
      .append("path")
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-width", 1)
      .attr("d", function (d) {
        var start = { x: d.source.x + NODE_HEIGHT, y: d.source.y + NODE_WIDTH / 2 };
        var end = { x: d.target.x, y: d.target.y + NODE_WIDTH / 2 };
        return Bézier_curve_generator({ source: start, target: end });
      })


    //  point of end
    pathgroup.append('circle')
      .attr('r', 4)
      .attr('fill', 'transparent')
      .attr('stroke', 'blue')
      .attr('cx', d => d.target.y + NODE_WIDTH / 2)
      .attr('cy', d => d.target.x - NODE_MARGIN)


    // filter ?
    pathgroup.append('foreignObject')
      .attr('width', '56')
      .attr('height', '20')
      .attr('x', d => d.target.y + NODE_WIDTH / 2 - 28)
      .attr('y', d => d.target.x - NODE_MARGIN - NODE_MARGIN - 24)
      .append('xhtml:span')
      .attr('style', `box-sizing:border-box; \
        display:block;color: black;\
        text-align: center; \
        background-color: rgb(255, 255, 255);\
        border: 1px solid rgb(43, 106, 253);\
        border-radius: 22px;\
        color: rgb(0, 0, 0);\
        max-width: 70px;\
        white-space: nowrap;\
        overflow: hidden;\
        text-overflow: ellipsis;\
        height: 14px;\
        line-height: 14px;\
        font-size: ${SUBTEXT_FONT_SIZE}px;`)
      .text(d => {
        return d.target.data.belongPort;
      });
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

    // console.log('groupRoot', groupRoot);// Selection { _groups:[g,g,g], _parents: [g]}

    // 绘制边界
    groupRoot
      .append("rect")
      .attr("rx", BORDER_RADIUS)
      .attr("ry", BORDER_RADIUS)
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
      // 将文字的中心设置在水平、竖直方向的中心
      .attr('text-anchor', 'middle')
      .attr('y', NODE_INNER_PADDING + IMAGE_HEIGHT + TEXT_FONT_SIZE)
      .attr('x', NODE_WIDTH / 2)
      .text(function (d) {
        return d.data.model;
      })
    // subtitle
    groupRoot.append("text")
      .attr('font-size', SUBTEXT_FONT_SIZE)
      .attr('text-anchor', 'middle')
      .attr('fill', 'grey')
      .attr('y', NODE_INNER_PADDING + IMAGE_HEIGHT + TEXT_FONT_SIZE + TEXT_FONT_SIZE)
      .attr('x', NODE_WIDTH / 2)
      .text(function (d) {
        return d.data.deviceName;
      });
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
      <svg ref={ref} width={1400} height={720} style={{ overflow: 'unset' }} >
      </svg>
    </div >
  )
}


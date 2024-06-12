import React, { useEffect, useRef } from 'react';
import * as  d3 from 'd3';


export default function Zoom() {
  const ref = useRef();
  const width = '400';
  const height = '300';
  function download() {
    const root_node = d3.select(ref.current)
      .node(); // Selection to DOM
    //
    const s_xml = (new XMLSerializer).serializeToString(root_node);

    var imgsrc = 'data:image/svg+xml,' + s_xml;

    var canvas = document.getElementById('canvas')

    canvas.width = 1600;
    canvas.height = 600;

    const context = canvas.getContext("2d");

    var image = new Image();
    image.src = imgsrc;
    image.onload = function () {
      context.drawImage(image, 0, 0);
      context.fillStyle = 'white';
      context.globalCompositeOperation = "destination-over";
      context.fillRect(0, 0, canvas.width, canvas.height);

      var canvasdata = canvas.toDataURL("image/jpeg");
      // var jpgimg = '<img src="' + canvasdata + '">';
      // d3.select("body").append("svgdataurl").html(jpgimg);

      const link = document.createElement('a');
      link.href = imgsrc;
      link.download = 'd3.svg';
      link.click();
      // document.body.remove(link);

      const link2 = document.createElement('a');
      link2.href = canvasdata;
      link2.download = 'd3.jpg';
      link2.click();
      
      // document.body.remove(link2);
    };
  }
  useEffect(() => {
    const svg = d3.select(ref.current)
      .attr("width", 700)
      .attr("height", 400)
      .style("border", "1px solid pink")
    const g = svg.append('g');
    g.append("circle")
      .attr("id", 'test1')
      .attr("cx", 350)
      .attr("cy", 200)
      .attr("r", 20)
      .attr("fill", "pink")

    // 建立缩放事件
    const zoom = d3.zoom()
      .on('zoom', function (event) {   // 监听缩放事件 event是拿到的dom元素
        console.log(event);
        g.attr('transform', event.transform); // k 缩放,x 水平偏移,y 竖直偏移
      });
    // 绑定到的元素上
    svg.call(zoom);

    // 此外可以使用上面不同的api方法调整缩放效果
    // const zoom = d3.zoom()
    //   .extent([[0, 0], [100, 100]])// 设置viewBox
    //   .scaleExtent([0, 5]) //设置缩放最大比例
    //   .duration(200) // 设置鼠标双击生效时间
    //   .on('zoom', function (event) {   // 监听缩放事件 event是拿到的dom元素
    //     circle.attr('transform', event.transform);
    //   })


    // svg.call(zoom).on("wheel.zoom", null); // 取消滚轮缩放

  }, []);

  return (
    <div>

      <h2>Zoom</h2>
      <p>1、旋转鼠标滚轮，缩放视图内容</p>
      <p>2、双击鼠标，缩放视图内容</p>
      <p>3、拖动画布，调整视图位置</p>
      <div><button onClick={download}>下载(svg&jpg)</button></div>
      <svg ref={ref} width={width} height={height}>

      </svg>
      {/*  preview */}
      <canvas id='canvas'></canvas>
    </div>
  )
}

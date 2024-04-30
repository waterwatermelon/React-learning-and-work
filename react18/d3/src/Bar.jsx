import * as d3 from "d3";
import { useEffect, useRef } from "react";
// import { useRef, useEffect } from "react";

export default function BarStatic({
  width = 400,
  height = 400,
  margin = 4,
  marginLeft = 20,
  marginTop = 20,
  barWidth = 24,
  // barHeight = 360,
  fillColor = 'red',
  strokeStyle = 'black',
}) {
  const refX = useRef();
  const refY = useRef();

  const dataset = [250, 210, 170, 130, 90];
  const max = d3.max(dataset);
  const scaleLinear = d3.scaleLinear()
    .domain([0, max])
    .range([0 + marginLeft, width - margin]);

  var scaleLinear2 = d3.scaleBand()
    // d3.range 获取等差数列 [1,2,3,4]
    .domain(d3.range(dataset.length))
    .rangeRound([0, width - margin - margin]);

  // 使用比例尺生成坐标轴
  const xaxis = d3.axisTop(scaleLinear).ticks(10);
  const yaxis = d3.axisLeft(scaleLinear2).ticks(10);


  useEffect(() => {
    d3.select(refX.current).call(xaxis);
    d3.select(refY.current).call(yaxis);
  }, []);


  return (
    <>
      <h3>bar</h3>

      <svg width={width} height={height}>
        {
          dataset.map((data, idx) => <g>
            <rect
              x={marginLeft}
              y={(barWidth * idx + margin * idx + marginTop)}
              width={scaleLinear(data)}
              height={barWidth}
              fill={fillColor}
              stroke={strokeStyle} >
            </rect>

          </g>
          )
        }
        {
          dataset.map((data, idx) => <g>
            <text
              x={scaleLinear(data) - 20}
              y={(barWidth * idx + margin * idx + marginTop + barWidth)}
              font-size={16}
              fill={'#333'}
            >
              {data}
            </text>
          </g>
          )
        }
        <g ref={refX} transform={`translate(0, ${marginTop})`}></g>
        <g ref={refY} transform={`translate(${marginLeft},${marginTop})`}></g>
      </svg>
    </>

  );
}

export function BarDynamic({
  width = 400,
  height = 400,
  margin = 4,
  marginLeft = 20,
  marginTop = 20,
  barWidth = 24,
  // barHeight = 360,
  fillColor = 'red',
  strokeStyle = 'black',
}) {
  const svgRef = useRef();
  useEffect(() => {
    // 为什么产生了2个rect？
    // d3.select('#bar')
    const svg = d3.select(svgRef.current);
    console.log('svg', svg);
    svg.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('height', 10)
      .attr('width', 10).
      transition()
      .duration(2000)
      .attr("width", 200);

  }, [])

  return <>
    <svg ref={svgRef} width={width} height={height}>
    </svg>
  </>;
}
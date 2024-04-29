import React from 'react';
import * as d3 from 'd3';
/**
 * 线性比例尺
 * @returns 
 */
export function ScaleLine() {
  const dataset = [1.4, 2.3, 0.8, 1.5, 2.8];

  const min = d3.min(dataset);
  const max = d3.max(dataset);
  console.log(min, max);
  const scaleLinear = d3.scaleLinear()
    .domain([min, max])
    .range([0, 200]);

  const index = [0, 1, 2, 3, 4];
  const color = ["red", "blue", "green", "yellow", "black"];
  const scaleOrdinal = d3.scaleOrdinal()
    // 定义域
    .domain(index)
    // 值域
    .range(color);
  return (<div>
    <h2>Scale Line</h2>
    {
      dataset.map((data, idx) => {
        return <div>data[{idx}]: {data},scale: {scaleLinear(data)} </div>
      })
    }
    <h2>Scale Ordinal</h2>
    {
      index.map((data, idx) => {
        return <div>index[{idx}]: {data}, value: {scaleOrdinal(data)} </div>
      })
    }
  </div>)
}
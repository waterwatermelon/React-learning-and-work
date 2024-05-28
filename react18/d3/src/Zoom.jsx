import React, { useEffect, useRef } from 'react';
import * as  d3 from 'd3';


export default function Zoom() {
  const ref = useRef();
const width = '400';
const height = '300';
  useEffect(() => {

    d3.select(ref.current)
      .append('g')
      .attr('width', width)
      .attr('height', height)
      .append('circle')
      .attr('cx',20)
      .attr('cy', 20)
      .attr('r', 20)
      .attr('fill', 'purple')
 // TODO:
      
  }, []);

  return (
    <div>

      <h2>Zoom</h2>
      <svg ref={ref} width={width} height={height}>

      </svg>
    </div>
  )
}

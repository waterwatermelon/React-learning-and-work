import React, { useEffect, useRef } from "react";
import * as d3 from 'd3';

export default function Axis() {
  const svgref = useRef();

  useEffect(() => {
    
  }, [])
  return <div>
    <h2>Axis</h2>
    <svg ref={svgref} width={480} height={280}>

    </svg>
  </ div>
}
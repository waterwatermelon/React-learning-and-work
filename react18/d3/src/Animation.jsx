import React, { useEffect, useRef } from "react";
import * as d3 from 'd3';

export function Animation() {

  const aniRef = useRef();
  useEffect(() => {
    const circle = d3.select(aniRef.current)
      .append('circle');

    circle.attr('cx', 10)
      .attr('cy', 20)
      .attr('r', 5)
      .attr('fill', 'red');
    circle.transition()
      .duration(1000)
      .attr('cx', 200)
      .attr('fill', 'green')
      .attr('r', 20);
  }, []);

  return <div>
    <h3>Animation
    </h3>
    
    <svg ref={aniRef}>
    </svg>
  </div>;
}
import React, { useEffect, useRef } from "react";
import * as d3 from 'd3';

export function Event(props) {
  const ref = useRef();
  const min_radius = 12;
  const max_radius = 20;

  useEffect(() => {
    // ?执行2次
    console.log('useeffect');
    const circle = d3.select(ref.current)
      .append('circle');
    circle.attr('cx', max_radius);
    circle.attr('cy', max_radius);
    circle.attr('r', min_radius);
    // circle.attr('r', 12);

    circle.on('click', function handler(e) {
      console.log('click e:', e);
      d3.select(e.target)
        .transition()
        .duration(200)
        .attr('r', max_radius)
        .transition()
        .attr('r', min_radius)

    })
  }, [props.a]);
  return <div>

    <h3>event</h3>
    <p>click circle dot</p>
    <svg id='event' ref={ref}></svg>
    </div>
}
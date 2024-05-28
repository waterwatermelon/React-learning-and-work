import React, { useEffect, useRef } from "react";
import * as d3 from 'd3';

export function Event(props) {
  const ref = useRef();
  const STROKE_WIDTH = 2;
  const fillStyle = '#2b6afd';
  const min_radius = 12;
  const max_radius = 20;
  let selected = false;
  let append_selected = false;
  useEffect(() => {

    const circle = d3.select(ref.current)
      .append('circle');
    circle.attr('cx', max_radius);
    circle.attr('cy', max_radius);
    circle.attr('r', min_radius);
    circle.attr('fill', fillStyle);

    console.log('circle', circle); // Selection

    circle.on('mouseover', function handler(e) {
      console.log('click e:', e);
      d3.select(e.target)
        .transition()
        .duration(200)
        .attr('r', max_radius)
        .transition()
        .attr('r', min_radius)
      // dispatch append circle event
      d3.select('#circle_append').dispatch('click');
    });

    circle.on('click', function (event) {
      console.log('mouse over: event.target', event.target);
      let strokewidth = STROKE_WIDTH;
      append_selected = !append_selected;
      if (append_selected)
        strokewidth = STROKE_WIDTH;
      else
        strokewidth = 0;

      d3.select(event.target)
        .attr("stroke", "salmon")
        .attr("stroke-width", strokewidth);
    });

    const circle_append = d3.select(ref.current)
      .append('circle');


    circle_append.attr('id', 'circle_append')
      .attr('cx', 20 + max_radius + max_radius)
      .attr('cy', max_radius + max_radius)
      .attr('r', max_radius)
      .attr('fill', fillStyle)
      .on('click', function clickhandler(event) {
        console.log('>>> click circle_append ', event);
        let strokewidth = STROKE_WIDTH;
        selected = !selected;
        if (selected)
          strokewidth = STROKE_WIDTH;
        else
          strokewidth = 0;

        d3.select(event.target)
          .attr("stroke", "salmon")
          .attr("stroke-width", strokewidth);
      });

  }, [props.a]);
  return <div>

    <h2>Event</h2>
    <ul>
      <li>
        鼠标点击第1个圆点
      </li>
      <li>
        鼠标悬浮第1个圆点
      </li>
    </ul>
      <pre>
        触发别的元素的事件
      </pre>
    <svg id='event' ref={ref} width={400} height={300}></svg>
  </div>
}
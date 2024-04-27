import * as d3 from "d3";
import { useRef, useEffect } from "react";
/**
 * 折线图
 * @param {*}  
 * @returns 
 */
export default function LinePlot({
  data,
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 30,
  marginLeft = 40
}) {
  const gx = useRef();
  const gy = useRef();
  const x = d3.scaleLinear([0, data.length - 1], [marginLeft, width - marginRight]);
  console.log('x', x);
  const y = d3.scaleLinear(d3.extent(data), [height - marginBottom, marginTop]);
  const line = d3.line((d, i) => x(i), y);

  useEffect(() => {
    // select g element
    void d3.select(gx.current).call(d3.axisBottom(x))
  }, [gx, x]);

  useEffect(() => {
    void d3.select(gy.current).call(d3.axisLeft(y))
  }, [gy, y]);

  return (
    <svg width={width} height={height}>
      {/* draw x axis */}
      <g ref={gx} transform={`translate(0,${height - marginBottom})`} />
      {/* draw y axis */}
      <g ref={gy} transform={`translate(${marginLeft},0)`} />
      {/* draw line */}
      <path fill="none" stroke="currentColor" strokeWidth="1.5" d={line(data)} />
      {/* draw points  */}
      <g fill="white" stroke="currentColor" strokeWidth="1.5">
        {data.map((d, i) => (<circle key={i} cx={x(i)} cy={y(d)} r="2.5" />))}
      </g>
    </svg>
  );
}
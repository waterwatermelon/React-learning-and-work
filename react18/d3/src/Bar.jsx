// import * as d3 from "d3";
// import { useRef, useEffect } from "react";

export default function Bar({
  width = 400,
  height = 400,
  margin = 4,
  barWidth = 24,
  // barHeight = 360,
  fillColor = 'red'
}) {
  const dataset = [250, 210, 170, 130, 90];

  return (
    <svg width={width} height={height}>
      {
        dataset.map((data, idx) => <g> <rect
          x={0} y={(barWidth * idx * 2 + margin)}
          width={data}
          height={barWidth}
          fill={fillColor} />
          <text
            x={data}
            y={barWidth * idx * 2 + barWidth + margin}
            font-size={20}
            fill={'#333'}
          >
            {data}
          </text>
        </g>
        )
      }
    </svg>
  );
}
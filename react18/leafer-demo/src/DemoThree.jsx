
import React, { useEffect, useRef } from 'react'
import { Leafer, Group, Rect, Debug, PointerEvent, Ellipse, Line } from 'leafer-ui'


/**
 * 点阵字符
 */
function DemoThree() {

  const ref = useRef();

  useEffect(() => {
    const leafer = new Leafer({
      view: ref.current, // mount dom
      fill: '#fffffe', // 画布背景颜色
    });
    const points_c = [
      { x: 10, y: 1 },
      { x: 11, y: 1 },
      { x: 12, y: 1 },
      { x: 13, y: 2 },
      { x: 14, y: 3 },
      { x: 14, y: 4 },

      { x: 10, y: 1 },
      { x: 9, y: 1 },
      { x: 8, y: 2 },
      { x: 7, y: 3 },
      { x: 7, y: 4 },
      { x: 7, y: 5 },
      { x: 7, y: 6 },

      { x: 7, y: 7 },
      { x: 7, y: 8 },
      { x: 7, y: 9 },
      { x: 7, y: 10 },
      { x: 8, y: 11 },
      { x: 9, y: 12 },
      { x: 10, y: 12 },
      { x: 11, y: 12 },

      { x: 12, y: 12 },
      { x: 13, y: 11 },
      { x: 14, y: 10 },

    ];
   
    const points_e = [
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 3, y: 1 },
      { x: 4, y: 1 },
      { x: 5, y: 1 },
      { x: 6, y: 1 },

      { x: 1, y: 2 },
      { x: 1, y: 3 },
      { x: 1, y: 4 },
      { x: 1, y: 5 },
      { x: 1, y: 6 },
      { x: 1, y: 7 },
      { x: 1, y: 8 },
      { x: 1, y: 9 },
      { x: 1, y: 10 },
      { x: 1, y: 11 },
      { x: 1, y: 12 },
      { x: 1, y: 13 },

      { x: 2, y: 6 },
      { x: 3, y: 6 },
      { x: 4, y: 6 },
      { x: 5, y: 6 },

      { x: 2, y: 13 },
      { x: 3, y: 13 },
      { x: 4, y: 13 },
      { x: 5, y: 13 },
      { x: 6, y: 13 },
    ];
    const points_f = [
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 3, y: 1 },
      { x: 4, y: 1 },
      { x: 5, y: 1 },
      { x: 6, y: 1 },

      { x: 1, y: 2 },
      { x: 1, y: 3 },
      { x: 1, y: 4 },
      { x: 1, y: 5 },
      { x: 1, y: 6 },
      { x: 1, y: 7 },
      { x: 1, y: 8 },
      { x: 1, y: 9 },
      { x: 1, y: 10 },
      { x: 1, y: 11 },
      { x: 1, y: 12 },
      { x: 1, y: 13 },

      { x: 2, y: 6 },
      { x: 3, y: 6 },
      { x: 4, y: 6 },
      { x: 5, y: 6 },
    ];


    const points = points_c;

    // const rect_list = [];
    points.forEach((point, idx) => {

      // rectangle
      const rect = new Rect({
        x: point.x,
        y: point.y,
        width: 1,
        height: 1,
        fill: '#32cd79',
      });

      leafer.add(rect);
    });

  }, []);
  return <div id='box-3' ref={ref}
    style={{ width: '800px', height: '640px', border: '1px solid #ccc', background: '#f8f8f8' }}>

  </div>;
}
export { DemoThree };
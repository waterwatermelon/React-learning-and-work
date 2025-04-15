
import React, { useEffect, useRef } from 'react'
import { Leafer, Line, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件
/**
 * 方块移动
 */
function DemoFour() {

  const ref = useRef();

  function init() {
    const leafer = new Leafer({
      view: ref.current, // mount dom
      fill: '#fffffe', // 画布背景颜色
    });
    const rect = new Rect({
      y: 100,
      // cornerRadius: 50,
      fill: '#32cd79',
      animation: {
        style: { x: 500, }, // style keyframe
        duration: 1,
        // swing: true // 摇摆循环播放
      },
    });

    leafer.add(rect);

    const line = new Line({
      x: 10,
      y: 10,
      // width: 80,
      strokeWidth: 3,
      stroke: 'skyblue',
      toPoint: {
        x: 80,
        y: 0,
      },
      // rotation: 0,
      animation: {
        style: {
          // 这个属性没有动画
          toPoint: {
            x: 80,
            y: 80,
          },

          // rotation: 90,
        },

        duration: 4,
      }
    });
    leafer.add(line);
  }

  useEffect(() => {
    init();
  }, []);


  return <div id='box-4' ref={ref}
    style={{ width: '800px', height: '640px', border: '1px solid #ccc', background: '#f8f8f8' }}>
  </div>;
}
export { DemoFour };
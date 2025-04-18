
import React, { useEffect, useRef } from 'react'
import { Leafer, Rect, } from 'leafer-ui'


/**
 * Rect帧动画
 */
function DemoFive() {

  const ref = useRef();

  useEffect(() => {
    const leafer = new Leafer({
      view: ref.current, // mount dom
    });

    const rect = new Rect({
      x: 50,
      y: 100,
      cornerRadius: 50,
      fill: '#32cd79',
      around: 'center',
      animation: {
        keyframes: [
          { style: { x: 150, scaleX: 2, fill: '#ffcd00' }, duration: 0.5 },  // animate keyframe
          { style: { x: 50, scaleX: 1, fill: '#ffcd00' }, duration: 0.2 },
          { style: { x: 550, cornerRadius: 0, fill: '#ffcd00' }, delay: 0.1, easing: 'bounce-out' },
          { x: 50, rotation: -720, cornerRadius: 50 } // style keyframe
        ],
        duration: 3, // 自动分配剩余的时长给未设置 duration 的关键帧： (3 - 0.5 - 0.2 - 0.1) / 2 
        loop: true,
        join: true //  加入动画前的元素状态作为 from 关键帧
      }
    });

    leafer.add(rect);
  }, []);
  return <div id='box-5' ref={ref}
    style={{ width: '800px', height: '640px', border: '1px solid #ccc', background: '#f8f8f8' }}>

  </div>;
}
export { DemoFive };

import React, { useEffect, useRef } from 'react'
import { Leafer, Group, Rect, Debug, PointerEvent, Ellipse, Line } from 'leafer-ui'


/**
 * 创建方块
 */
function DemoOne() {

  const ref = useRef();

  useEffect(() => {
    const leafer = new Leafer({
      view: ref.current, // mount dom
      fill: '#fcc', // 画布背景颜色
    })

    // rectangle
    const rect = new Rect({
      x: 10,
      y: 10,
      width: 120,
      height: 120,
      fill: '#32cd79',
      /* 圆角半径 */
      cornerRadius: [30, 60, 30, 60],
      /* 可拖拽 */
      draggable: true
    })

    leafer.add(rect);

    function onEnter(e) {
      (e.current).fill = '#42dd89'
    }

    function onLeave(e) {
      (e.current).fill = '#32cd79'
    }

    // 添加事件
    rect.on(PointerEvent.ENTER, onEnter)
    rect.on(PointerEvent.LEAVE, onLeave)

    /* graph 2 */
    const circle1 = new Ellipse({
      x: 150,
      y: 150,
      width: 20,
      height: 20,
      startAngle: -60,
      endAngle: 300,
      innerRadius: 0,
      fill: '#32cd79',
    });
    const circle2 = new Ellipse({
      x: 150 + 40,
      y: 150,
      width: 20,
      height: 20,
      startAngle: -60,
      endAngle: 300,
      innerRadius: 0,
      fill: '#32cd79',
    });
    leafer.add(circle1);
    leafer.add(circle2);
    const circle3 = new Ellipse({
      x: 150,
      y: 150 + 40,
      width: 20,
      height: 20,
      startAngle: -60,
      endAngle: 300,
      innerRadius: 0,
      fill: '#5355cb',
    });
    leafer.add(circle3);
    const line = new Line({
      x: 150 + 10,
      y: 150 + 10,
      // width: 40,
      // strokeWidth: 5,

      stroke: '#A868ab',
      /* 计算属性 */
      toPoint: {
        x: 0,
        y: 40,
      }
    });
    leafer.add(line);
    // 曲线
    const line2 = new Line({
      points: [300, 200, 400, 240, 500, 200],
      stroke: '#A868ab',
      curve: 0.5, // boolean or number
    });
    leafer.add(line2);
  }, []);
  return <div id='box' ref={ref}
    style={{ width: '800px', height: '640px', border: '1px solid #ccc', background: '#f8f8f8' }}>

  </div>;
}
export { DemoOne };
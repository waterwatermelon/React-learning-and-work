
import React, { useEffect, useRef } from 'react'
import { Ellipse, Frame, Group, Leafer, Rect, } from 'leafer-ui'
import { useTimeout } from 'ahooks';

/**
 * page 动画
 */
function DemoSix() {

  const ref = useRef();

  const graph_map = useRef({});

  useEffect(() => {
    const leafer = new Leafer({
      view: ref.current, // mount dom
    });

    const page1 = new Frame({
      x: 300,
      y: 100,
      width: 150,
      height: 100,
      fill: '#FEB027',
    });


    leafer.add(page1);

    graph_map.current.page1 = page1;

    const rect = new Ellipse({
      x: 60,
      y: 60,
      width: 60,
      height: 60,
      fill: '#32cd79',
      draggable: true,
    });
    page1.add(rect);
  }, []);

  useTimeout(() => {
    graph_map.current?.page1?.remove();

  }, 2000);

  return <>
    <p>2秒后，图形会消失</p>
    <div id='box-6' ref={ref} style={{ width: '800px', height: '640px', border: '1px solid #ccc', background: '#f8f8f8' }}>

    </div></>;
}
export { DemoSix };
import React, { useEffect } from 'react'
import { Stage } from './stopo';

export default function STopoTest() {
  useEffect(() => {
    const dom = document.getElementById('canvas');
    const stage = new Stage(dom);
    stage.init();
    stage.on('click', e => {
      console.log('click stage ', e)
    })
    console.log('module', module)
    console.log('module.hot', module.hot)
    return () => {
      stage.destory();
    }
  }, []);

  return (
    <div>
      <h1>
        STopo Test
      </h1>
      {/* tabIndex={0}设置画布可聚焦，才可设置绑定键盘事件 */}
      <canvas id='canvas' width={960} height={700} tabIndex={0}></canvas>
    </div>
  )
}

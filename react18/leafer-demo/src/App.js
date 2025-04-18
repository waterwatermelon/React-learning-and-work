import React, { useEffect, useRef } from 'react'
import { Leafer, Group, Rect, Debug, PointerEvent } from 'leafer-ui'
import { DemoOne } from './DemoOne';
import { DemoThree } from './DemoThree';
import { DemoFour } from './DemoFour';
import { DemoFive } from './DemoFive';
import { DemoSix } from './DemoSix';


/**
 * 性能体验：创建100万个方块
 */
function DemoTwo() {
  useEffect(() => {

    class RectsCase {

      constructor(view, num) {

        let group;
        const groupSize = 10 * 100 * 1.5
        const column = num > 25 ? 10 : 5

        for (let i = 0; i < num; i++) {
          group = new Group()
          group.x = groupSize * (i % column)
          group.y = groupSize * Math.floor(i / column)
          view.add(group)
          this.createRects(group, 0, 0, `hsl(${i * 3},50%, 50%)`)
        }
      }

      createRects(group, startX, startY, color) {

        let y, rect

        for (let i = 0; i < 100; i++) {
          if (i % 10 === 0) startX += 10
          y = startY
          for (let j = 0; j < 100; j++) {
            if (j % 10 === 0) y += 10
            rect = new Rect(null)
            rect.x = startX
            rect.y = y
            rect.height = 10
            rect.width = 10
            rect.fill = color
            rect.draggable = true
            group.add(rect)
            y += 12
          }
          startX += 12
        }
      }
    }


    const startTime = Date.now()


    const app = new Leafer({ view: window })

    Debug.enable = true
    Debug.filter = 'RunTime'

    new RectsCase(app, 100) // 100万个


    console.log(`创建100万个矩形用时：`, Date.now() - startTime, '毫秒')


  }, [])
}

export default function App() {


  return (<div>
    <h1>hello leafer</h1>

    <DemoSix />
  </div>)
}

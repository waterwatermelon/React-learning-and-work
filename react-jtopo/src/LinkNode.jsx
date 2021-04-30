import { useEffect, useRef } from 'react';
import Jtopo from 'jtopo-in-node';



/**
 * 节点连线实例
 * 功能：查看 节点连线
 */
export default function LinkNode() {
  const canvasRef = useRef();
  let scene = null;
  let beginNode = null;
  let endNode = null;
  const tempNodeA = new Jtopo.Node();
  const tempNodeZ = new Jtopo.Node();
  let link = new Jtopo.Link(tempNodeA, tempNodeZ);
  const node = (scene, x, y, imgPath) => {

    const node = new Jtopo.Node();
    node.setImage('http://www.jtopo.com/demo/img/statistics/' + imgPath, true);
    node.setLocation(x, y);
    scene.add(node);
    return node;
  };

  const init = () => {
    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;
  }
  const draw = () => {
    const stage = new Jtopo.Stage(canvasRef.current);
    scene = new Jtopo.Scene(stage);
    scene.background = './images/bg.png';
    const s1 = node(scene, 305, 43, 'server.png');
    s1.alarm = '2 w';
    const s2 = node(scene, 365, 43, 'server.png');
    const s3 = node(scene, 425, 43, 'server.png');
  }

  const addEvent = () => {
    console.log(`scene`, scene);
    scene.mouseup(e => {
      console.log(`e.target`, e.target);
      console.log(`e.button`, e.button);
      if (e.button === 2) {
        scene.remove(link);
        return;
      }

      if (e.target !== null && e.target instanceof Jtopo.Node) {
        if (beginNode === null) {
          beginNode = e.target;
          scene.add(link);
          tempNodeA.setLocation(e.x, e.y);
          tempNodeZ.setLocation(e.x, e.y);
          tempNodeA.setSize(1, 1);
          tempNodeZ.setSize(1, 1);
        } else if (beginNode !== e.target) {
          endNode = e.target;
          const l = new Jtopo.Link(beginNode, endNode);
          scene.add(l);
          beginNode = null;
          scene.remove(link);
        } else {
          beginNode = null;
        }
      }

    });

    scene.mousedown(e => {
      if (e.target === null || '不会' || e.target !== link) {
        scene.remove(link);
      }
    });

    scene.mousemove(e => {
      tempNodeZ.setLocation(e.x, e.y);
    });

  }
  useEffect(() => {
    init();
    draw();
    addEvent();
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} width={'300px'} height={'300px'} />
      <p>
        使用说明：
        <ul>
          <li>
            连线功能：单击节点生成线段的一端，再点击另一个节点完成连接。
          </li>
          <li>
            取消连线：单击节点生成线段的一端，在任意位置右击鼠标。
          </li>
        </ul>
      </p>
    </div>
  )
}

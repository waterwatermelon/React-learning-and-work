import { useEffect, useRef } from 'react';
import Jtopo from 'jtopo-in-node';


/**
 * 设备连接关系展示
 * 功能： 查看
 */
export default function DeviceRelation() {
  let stage =  null;
  const canvasRef = useRef();
  const node = (scene, x, y, imgPath) => {
    const node = new Jtopo.Node();
    node.setImage('http://www.jtopo.com/demo/img/statistics/' + imgPath, true);
    node.setLocation(x, y);
    scene.add(node);
    return node;
  };

  // link
  const linkNode = (scene, from, to, fold) => {
    let link;
    if (fold) {
      link = new Jtopo.FoldLink(from, to, 'link-name');
    } else {
      link = new Jtopo.Link(from, to);
    }
    scene.add(link);
    return link;
  }
  const hostLink = (scene, nodeA, nodeZ) => {
    var link = new Jtopo.FlexionalLink(nodeA, nodeZ);
    link.shadow = false;
    link.offsetGap = 44;
    scene.add(link);
    return link;
  };
  const initCanvas = () => {
    canvasRef.current.width = window.innerWidth * 2;
    canvasRef.current.height = window.innerHeight;
  }
  const draw = () => {
    stage = new Jtopo.Stage(canvasRef.current);
    // 设置鹰眼导航
    // 在元素滚动的情况才会出现鹰眼导航
    stage.eagleEye.visible = true;
    const scene = new Jtopo.Scene(stage);
    scene.background = 'http://www.jtopo.com/demo/img/bg.jpg';
    const s1 = node(scene, 305, 43, 'server.png');
    s1.alarm = '2 w';
    const s2 = node(scene, 365, 43, 'server.png');
    const s3 = node(scene, 425, 43, 'server.png');

    const g1 = node(scene, 366, 125, 'gather.png');
    linkNode(scene, g1, s1, true);
    linkNode(scene, g1, s2, true);
    linkNode(scene, g1, s3, true);

    const w1 = node(scene, 324, 167, 'wanjet.png');
    linkNode(scene, w1, g1);

    const c1 = node(scene, 360, 220, 'center.png');
    linkNode(scene, c1, w1);

    const cloud = node(scene, 340, 260, 'cloud.png');
    linkNode(scene, cloud, c1);

    const c2 = node(scene, 364, 328, 'center.png');
    linkNode(scene, cloud, c2);
    const w2 = node(scene, 324, 377, 'wanjet.png');
    linkNode(scene, c2, w2);
    const g2 = node(scene, 366, 411, 'gather.png');
    linkNode(scene, w2, g2);
    const h1 = node(scene, 218, 520, 'host.png');
    h1.alarm = '';
    hostLink(scene, g2, h1);
    var h2 = node(scene, 292, 520, 'host.png');
    hostLink(scene, g2, h2);
    var h3 = node(scene, 366, 520, 'host.png');
    h3.alarm = '⼆级告警';
    h3.text = 'h3';
    hostLink(scene, g2, h3);
  }
  const handleViewToJson  = () => {
    const json = stage.toJson();
    console.log(`json`, json);
  }
  
  const handleExpand = () => {
    stage.wheelZoom = 2;
  }

  useEffect(() => {
    initCanvas();
    draw();
  }, []);

  return (
    <div>
      <button onClick={handleViewToJson}>to json</button> 
      <button onClick={handleExpand}> expand</button>
      <canvas ref={canvasRef} width={'300px'} height={'300px'} />
    </div>
  )
}

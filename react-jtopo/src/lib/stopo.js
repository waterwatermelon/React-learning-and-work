/* util start */
function getEventHandler(objName, eventName) {
  return e => { console.log(`[${objName}] [${eventName}]`, e); }
}
/*
* 生成uuid算法,碰撞率低于1/2^^122
 * @param x 0-9或a-f范围内的一个32位十六进制数
*/
export function generateUUID() {
  let d = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
  return uuid
}

/* util end */

/* model start */
class TopoEvent {
  constructor(props) {
    // super(props)
    this.type = ''; // mouseup mousedown click douleclick keydown keyup move
    this.target = null;// instanceof Element
  }
}

export class Stage {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.timer = null;
    this.children = [];
    this.frames = 2;

  }
  init() {
    const nodeA = new Node({ x: 80, y: 60 });
    const nodeB = new Node({ x: 120, y: 120 });
    const link = new Link({ source: nodeA, destination: nodeB });
    this.children.push(nodeA);
    this.children.push(nodeB);
    this.children.push(link);
    this.timer = setInterval(this.paintFrame.bind(this), 1 / this.frames);
    const events = ['click', 'mouseover', 'mousemove', 'mouseout', 'keydown', 'keyup', 'keypress'];
    events.map(eventName => {
      this.canvas.addEventListener(eventName, getEventHandler('stage', eventName))
    })
    // 
    // this.canvas.addEventListener('keydown', e => {
    //   console.log('[stage][keydown] e', e);
    // });
    // this.canvas.addEventListener('click', e => {
    //   console.log('[stage][click] ', e);
    // })
  }

  destory() {
    console.log('[stage][destory]');
    clearInterval(this.timer);
  }

  paintBackground() {
    this.ctx.save();
    this.ctx.fillStyle = '#efefef';
    this.ctx.beginPath();
    this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();
  }

  paintFrame() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.paintBackground();
    // TODO:给子元素排序
    this.children.sort((a, b) => a.zIndex - b.zIndex);
    this.children.forEach(e => {
      e.paint(this.ctx);
    });
  }

}

class Element {
  constructor({ x = 0, y = 0 }) {
    this.id = generateUUID();
    this.x = x;
    this.y = y;
    this.zIndex = 0; // 元素的在层叠上下文中的等级
  }
}

class DisplayElement extends Element {
  constructor(props) {
    super(props);
    this.size = 32;
    this.isHidden = false;
  }
  paint(ctx) {
    ctx.save();
    ctx.strokeStyle = '#cdf';
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.size, this.size);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }
}


class Node extends DisplayElement {
  constructor(props) {
    super(props);
    this.showJunction = true;
    this.jointIndex = 0; // 0 1 2 3
    this.zIndex = 2;
  }

  getJointPoint() {
    return this.jointIndex !== -1 && this.getJointPoints()[this.jointIndex];
  }

  getJointPoints() {
    return [{
      x: this.x + this.size / 2,
      y: this.y,
    },
    {
      x: this.x + this.size,
      y: this.y + this.size / 2,
    },
    {
      x: this.x + this.size / 2,
      y: this.y + this.size,
    },
    {
      x: this.x,
      y: this.y + this.size / 2,
    },];
  }

  paint(ctx) {
    super.paint(ctx);
    if (this.showJunction) {
      this.paintJunction(ctx);
    }
  }

  paintJunction(ctx) {
    const jointPoints = this.getJointPoints();

    jointPoints.forEach(point => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
      ctx.stroke();
      ctx.closePath();
    })
  }
}

class Link extends DisplayElement {
  constructor(props) {
    const { source, destination } = props;
    super(props);
    this.source = source;
    this.destination = destination;
    this.zIndex = 1;
  }

  paint(ctx) {
    const startPoint = this.source.getJointPoint();
    const endPoint = this.destination.getJointPoint();
    ctx.beginPath();
    ctx.strokeStyle = '#acf';
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(endPoint.x, endPoint.y);
    ctx.closePath();
    ctx.stroke();
    ctx.closePath();
  }
}

/* model end */

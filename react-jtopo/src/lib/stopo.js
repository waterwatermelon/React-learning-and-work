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
class MessageBus {
  constructor(props) {
    const { name } = props;
    this.name = name;
    this.map = {};
  }
  subscribe(event, handler) {
    if (!this.map[event]) {
      this.map[event] = [];
    }
    this.map[event].push(handler);
  }
  unsubscribe() {

  }

  dispatch(eventName, event) {
    const handlerList = this.map[eventName];
    if (handlerList) {
      for (let i = 0; i < handlerList.length; i++) {
        const handler = handlerList[i];
        handler(event)
      }
    }
  }

}

class TopoEvent {
  constructor(props) {
    // super(props)
    this.type = ''; // mouseup mousedown click douleclick keydown keyup move
    this.target = null;// instanceof Element
  }
}
class Color {
  constructor({ r, g, b, a = 1 }) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }
  // 修改颜色

  toDomString() {
    return `rgba(${this.r},${this.g},${this.b},${this.a})`;
  }

  toJson() {
    return { r: this.r, g: this.g, b: this.b, a: this.a };
  }
}
export class Stage {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.timer = null;
    this.children = [];
    this.frames = 2;
    this.messageBus = new MessageBus('stage-message-bus');
  }

  init() {
    const nodeA = new Node({ x: 80, y: 60 });
    const nodeB = new Node({ x: 120, y: 120 });
    const link = new Link({ source: nodeA, destination: nodeB });
    this.children.push(nodeA);
    this.children.push(nodeB);
    this.children.push(link);
    this.timer = setInterval(this.paintFrame.bind(this), 1 / this.frames);
    // const events = ['click', 'mouseover', 'mousemove', 'mouseout', 'keydown', 'keyup', 'keypress'];
    const events = ['click'];
    events.map(eventName => {
      this.canvas.addEventListener(eventName, e => {
        // TODO:处理事件属性，计算鼠标点击的位置在画布上的xy
        getEventHandler('stage', eventName)(e);
        this.dispatchEvent(eventName, e)
      })
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

    // 绘制波点
    const dot = { r: 2, fillStyle: '#f6f6f6' };
    this.ctx.fillStyle = dot.fillStyle;
    for (let x = 0; x < this.canvas.width + 20; x += 20) {
      for (let y = 0; y < this.canvas.height + 18; y += 18) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, dot.r, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
      }
    }
    this.ctx.restore();
  }

  paintFrame() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.paintBackground();
    // 给子元素排序
    this.children.sort((a, b) => a.zIndex - b.zIndex);
    this.children.forEach(e => {
      e.paint(this.ctx);
    });
  }

  on(eventName, handler) {
    this.messageBus.subscribe(eventName, handler);
  }

  dispatchEvent(eventName, event) {
    this.messageBus.dispatch(eventName, event);
  }
}

class Element {
  constructor({ x = 0, y = 0 }) {
    this.id = generateUUID();
    this.x = x;
    this.y = y;
    this.size = 32;
    this.zIndex = 0; // 元素的在层叠上下文中的等级
  }
  isInElement({ x, y }) {
    if (x > this.x && x < this.x + this.size && y > this.y && y < this.y + this.size) {
      return true;
    }
    return false;
  }

}

class DisplayElement extends Element {
  constructor(props) {
    super(props);
    this.isHidden = false;
    this.backgroundColor = new Color({ r: 0, g: 0, b: 0, a: 0 });
  }
  paint(ctx) {
    ctx.save();
    ctx.strokeStyle = '#cdf';
    ctx.fillStyle = this.backgroundColor.toDomString();
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.size, this.size);
    ctx.fill();
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
    this.backgroundColor = new Color({ r: 210, g: 20, b: 30, a: 1 });

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

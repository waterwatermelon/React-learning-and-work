import { Canvas } from 'butterfly-dag';
import { EVENT_TYPE } from '../constant';

/**
 *
 * 增强的Canvas
 * 代理事件监听，实现节点单选功能
 * @author sfj
 * @export
 * @class EnhanceCanvas
 * @extends {Canvas}
 */
export class EnhanceCanvas extends Canvas {
  constructor(opt) {
    super(opt);
    this._listenEventProxy();
  }
  _listenEventProxy() {
    this.on('events', data => {
      const { type } = data;
      if(type === EVENT_TYPE.NODE_CLICK) {
        // 单选
        this._unFocusAllNode();
        data.node.focus();
        // 按住ctrl时实现多选？
      } 
      if(type === EVENT_TYPE.CANVAS_CLICK) {
        this._unFocusAllNode();
      }
    })
  }

  _unFocusAllNode() {
    this.nodes.forEach(node => node.unFocus());
  }
}
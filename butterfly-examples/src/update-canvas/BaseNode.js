import { Node } from 'butterfly-dag';
import $ from 'jquery';
import './basenode.scss';
class BaseNode extends Node {
  constructor(opts) {
    super(opts);
    this.options = opts;
  }
  draw = (opts) => {
    let container = $('<div class="decision-new-node"></div>')
      .attr('id', opts.id)
      .css('top', opts.top + 'px')
      .css('left', opts.left + 'px');


    return container[0];
  }

  

  // 根据业务实现节点更新功能
  update() {
    const colorList = ['orange', 'olive', 'pink', 'skyblue', 'salmon'];
    const randomIndex = parseInt(colorList.length * Math.random());
    this.dom.style.backgroundColor = colorList[randomIndex]
  }
}

export default BaseNode;

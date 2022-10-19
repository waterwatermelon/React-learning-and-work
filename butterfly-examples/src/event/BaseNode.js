import { Node } from 'butterfly-dag';
import $ from 'jquery';
import './basenode.scss';
class BaseNode extends Node {
  constructor(opts) {
    super(opts);
    this.options = opts;
    this.on('events', data => {
      console.log('data', data);
      console.log('node listen event');
    })
  }
  draw(opts) {
    let container = $('<div class="decision-new-node"></div>')
      .attr('id', opts.id)
      .css('top', opts.top + 'px')
      .css('left', opts.left + 'px');

    this._createTypeIcon(container);
    this._createText(container);

    return container[0];
  }
  _createTypeIcon(dom = this.dom) {
    const iconContainer = $(`<span class="icon-box ${this.options.className}"></span>`)[0];
    const icon = $(`<i class="newIconfont ${this.options.iconType}"></i>`)[0];

    iconContainer.append(icon);
    $(dom).append(iconContainer);
  }
  _createText(dom = this.dom) {
    $('<span class="name-box"></span>').text(this.options.label).appendTo(dom);
  }

  focus() {
    console.log('this', this)
    console.log('this.dom.classList', this.dom.classList)
    this.dom.classList.add('decision-new-node-selected');
  }

  unFocus() {
    this.dom.classList.remove('decision-new-node-selected');
  }
}

export default BaseNode;

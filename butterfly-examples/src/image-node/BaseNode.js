import { Node } from 'butterfly-dag';
import $ from 'jquery';
import './basenode.scss';
class BaseNode extends Node {
  constructor(opts) {
    super(opts);
    this.options = opts;
  }
  draw = (opts) => {
    // let container = $('<div class="decision-new-node"></div>')
    //   .attr('id', opts.id)
    //   .css('top', opts.top + 'px')
    //   .css('left', opts.left + 'px');
    console.log('opts', opts)
    const container = document.createElement('div');
    container.classList.add('decision-new-node');
    container.id = opts.id;
    container.style.top = opts.top + 'px';
    container.style.left = opts.left + 'px';
    const img = document.createElement('img');
    img.classList.add('node-img');
    img.src = opts.options.bgSrc;
    container.appendChild(img);
    // this._createTypeIcon(container);
    this._createText(container);

    return container;
  }
  // _createTypeIcon(dom = this.dom) {
  //   const iconContainer = $(`<span class="icon-box ${this.options.className}"></span>`)[0];
  //   const icon = $(`<i class="newIconfont ${this.options.iconType}"></i>`)[0];

  //   iconContainer.append(icon);
  //   $(dom).append(iconContainer);
  // }
  _createText(dom = this.dom) {
    $('<span class="name-box"></span>').text(this.options.name).appendTo(dom);
  }
}

export default BaseNode;

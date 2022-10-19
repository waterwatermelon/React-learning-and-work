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
    container.addClass(this.options.type);
    this._createText(container);

    return container[0];
  }
  _createText(dom = this.dom) {
    $('<span class="name-box"></span>').text(this.options.name).appendTo(dom);
  }
}

export default BaseNode;

import { Node } from 'butterfly-dag';
import $ from 'jquery';
import './image-node.scss';
class ImageNode extends Node {
  constructor(opts) {
    super(opts);    
    this.userData = opts.userData;  
  }

  draw = (opts) => {
    const container = document.createElement('div');
    container.classList.add('img-node-box');
    container.id = opts.id;
    container.style.top = opts.top + 'px';
    container.style.left = opts.left + 'px';
    const img = document.createElement('img');
    img.classList.add('node-img');
    img.src = opts.options.bgSrc;
    container.appendChild(img);
    this._createText(container);
    return container;
  }
  
  _createText(dom = this.dom) {
    $('<span class="name-box"></span>').text(this.options.name).appendTo(dom);
  }

  update(status) {
    const imgDom = this.dom.getElementsByClassName('node-img');
    imgDom[0].src = this.userData[status];
  }
}

export default ImageNode;

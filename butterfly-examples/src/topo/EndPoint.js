import { Endpoint } from "butterfly-dag";
import { ENDPOINT_ORIENTATION } from "../constant";
import './endpoint.scss';

/**
 *
 * 显示文本的锚点
 * @export
 * @class EndPointWithLabel
 * @extends {Endpoint}
 */
export class EndPointWithLabel extends Endpoint {

  constructor(opt) {
    super(opt);

  }

  // 文本的位置如何确定？
  // 根据锚点的orientation
  draw(opts) {
    const _dom = super.draw(opts);
    const text = document.createElement('span');
    text.innerText = opts.options.label ?? '';
    text.classList.add('endpoint-text');
    console.log('opts', opts);
    if (opts.orientation.join() === ENDPOINT_ORIENTATION.UP.join()) {
      text.classList.add('endpoint-text-top');
    } else if (opts.orientation.join() === ENDPOINT_ORIENTATION.DOWN.join()) {
      text.classList.add('endpoint-text-bottom');
    } else if (opts.orientation.join() === ENDPOINT_ORIENTATION.LEFT.join()) {
      text.classList.add('endpoint-text-left');
    } else if (opts.orientation.join() === ENDPOINT_ORIENTATION.RIGHT.join()) {
      text.classList.add('endpoint-text-right');
    }
    
    console.log('opts', opts);
    _dom.appendChild(text);
    return _dom;
  }
}
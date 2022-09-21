import { Endpoint } from "butterfly-dag";
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
    // console.log('opt', opt)
    // this.label = opt.label;
  }

  draw(opts) {
    const _dom = super.draw(opts);
    const text = document.createElement('span');
    text.innerText = opts.options.label;
    text.classList.add('endpoint-text');
    _dom.appendChild(text);
    console.log('opts', opts)
    return _dom;
  }
}
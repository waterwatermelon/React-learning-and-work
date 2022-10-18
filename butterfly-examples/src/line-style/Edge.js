import { Edge } from 'butterfly-dag';
import $ from 'jquery';
import './edge.scss';

class BaseEdge extends Edge {
  draw(obj) {
    const path = super.draw(obj);
    $(path).addClass(this.options.lineType);
    $(path).addClass(this.options.color);
    return path;
  }

}

export default BaseEdge;

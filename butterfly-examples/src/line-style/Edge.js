import {Edge} from 'butterfly-dag';
import $ from 'jquery';
import './edge.scss';

class BaseEdge extends Edge {
  draw(obj) {
    let path = super.draw(obj);
    if (this.options.lineType) {
      $(path).addClass(this.options.lineType);
    }
    return path;
  }
   
}

export default BaseEdge;

import React, { Component } from 'react';
import '../style/box.css'
class ChartBox extends Component {
    
    render(){
        const style = this.props.style;
        return(
            <div className="chart-box" style={style}>
                <div className="chart-box-title">{this.props.title||'标题'}</div>
                {/* 宽度与父容器相等 高度展示父容器剩余空间 展示子组件 */}
                <div className="chart-box-ctn">{this.props.children}</div>
            </div >
        );
    }
}
export default ChartBox;
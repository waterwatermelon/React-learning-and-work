import React, { Component } from 'react'

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 300,
      isDraging: false,
      initPos: 0,
      delta: 0
    };
  }
  handleMouseDown = (e) => {
    this.setState({
      isDraging: true,
      initPos: e.clientX
    })
    console.log('mouse down');
    console.log('e', e);
    console.log('e.clientX', e.clientX);
  }

  handleMouseUp = (e) => {
    console.log('mouse up');
    console.log('e', e);
    console.log('e.clientX', e.clientX);
    this.setState({
      isDraging: false,
      delta: 0,
      initPos: 0,
      width: this.state.width + this.state.delta
    })
  }
  handleMouseLeave = (e) => {
    console.log('mouse leave');
    console.log('e.clientX', e.clientX);

    this.setState({
      isDraging: false,
      delta: 0,
      initPos: 0,
      width: this.state.width + this.state.delta
    })
  }
  handleMouseMove = (e) => {
    console.log('mouse move');
    console.log('e.clientX', e.clientX);
    if (this.state.isDraging) {
      this.setState({
        // width: e.clientX,
        delta: e.clientX - this.state.initPos,
      });
    }
  }
  render() {
    return (
      <div className="sider" style={{ width: this.state.width }}
        onMouseUp={this.handleMouseUp}
        onMouseLeave={this.handleMouseLeave}
        onMouseMove={this.handleMouseMove}
      >
        <main className="sider-main" >
          {this.props.children}
        </main>
        <div className="sider-bar resizer"
          onMouseDown={this.handleMouseDown}
          style={{ left:this.state.isDraging ? this.state.delta: null}}
          title="左右拖动调节侧边栏宽度"
        > 
        </div>
      </div >
    )
  }
}

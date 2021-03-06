import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNumber } from '../redux/actions';
// redux demo组件
class Counter extends Component {
  constructor() {
    super();
    this.handleAdd = this.handleAdd.bind(this);
  }
  componentDidMount() {
  }
  handleAdd() {
    this.props.addNumber();
  }
  render() {
    console.log('this.props :', this.props);
    return (
      <div>
        number:{this.props.number}
        <button onClick={this.handleAdd}>add</button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log('state :', state);
  return {
    number: state.counter.number
  }
}
// export default Counter;

const mapDispatchToProps = (dispatch) => {
  return { addNumber: () => dispatch(addNumber()) }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter);
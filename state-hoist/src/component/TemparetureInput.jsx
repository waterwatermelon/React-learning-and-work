import React, { Component } from 'react';
const scaleName = {
  'c':'Celsius',
  'f':'Fahrenheit',
}
class TemparetureInput extends Component {
  handleChange = (e) => {
    this.props.onTemparetureChange(e.target.value);
  }
  render() {
    const { scale } = this.props;
    return (
      <fieldset>
        <legend>please input tempareture in {scaleName[scale]}</legend>
        <input type="text"
          value={this.props.tempareture}
          onChange={this.handleChange}
        />
      </fieldset>
    );
  }
}
export default TemparetureInput;
import React, { Component } from 'react';
import {BoilingVerdict} from '../component/BoilingVerdict';
import TemparetureInput from '../component/TemparetureInput.jsx';
// 根据当前温度标准，得出目标温度
function convertTempareture(srcScale, tempareture, tarScale) {
  if (srcScale === tarScale) {
    return tempareture;
  }
  const input = parseFloat(tempareture);
  console.log('input :', input);
  if (isNaN(input)) {
    return '';
  }
  if (srcScale === 'c' && tarScale === 'f') {
    return toFahrenheit(tempareture).toString();
  } else {
    return toCelsius(tempareture).toString();
  }
}


/**
 * 将华氏温度转为摄氏温度
 * @param {number} fahrenheit 华氏温度
 */
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

/**
 * 将摄氏温度转为华氏温度
 * @param {number} celsius 摄氏温度
 * @returns
 */
function toFahrenheit(celsius) {
  return ( celsius * 9 / 5 )+ 32;
}
class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scale: 'c',
      tempareture: '',
    }
  }
  handleCelsiusChange = (tempareture) => {
    this.setState({ scale: 'c', tempareture });
  }
  handleFahrenheitChange = (tempareture) => {
    this.setState({ scale: 'f', tempareture });
  }

  render() {
    const { tempareture, scale } = this.state;
    // celsius,fahrenheit相当于计算属性？根据多个state计算出来
    const celsius = convertTempareture(scale, tempareture, 'c');
    const fahrenheit = convertTempareture(scale, tempareture, 'f');;
    return (
      <div>
        <TemparetureInput
          scale='c'
          tempareture={celsius}
          onTemparetureChange={this.handleCelsiusChange}
        />
        <TemparetureInput
          scale='f'
          tempareture={fahrenheit}
          onTemparetureChange={this.handleFahrenheitChange}
        />
        <BoilingVerdict celsius={celsius} />
      </div>
    );
  }
}
export default Calculator;
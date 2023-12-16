import React from "react";
import './radio.css';

function Radio(props) {
  const { name, label, value } = props;

  return <div className="border border-blue">
    <input hidden type="radio" name={name}id={value} className="styled-radio  align-middle" />
    <span class="styled-radio-selector  align-middle"> </span>
    <label className=" align-middle" for={value}>{label}</label> 
    &nbsp;
  </div>;
}
function RadioGroup(props) {
  const { options = [] } = props;

  return <div className="flex"> {options.map(option => <Radio {...option} name="radio" />)}</div>;
}

export { RadioGroup };
export default Radio;

import React from "react";

function Input(props) {
  const { type = '', placeholder, ...rest } = props;
  return <input
    type={type}
    placeholder={placeholder}
    className="border border-blue p-1 focus:outline-none focus:shadow-sm focus:shadow-blue" />;

}

export default Input;
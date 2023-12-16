import React from "react";

function Select() {
  return <select className="border border-blue px-2 py-1 focus:outline-none">
    <option>EN</option>
    <option className="bg-blue">CN</option>
  </select>
}

export default Select;
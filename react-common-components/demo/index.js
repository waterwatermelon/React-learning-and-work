import React from "react";
import ReactDOM from "react-dom";
// import Demo from "../src";
import { AntdButton, Button } from '../src';
import MaskInput from "../src/components/MaskInput";

ReactDOM.render(
  <div>
    <Button >btn</Button>
    <AntdButton >button</AntdButton>
    <MaskInput value="haha"/>
  </div>,
  document.getElementById("root"));


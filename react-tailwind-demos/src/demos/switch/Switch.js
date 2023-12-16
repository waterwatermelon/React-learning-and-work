
import React, { Fragment } from "react";
import './switch.css';

function Switch(props) {
  const { checked } = props;
  const handleClick = () => {
    console.log('click');
  };

  return <>
    <div className="relative flex items-center content-center text-center  w-24 h-12 "
      onClick={handleClick}>
      <span className="inline-block borders w-24 h-8 bg-grey bg-gray-400 text-white">
        disable
      </span>
      <div className="bg-white border border-gray-400 w-4 h-full switch-bar absolute left-0 top-0"></div>
    </div>
    {/*  */}
    <br />
    <div className="relative flex items-center content-center text-center  w-24 h-12 ">
      <span className="inline-block borders w-24 h-8 bg-blue text-white">
        enable
      </span>
      <div className="bg-white border border-blue w-4 h-full switch-bar absolute left-0 right-0 "></div>
    </div>
  </>

}

export default Switch;
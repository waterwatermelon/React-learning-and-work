import React, { useState } from 'react';
import ColorPicker from '@rc-component/color-picker';
import '@rc-component/color-picker/assets/index.css';
import { Divider, Popover } from 'antd';

export default function MyColorPicker(props) {

  const [colorStr, setColorStr] = useState('#f0f0f0');
  const [color, setColor] = useState();
  const [showpicker, setshowpicker] = useState(false);

  const handleClickPreviewer = () => {
    setshowpicker(true);
  };



  const handleColorChange = color => {
    console.log('color', color);
    const str = color.toRgbString();
    console.log('str', str);
    setColorStr(str);
    setColor(color);
  };

  return (
    <div>
      <h2>color pickers </h2>
      {/* Example 1 : ok */}
      <Popover
        placement='topLeft'
        content={<ColorPicker style={{ padding: 0, boxShadow: 'unset' }} value={color} onChange={handleColorChange} />} trigger="click">
        <div
          style={{
            width: '8em',
            height: '2em',
            marginBottom: '4px',
            backgroundColor: colorStr
          }}
        />
      </Popover>
      <Divider />
      {/* Example 2 : fail */}
      <div tabIndex={0} onBlurCapture={e => console.log('e', e)}>

        <div
          style={{
            width: '8em',
            height: '2em',
            marginBottom: '4px',
            backgroundColor: colorStr
          }}
          onClick={handleClickPreviewer} />
        <ColorPicker
          style={{
            display: showpicker ? '' : 'none',
          }}
          onChange={handleColorChange}

        />
      </div>
    </div>
  )
}

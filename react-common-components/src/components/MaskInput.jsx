import React, { useEffect, useRef, useState } from 'react';

/* 不使用value属性显性设置密码 */

function MaskInput(props) {

  const { value, onChange } = props;

  const inputRef = useRef();

  const [realValue, setRealValue] = useState('');

  const handleChange = (e) => {
    console.log('handleChange');
    console.log('v:', e.target.value);
    setRealValue(e.target.value);
  };

  const handleBlur = e => {
    onChange && onChange(realValue);
  };

  useEffect(() => {
    inputRef.current.value = value;
  }, []);

  return (
    <input type='password' ref={inputRef} onChange={handleChange} onBlur={handleBlur} />
  );
}

export default MaskInput;
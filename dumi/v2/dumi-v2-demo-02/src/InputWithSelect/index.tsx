import React from 'react';
import './index.scss';

interface OptionProp {
  label: string;
  value: string;
}
interface InputWithSelectProps {
  options: OptionProp[],
}

export default function index(props:InputWithSelectProps) {
  const { options = [] } = props;
  return (
    <div className='input-box'>
      <input />
      <div className='select-list'>
        <ul>
        {
          options.map(e => {
            return <li key={e.value}>{e.label}</li>
          })
        }
        </ul>
      </div>
    </div>
  )
}

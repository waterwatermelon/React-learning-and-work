import { Checkbox, Input, Radio, Select, TimePicker } from 'antd'
import React from 'react'
import { options } from '../data/data'

export default function InputExample() {
  return (
    <div>

      <Input placeholder="Basic usage" />
      <br /> <br />
      <Input.Password placeholder="Password" />
      <br /> <br />
      <Radio.Group options={options} />
      <br /> <br />
      <Checkbox.Group options={options}/>
      <br /> <br />
      <Select style={{ width: "200px" }} showSearch={true} options={options} />
      <br /> <br />
      <TimePicker />
    </div>
  )
}

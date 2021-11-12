import React from 'react';
import { Form, Input, TreeSelect, Cascader, InputNumber, Switch, Tooltip, Col, Row } from 'antd';
import { Select, Radio, Checkbox, DatePicker, TimePicker, Upload, Button } from 'antd';
import './common-form-item.scss'

const { TextArea, Password } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;

export const CommonSelect = (props) => {
  const { selectSchema, className = 'inline-form-item', ...rest } = props;
  return (
    <Select className={`${className}`} {...rest}>
      {selectSchema && selectSchema.map((item, i) => {
        return (
          <Option key={i} title={item.title} value={item.value}>{item.title}</Option>
        );
      })}
    </Select>
  );
};

export const CommonRadio = (props) => {
  const { radioSchema = [], ...rest } = props;

  return (
    <RadioGroup options={radioSchema} {...rest} />
  );
};

export const CommonDatePicker = (props) => {
  const { RangePicker } = DatePicker;
  const { isRange = false, ...rest } = props;

  return (
    isRange ?
      <RangePicker {...rest} /> :
      <DatePicker {...rest} />
  );
};

export const StrengthPassword = (props) => {
  const { type, content, visible = false, ...rest } = props

  let config = !visible ? { visible: visible } : {};

  return (
    <Tooltip placement="topLeft" title={content} {...config}>
      <Password type={type} {...rest} />
    </Tooltip>
  );
};

export const StrengthInput = (props) => {
  const { type, content, visible = false, trigger = "hover", ...rest } = props

  let config = !visible ? { visible: visible } : {};

  return (
    <Tooltip placement="topLeft" title={content} trigger={trigger} getPopupContainer={triggerNode => { return triggerNode.parentNode }} {...config}>
      <Input type={type} {...rest} />
    </Tooltip>
  );
};

export const StrengthInputNumber = (props) => {
  const { type, content, visible = false, ...rest } = props

  let config = !visible ? { visible: visible } : {};

  return (
    <Tooltip placement="topLeft" title={content} {...config}>
      <InputNumber type={type} {...rest} />
    </Tooltip>
  );
};

export const StrengthCheckBoxGroup = (props) => {
  const { span = 4, options = [], ...rest } = props

  return (
    <Checkbox.Group {...rest}>
      <Row>
        {options?.map(item => {
          return (<Col span={span}>
            <Checkbox value={item.value}>{item.label}</Checkbox>
          </Col>);
        })}
      </Row>
    </Checkbox.Group>
  );
};

export const CommonTimePicker = (props) => {
  const { RangePicker } = TimePicker;
  const { isRange = false, ...rest } = props;

  return (
    isRange ?
      <RangePicker {...rest} /> :
      <TimePicker {...rest} />
  );
};

export const UploadItem = (props) => {
  const { buttonName = '上传文件', beforeUpload = false, multiple = false, action, fileList = [], btn, ...rest } = props;

  return (
    <Upload action={action} multiple={multiple} beforeUpload={beforeUpload} {...rest}>
      <Button type={btn}>
        {buttonName}
      </Button>
    </Upload>
  );
};

export function FormItem(props) {
  const { item, } = props;
  const { form, content, config } = item;
  const { formLabel = '', name, layout = {}, rules = [], ...formRest } = form;
  const { CustomFormItem, value = "", defaultValue, type, ...rest } = content;
  let valuePropName = "value";
  let formItem = '';
  // type.toLowerCase();
  switch (type) {
    case 'text':
      formItem = <StrengthInput type={type} {...rest} {...config} />;
      break;
    case 'password':
      formItem = <StrengthPassword type={type} {...rest} />;
      break;
    case 'select':
      formItem = <CommonSelect {...content} />;
      break;
    case 'number':
      formItem = <StrengthInputNumber type={type} {...rest} />;
      break;
    case 'textarea':
      const { showCount = true, maxLength = 200 } = rest
      formItem = <TextArea showCount={`${showCount}`} maxLength={`${maxLength}`} {...rest} />;
      break;
    case 'radio':
      formItem = <CommonRadio {...content} />;
      break;
    case 'DatePicker':
      formItem = <CommonDatePicker {...content} />;
      break;
    case 'TimePicker':
      formItem = <CommonTimePicker {...content} />;
      break;
    case 'Cascader':
      const { options } = rest;
      formItem = <Cascader options={options} {...content} />;
      break;
    case 'Switch':
      valuePropName = "checked";
      formItem = <Switch {...rest} />;
      break;
    case 'TreeSelect':
      const { treeData = [] } = rest;
      formItem = <TreeSelect treeData={treeData} style={{ minWidth: '150px' }} {...rest} />;
      break;
    case 'Upload':
      valuePropName = "fileList";
      formItem = <UploadItem {...rest} />;
      break;
    case "checkbox":
      valuePropName = "checked";
      formItem = <Checkbox {...rest} />;
      break;
    case "checkboxGroup":
      formItem = <StrengthCheckBoxGroup {...rest} />;
      break;
    case "radioGroup":
      formItem = <Radio.Group {...rest} />;
      break;
    default:
      formItem = value;
      break;
  }

  return (
    <Form.Item label={formLabel} name={name} valuePropName={valuePropName} {...layout} rules={rules} {...formRest}>{formItem}</Form.Item>
  );
}


/**
 *
 * 通过配置来渲染多个表单元素
 * @param {*} props
 * @returns
 */
export default function CommonFormItem(props) {
  const { schema, span = 24 } = props;

  return (
    <>
      {schema ? schema.map((item, i) => {
        return (<Col id={item.form.name + '-col'} key={i} span={typeof span === 'number' && span} { ...span}><FormItem item={item} /></Col>);
      }) : ''}
    </>
  );
};
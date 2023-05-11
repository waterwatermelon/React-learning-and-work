import React, { useState } from 'react';
import Form, { Field } from 'rc-field-form';



const Label = ({ children }) => <label style={{ display: 'inline-block', width: 60 }}>{children}:</label>;

const Row = ({ children }) => <div style={{ marginBottom: 12, }}> {children}</div>;

const ErrorMessage = ({ message }) => <span style={{ display: message ? 'block' : 'none', color: 'red' }}> {message}</span>;

const Input = ({ value = "", message, ...props }) => {
  return <div style={{ display: 'inline-block', verticalAlign: 'top' }}>
    <input value={value} {...props} />
    <ErrorMessage message={message} />
  </div>;
};

const Select = ({ value, options, message, ...props }) => {
  const _options = options || [1, 2, 3].map(e => ({ label: e, value: e }));

  return <div style={{ display: 'inline-block', verticalAlign: 'top' }}>

    <select value={value} {...props} >
      {
        _options.map(e => (<option key={e.value} value={e.value}>{e.label}</option>))
      }
    </select>
    <ErrorMessage message={message} />
  </div>;
};

const Checkbox = ({ value, ...props }) => {
  return <>
    <input type={'checkbox'} checked={value} {...props} />
  </>
};

const RadioGroup = ({ value, options, onChange, ...props }) => {
  const _options = options || [{ label: 1, value: '1', }, { label: 2, value: '2', },];
  const handleChange = (v) => {
    if (v === value) {
      onChange();
    } else {
      onChange(v);
    }
  };

  return <>
    {_options.map(option => (<span onClick={() => handleChange(option.value)}>
      <input type={'radio'} name={option.value} checked={value === option.value} />
      <label for={option.value} >{option.label}</label>
    </span>))}
  </>;
};


const FormItem = ({ label, name, rules, children, }) => {
  const [message, setMessage] = useState('');

  const handleMetaChange = (meta) => {
    const msg = meta.errors.join('');
    setMessage(msg);
  };
  return <Row>
    <Label >{label} </Label>
    <Field name={name} rules={rules} onMetaChange={handleMetaChange}>
      {children}
    </Field>
    <ErrorMessage message={message} />
  </Row>;
}

function MyForm() {


  const [errors, setErrors] = useState({});

  // 字段修改
  const handleFieldsChange = (changeField, allFields) => {
    console.log('[fieldsChange]');
    console.log('changeField:', changeField);
  };
  // 提交失败
  const handleFormFinishFailed = ({ values, errorFields }) => {
    console.log('errorFields', errorFields);
    const errorsTemp = {};
    errorFields.forEach(eField => {
      errorsTemp[eField.name.join('.')] = eField.errors[0];
    });
    setErrors(errorsTemp);
  };

  // 提交成功
  const handleFormFinish = values => {
    setErrors({});
    console.log('[form][finish]:', values);

  };

  return (
    <div>
      <Form
        onFieldsChange={handleFieldsChange}
        onFinishFailed={handleFormFinishFailed}
        onFinish={handleFormFinish}
      >
        <Row>
          <Label >title</Label>
          {/* Field 组件，向Form组件注册字段，校验字段 */}
          <Field name='title' rules={[{ required: true }]} onMetaChange={e => console.log('meta ', e)}>
            <Input placeholder={'enter title'} message={errors.title} />
          </Field>
        </Row>
        <Row>
          <Label >picker</Label>
          <Field name='picker' rules={[{ required: true, }]}>
            <Select message={errors.picker} />
          </Field>
        </Row>
        <Row>
          <Label >switch</Label>
          <Field name='switch' valuePropName='checked'>
            <Checkbox />
          </Field>
        </Row>
        <FormItem
          label={'radio'}
          name={'radio'}
          rules={[{ required: true, message: '请选择认证方式' }]}>
          <RadioGroup
            options={[
              {
                label: 'Basic认证', value: 'basic',
              },
              {
                label: 'Digest认证', value: 'digest',
              },
              {
                label: 'CA认证', value: 'ca',
              }]} />
        </FormItem>
        <FormItem
          label={'input2'}
          name={['input', 'a']}
          rules={[{ required: true }]}>
          <Input />
        </FormItem>
        <div>

          <button >提交</button>
          <button type='reset'>取消</button>
        </div>
      </Form>

    </div>
  )
}

export default MyForm
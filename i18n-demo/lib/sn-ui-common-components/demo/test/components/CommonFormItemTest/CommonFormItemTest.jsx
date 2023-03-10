import { CommonFormItem } from 'src';
import { Form, Button } from 'antd';
import React, { useEffect } from 'react';

export default function CommonFormItemTest() {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue([{
      system: 'new'
    }]);
  }, []);

  const getValue = () => {
    const values = form.getFieldsValue();
    console.log(`values`, values);
  }
  return (
    <>
      <Form form={form}>
        <CommonFormItem schema={[{
          form: {
            name: [0, 'system']
          },
          content: {
            type: 'text',
            value: 'old'
          }
        }]} />
      </Form>
      <Button onClick={getValue}>getValue</Button>
    </>
  )
}

import React from 'react'
import { useEffect } from 'react';
import { Form, Input } from 'antd'

export default function FormList() {
  const users = [{
    label: '1',
  }];

  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({ users: users })
  }, []);
  return (
    <div>

      FormList
      <Form form={form}>
        <Form.List name='users'>
          {fields =>

            fields.map(field => {
              console.log(`field`, field);
              return (

                <Form.Item {...field}>
                  <Input />
                </Form.Item>
              )
            })
          }
        </Form.List>
      </Form>
    </div>
  )
}

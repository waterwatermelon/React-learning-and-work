import { useEffect } from 'react';
import { Form, Input, Button, Space, InputNumber } from 'antd'
import { CloseOutlined } from '@ant-design/icons';

function ItemRow(props) {
  const { name, remove } = props;
  return (
    <Space>

      <Form.Item
        label='label1'
        name={[name, 'label']}
        fieldKey={[props.fieldKey, 'label']}
        >
        <Input />
      </Form.Item>
      <Form.Item
        label='label2'
        name={[name, 'age']}
        fieldKey={[props.fieldKey, 'age']}
        >
        <InputNumber />
      </Form.Item>
      <Form.Item >
        <CloseOutlined onClick={() => remove(name)} />
      </Form.Item>
    </Space>
  );
}


export default function FormList() {
  const users = [{
    label: '1',
    age: 22
  }, {
    label: '2'
  }];

  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then(values => {
      console.log(`values`, values);
    })
  }
  useEffect(() => {
    form.setFieldsValue({ users: users })
  }, []);
  return (
    <div>

      <Form form={form}>
        <Form.List name='users'>
          {(fields, { add, remove }) =>
            <>
              {fields.map(field =>
                <>
                  <ItemRow {...field} remove={remove} />
                  <CloseOutlined onClick={() => remove(field.name)} />
                </>
              )}

              <Button block onClick={() => { add() }}>添加一行</Button>
            </>
          }
        </Form.List>
        <Form.Item>
          <Button type='primary' onClick={handleSubmit}>提交</Button>
        </Form.Item>
      </Form>
    </div >
  )
}

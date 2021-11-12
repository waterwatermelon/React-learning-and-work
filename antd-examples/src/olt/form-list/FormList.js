import { useState } from 'react';
import { Form, Input, Button, Space, InputNumber, Row, Divider, Card } from 'antd'
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import ReactJson from 'react-json-view';

function ItemRow(props) {
  const { name, remove } = props;
  return (
    <Row>

      <Space>
        <Form.Item
          preserve={false}
          label='name'
          name={[name, 'name']}
          fieldKey={[props.fieldKey, 'name']}
        // rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          preserve={false}
          label='age'
          name={[name, 'age']}
          fieldKey={[props.fieldKey, 'age']}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item  >
          <CloseOutlined title='删除' onClick={() => remove(name)} />
        </Form.Item>
      </Space>
    </Row>

  );
}


export default function FormList() {


  const [form] = Form.useForm();
  const [result, setResult] = useState({});

  const handleSubmit = () => {
    const values = form.getFieldsValue();
    setResult(values);
  }
  const handleValuesChange = (change, allValues) => {
    console.log('handleValuesChange ', change)
    console.log('handleValuesChange ', allValues)
  }

  const handleFieldsChange = change => {
    console.log('handleFieldsChange', change)
  }
  const handleFinish = values => {
    console.log('Received values of form:', values);
  }
  return (
    <div>
      <Form form={form} preserve={false} onFinish={handleFinish} onValuesChange={handleValuesChange} onFieldsChange={handleFieldsChange}>
        <Form.Item label='group' name='group'>
          <Input />
        </Form.Item>
        <Card title='user list'>
          <Form.List name='users'>
            {(fields, { add, remove }) =>
              <>
                {fields.map(field =>
                  <>
                    <ItemRow {...field} remove={remove} key={field.name} />
                    {/* <CloseOutlined title='删除' onClick={() => remove(field.name)} /> */}
                  </>
                )}

                <Button icon={<PlusOutlined />} onClick={() => { add() }}>添加一行</Button>
              </>
            }
          </Form.List>
        </Card>

        <Form.Item style={{ marginTop: '20px'}}>
          <Button type='primary' onClick={handleSubmit}>提交</Button>
        </Form.Item>
      </Form>

      <Divider />
      <ReactJson src={result} />
    </div >
  )
}

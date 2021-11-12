import { useImperativeHandle, useRef, useState, useEffect, forwardRef } from 'react';
import { Checkbox, Form, Input, Space, Empty, Button, Card } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import CommonFormItem from '../../../components/CommonForm/CommonFormItem';
import './sip-form.scss';

function IdLabel({ value }) {
  return <> {value} </>;
}

// SIP线路列表
function SipRow(props) {
  const { name, remove } = props;
  const layout = { labelAlign: 'right', labelCol: 'auto', wrapperCol: 'auto'};
  return (
    <Space >
      <Form.Item  {...layout } label='标识' name={[name, 'id']}>
        <IdLabel />
      </Form.Item>
      <Form.Item  {...layout } label='启用' name={[name, 'enable']}>
        <Checkbox />
      </Form.Item>
      <Form.Item  {...layout } label='SIP账号' name={[name, 'uri']}>
        <Input />
      </Form.Item>
      <Form.Item  {...layout } label='用户名' name={[name, 'username']}>
        <Input />
      </Form.Item>
      <Form.Item  {...layout } label='密码' name={[name, 'password']}>
        <Input.Password />
      </Form.Item>
      <Form.Item >
        <MinusCircleOutlined title={'删除'} onClick={() => remove(name)} />
      </Form.Item>
    </Space>
  );
}
// 使用formlist 创建linelist
function FormList() {
  return (
    <Card>
      <Form.List name='lineList'>
        {(fields, { add, remove }) => {
          return (

            <>
              {
                fields.length !== 0
                  ?
                  fields.map(field =>
                    <SipRow  {...field} remove={remove} />
                  )
                  : <Empty />
              }
              <Button block type='dashed' icon={< PlusOutlined />} onClick={() => add()}>添加一条数据</Button>
            </>
          )
        }}
      </Form.List>
    </Card>
  )

}
const DEFAULT_CONFIG = {
  lineList: [],
};

function SipForm(props, ref) {

  const { labelCol, wrapperCol, initialValues, disable } = props;
  let lineListRef = useRef();
  const [form] = Form.useForm();
  const [, setSipConfig] = useState(DEFAULT_CONFIG);
  const [digitalMapEnable, setDigitalMapEnable] = useState(false);
  const handleValuesChange = (change, all) => {
    setDigitalMapEnable(all.digitMapEnable);
  };

  const portvalidator = (_, value) => {
    const reg = /\d+/;
    if (!value) {
      return Promise.resolve();
    }
    if (!reg.test(value)) {
      return Promise.reject('请输入数字');
    }

    const port = Number(value);
    if (port < 0 || port > 65535) {
      return Promise.reject('端口取值范围不合法');
    }
    return Promise.resolve();
  };

  const setValues = (values) => {
    // 设置表单元素的值
    form.setFieldsValue(values);
    // 设置表单模式
    setSipConfig(values);
    setDigitalMapEnable(values.digitMapEnable);
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        resetFields: () => {
          // 重置表单元素的值
          form.resetFields();
          // 重置表单模式
          setSipConfig(DEFAULT_CONFIG);
          setDigitalMapEnable(false);
        },
        setFieldsValue: (values) => {
          setValues(values);
        },
        getFieldsValue: () => {
          const baseInfo = form.getFieldsValue();
          const lineList = lineListRef.current.getFieldsValue();
          return { ...baseInfo, lineList: lineList.list };
        },
        validateFields: () => {
          return new Promise((res, rej) => {
            form.validateFields()
              .then(values => {
                res(values);
              })
              .catch(e => rej(e));
          });
        }

      };
    },
    [],
  );
  useEffect(() => {
    if (initialValues) {
      setValues(initialValues);
    }
  }, []);
  return (
    <div>
      <Form
        form={form}
        labelAlign='left'
        labelCol={labelCol ?? { span: 4 }}
        wrapperCol={wrapperCol ?? { span: 12 }}
        onValuesChange={handleValuesChange}
      >

        <CommonFormItem schema={[{
          form: {
            formLabel: '启用VoIP',
            name: 'sipEnable',
          },
          content: {
            type: 'checkbox',
            disabled: disable,
          }
        }, {
          form: {
            formLabel: '注册服务器地址',
            name: 'registrarServer',
            rules: [{
              required: true,
            }]
          },
          content: {
            type: 'text',
            disabled: disable,

          }
        }, {
          form: {
            formLabel: '注册服务器端口',
            name: 'registrarServerPort',
            tooltip: '(0~65535)',
            rules: [{
              required: true,
            }, {
              validator: portvalidator,
            }],
          },
          content: {
            type: 'text',
            disabled: disable,
          }
        }, {
          form: {
            formLabel: 'SIP服务器地址',
            name: 'proxyServer',
            rules: [{
              required: true,
            }]
          },
          content: {
            type: 'text',
            disabled: disable,

          }
        }, {
          form: {
            formLabel: 'SIP服务器端口',
            name: 'proxyServerPort',
            tooltip: '(0~65535)',
            rules: [{
              required: true,
            }, {
              validator: portvalidator,
            }],
          },
          content: {
            type: 'text',
            disabled: disable,

          }
        }, {
          form: {
            formLabel: '数图开关',
            name: 'digitMapEnable',
          },
          content: {
            type: 'checkbox',
            disabled: disable,

          },
        }, {
          form: {
            formLabel: '数图内容',
            name: 'digitMap',
            rules: [{
              required: digitalMapEnable
            }]
          },
          content: {
            type: 'textarea',
            disabled: disable,
            autoSize: {
              minRows: 5,
            }
          },
        }, {
          form: {
            formLabel: 'SIP账号配置',
          },
          content: {
            value: ''
          }
        }]}
        />
        <FormList />
      </Form>
    </div>
  );
}

export default forwardRef(SipForm);
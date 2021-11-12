import { Form, Spin } from "antd";
import { useState, useImperativeHandle, forwardRef, useEffect } from "react";
import CommonFormItem from '../../../components/CommonForm/CommonFormItem';


export const BEACONTYPE_LIST = [{
  title: 'None',
  value: 'None',
}, {
  title: 'WPA',
  value: 'WPA',
}, {
  title: 'WPA2',
  value: 'WPA2',
}, {
  title: 'WPA/WPA2',
  value: 'WPA/WPA2',
},];

export const TRANSMITPOWER_LIST = [{
  title: '20%',
  value: 20,
}, {
  title: '40%',
  value: 40,
}, {
  title: '60%',
  value: 60,
}, {
  title: '80%',
  value: 80,
}, {
  title: '100%',
  value: 100,
},];


function WifiForm(props, ref) {
  const { initialValues, disable } = props;
  const [form] = Form.useForm();
  const [enable, setEnable] = useState(true);

  const handleValuesChange = (change) => {
    if (typeof change.enable === 'boolean') {
      setEnable(change.enable);
    }
  };

  const setValues = (values) => {
    form.setFieldsValue(values);
    setEnable(values.enable);
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        validateFields: () => {
          return form.validateFields();
        },

        setFieldsValue: (values) => {
          setValues(values);
          setEnable(values.enable);
        },
      };
    },
    [],
  );

  useEffect(() => {
    if (initialValues) {
      setValues(initialValues);
    }
  }, [initialValues]);

  return (
    <div>
      <Spin spinning={false} >
        <Form
          className='sn-form'
          form={form}
          labelAlign='left'
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onValuesChange={handleValuesChange}
          initialValues={{
            enable: true,
            transmitPower: TRANSMITPOWER_LIST[0].value,
          }}
        >
          <CommonFormItem
            schema={[{
              form: {
                formLabel: 'SSID号',
                name: 'ssidId'
              },
              content: {
                type: 'text',
                disabled: true,
              },
            }, {
              form: {
                formLabel: '是否启用',
                name: 'enable'
              },
              content: {
                type: 'checkbox',
                disabled: disable,
              },
            }, {
              form: {
                formLabel: '双频合一',
                name: 'isDualMerged'
              },
              content: {
                type: 'checkbox',
                disabled: disable,
              },
            }, {
              form: {
                formLabel: 'SSID名称',
                name: 'ssidName',
                rules: [{
                  required: enable
                }]
              },
              content: {
                type: 'text',
                disabled: disable,
              },
            }, {
              form: {
                formLabel: '加密方式',
                name: 'beaconType',
                rules: [{
                  required: enable,
                }]
              },
              content: {
                type: 'select',
                disabled: disable,
                selectSchema: BEACONTYPE_LIST,
              },
            }, {
              form: {
                formLabel: 'WPA密码',
                name: 'passKey',
                tooltip: '密码长度为8-63位字符',
                rules: [{
                  type: 'string',
                  min: 8,
                  max: 63
                }, {
                  required: enable,
                }]
              },
              content: {
                type: 'password',
                disabled: disable,
              },
            }, {
              form: {
                formLabel: '发射功率',
                name: 'transmitPower',
                rules: [{
                  required: enable,
                }]
              },
              content: {
                type: 'select',
                disabled: disable,
                selectSchema: TRANSMITPOWER_LIST
              },
            },]} />
        </Form>

      </Spin>
    </div>
  );
}


export default forwardRef(WifiForm);
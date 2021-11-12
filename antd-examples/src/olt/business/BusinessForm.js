import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Form, Checkbox, Collapse, Button, Space, Divider } from "antd";
import ReactJson from 'react-json-view';
import SipConfig from './SipConfig';
import WifiConfig from './WifiConfig';
import { isExistReject, } from '../../util/util';
import { SUB_TASK_MODAL_MODE } from './schema';
import './business.scss';

const businessFormMap = {
  voip: SipConfig,
  wifi: WifiConfig,
};

const BUSINESS_MAP = {
  VOIP: 'voip',
  WIFI: 'wifi',
};

const BUSINESS_CHECKBOX_GROUP = [
  {
    label: '语音配置',
    value: 'voip',
  },
  {
    label: '无线网络',
    value: 'wifi',
  }];

  
// mode 表单模式,编辑模式 只读模式
function BusinessForm(props, ref) {
  const { initialValues, mode } = props;
  const formRefs = useRef(new Array(BUSINESS_CHECKBOX_GROUP.length));
  const [form] = Form.useForm();

  // 设置业务复选框属性(disable等)
  const [checkboxList, setCheckboxList] = useState(BUSINESS_CHECKBOX_GROUP);

  // 业务清单
  const [businessList, setBusinessList] = useState(BUSINESS_CHECKBOX_GROUP.map(item => ({
    ...item,
    isChecked: false,
    data: [],
  })));

  const [result, setResult] = useState({});

  const handleChangeDeviceBusiness = (checkedValues) => {
    const businessListTemp = businessList.slice();
    for (let i = 0; i < businessListTemp.length; i++) {
      const business = businessListTemp[i];
      const isChecked = checkedValues.find(checkValue => checkValue === business.value);
      business.isChecked = Boolean(isChecked);
    }

    setBusinessList(businessListTemp);
  };

  const handleReset = () => {
    // 遍历每个业务表单
    const len = formRefs.current.length;
    for (let i = 0; i < len; i++) {
      const businessForm = formRefs.current[i];
      // 跳过空对象
      businessForm && businessForm.resetFields();
    }

  }
  const handleSubmit = () => {
    const promises = [];
    for (let i = 0; i < formRefs.current.length; i++) {
      const form = formRefs.current[i];
      if (form) {
        promises.push(form.validateFields());
      } else {
        promises.push(Promise.resolve([]));
      }
    }
    Promise.allSettled(promises)
      .then(values => {
        const data = {};
        // 所有表单校验都通过
        if (!isExistReject(values)) {
          for (let i = 0; i < BUSINESS_CHECKBOX_GROUP.length; i++) {
            const business = BUSINESS_CHECKBOX_GROUP[i];
            data[business.value] = values[i]?.value || [];
          }
        }
        setResult(data);
      })
      .catch(e => {
        console.error(e);
      });
  }
  useImperativeHandle(
    ref,
    () => {
      return {
        getFieldsValue: () => {
          return businessList;
        },
        validateFields: () => {
          return new Promise((res, rej) => {
            form.validateFields()
              .then(() => {
                const promises = [];
                for (let i = 0; i < formRefs.current.length; i++) {
                  const form = formRefs.current[i];
                  if (form) {
                    promises.push(form.validateFields());
                  } else {
                    promises.push(Promise.resolve([]));
                  }
                }
                Promise.allSettled(promises)
                  .then(values => {
                    const data = {};
                    if (!isExistReject(values)) {
                      for (let i = 0; i < BUSINESS_CHECKBOX_GROUP.length; i++) {
                        const business = BUSINESS_CHECKBOX_GROUP[i];
                        data[business.value] = values[i]?.value || [];
                      }
                      res(data);
                    }
                    else {
                      rej();
                    }
                  })
                  .catch(e => {
                    console.error(e);
                  });
              })
              .catch((err) => {
                console.error(err);
                rej(err);
              });

          });

        },
        resetFields: () => {
          form.resetFields();
          const businessListTemp = BUSINESS_CHECKBOX_GROUP.map(item => ({
            ...item,
            isChecked: false,
            data: [],
          }));
          setBusinessList(businessListTemp);
        },
      };
    },
    [],
  );

  useEffect(() => {
    // 处理业务配置复选框初始值
    if (initialValues) {
      const businessListTemp = [];
      const keys = Object.keys(initialValues);
      const checkedKeys = []; // 选中的业务

      for (let i = 0; i < BUSINESS_CHECKBOX_GROUP.length; i++) {
        const businessItem = BUSINESS_CHECKBOX_GROUP[i];
        let isChecked = keys.find(key => key === businessItem.value && initialValues[key]?.length);
        // NOTE: 特殊处理 wifi全局开关
        if (businessItem.value === BUSINESS_MAP.WIFI) {
          if (initialValues.apModuleEnable) {
            isChecked = true;
          }
        }

        if (isChecked) {
          checkedKeys.push(businessItem.value);
        }

        const businessItemTemp = {
          ...businessItem, // label、value
          isChecked: Boolean(isChecked),
          data: initialValues[businessItem.value] ?? [],
        };
        if (businessItemTemp.value === BUSINESS_MAP.WIFI) {
          businessItemTemp.apModuleEnable = initialValues.apModuleEnable;
        }
        businessListTemp.push(businessItemTemp);
      }
      setBusinessList(businessListTemp);
      form.setFieldsValue({ business: checkedKeys });
    }
  }, [initialValues]);


  return (
    <div className='business-form'>
      <Form
        form={form}
        labelAlign='left'
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 20 }}>
        <Form.Item
          label='选择业务'
          name='business'
        >
          <Checkbox.Group
            disabled={mode === SUB_TASK_MODAL_MODE.VIEW}
            options={checkboxList}
            onChange={handleChangeDeviceBusiness} />
        </Form.Item>
      </Form>


      {
        businessList.map((business, idx) => {
          const C = businessFormMap[business.value];
          const initialValues = business.data;
          // other param
          return (
            business.isChecked ?
              <Collapse className='business-item' defaultActiveKey={business.value}>
                <Collapse.Panel header={business.label} key={business.value} >
                  {C && <C initialValues={initialValues}
                    ref={c => formRefs.current[idx] = c}
                    // 只读模式下 disable为true
                    disable={mode === SUB_TASK_MODAL_MODE.VIEW}
                  />}
                </Collapse.Panel>
              </Collapse>

              : ''
          );
        })
      }
      <Divider />
      <Space>
        <Button onClick={handleReset}>重置</Button>
        <Button type='primary' onClick={handleSubmit}>提交</Button>
      </Space>
      <Divider />
      <ReactJson src={result} />
    </div>
  );
}

export default forwardRef(BusinessForm);
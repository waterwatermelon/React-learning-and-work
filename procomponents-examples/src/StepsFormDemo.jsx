import {
  ProCard,
  ProForm,
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
} from '@ant-design/pro-components';
import { Button, Divider, Form, Input, message } from 'antd';
import { useRef } from 'react';

const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

function MyFormContent(props) {
  console.log('[MyFormContent] props', props);
  const { formRef } = props;
  const handleGetFormValue = () => {
    console.log('formRef', formRef);
    const values = formRef.current.getFieldsValue();
    console.log('values', values);
  };
  return <>
    <h2>my form content</h2>
    <Button onClick={handleGetFormValue}>获取表单的值</Button>
  </>;
}

export default function StepsFormDemo() {
  const formRef = useRef();

  const handleFormOver = (data) => {
    console.log('StepsForm [onFinish] form over');
    console.log('data', data);
  };

  const handleTestFormRef = () => {
    console.log('formRef', formRef)
    const values = formRef.current.getFieldsValue();
    console.log('values', values);
  }
  // 
  const props = {
    style: {},
    className: 'class-one class-two',
    onFinish: () => { },
    steps: [{
      name: '',
      title: '',
      onFinish: () => { },
      schema: [{
        label: '',
        name: '',
      }],
    }]
  }

  return (
    <ProCard>
      <StepsForm
        formRef={formRef}
        onCurrentChange={n => console.log('current is ', n)}
        onFinish={handleFormOver}
      // stepsRender={(steps, dom) => {
      //   console.log('steps', steps);
      //   console.log('dom', dom);
      //   return dom;
      // }}
      // stepFormRender={form => {
      //   // 每个StepForm内部的children
      //   console.log('[stepFormRender] form', form);
      //   return <>
      //     <h2>拓扑图</h2>
      //   </>;
      // }}
      // stepsFormRender={
      //   (form, submitter) => {
      //     console.log('form', form);
      //     return <div>
      //       <h2>form</h2>
      //     </div>;
      //   }
      // }
      >
        <StepsForm.StepForm
          title='step1'
          name='one'
          onFinish={values => {
            console.log('[onFinish] values', values);
            return true;
          }}>
          <ProFormText
            name='title'
            label='标题'
            rules={[{
              required: true,
            }]} />
          <ProFormText
            name='note'
            label='笔记'
          />
          <Form.Item
            label='form.item'
            name='form.item'
            rules={[{
              required: true,
            }]}>
            <Input />
          </Form.Item>
        </StepsForm.StepForm>
        <StepsForm.StepForm
          onFinish={values => {
            console.log('[onFinish] values', values);
            return true;
          }}>
          <ProFormText
            name='title'
            label='标题' />
        </StepsForm.StepForm>
        <StepsForm.StepForm
          onFinish={values => {
            console.log('[onFinish] values', values);
            return true;
          }}>
          <ProFormText
            name='remark'
            label='备注' />
        </StepsForm.StepForm>
        <StepsForm.StepForm
          onFinish={values => {
            console.log('[onFinish] values', values);
            return true;
          }}
        // stepFormRender={form => {
        //   console.log('[stepFormRender] form', form);
        //   return <>
        //     <h2>拓扑图</h2>

        //   </>;
        // }}
        >
          <MyFormContent title={'topo'} topoId={22} formRef={formRef} />
        </StepsForm.StepForm>
      </StepsForm>
      <Divider />
      <Button onClick={handleTestFormRef}>formRef test</Button>
    </ProCard >
  );
};
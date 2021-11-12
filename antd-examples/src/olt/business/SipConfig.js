import { useRef, forwardRef, useImperativeHandle } from 'react';
import SipForm from './form/SipForm';

function SipConfig(props, ref) {
  const { initialValues, disable } = props;

  const formRef = useRef();


  useImperativeHandle(
    ref,
    () => {
      return {
        resetFields: () => {
          formRef.current.resetFields();
        },
        getFieldsValue: () => {
          return formRef.current.getFieldsValue();
        },
        validateFields: () => {
          return new Promise((res, rej) => {
            formRef.current.validateFields()
              .then(values => {
                res([values]);
              })
              .catch(() => rej());
          });
        },
      };
    },
    [],
  );

  return (

    <SipForm
      ref={formRef}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={initialValues[0]}
      disable={disable} />
  );
}
export default forwardRef(SipConfig);
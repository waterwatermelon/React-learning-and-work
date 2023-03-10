import React from 'react';
import { Form, Button, Space, Row, Col } from "antd";
import CommonFormItem from "../CommonForm/CommonFormItem";
import './custom-tool.scss'

export function Search(props) {
  const { schema, submit, layout, name } = props;
  const [form] = Form.useForm();

  const searchSubmit = () => {
    if (submit) {
      submit(form.getFieldsValue());
    };
  };

  const onReset = () => {
    form.resetFields();
    const values = form.getFieldsValue();
    if (submit) {
      submit(values);
    };
  };

  return (
    <Form name={name} form={form} onFinish={searchSubmit} {...layout}    >
      <Row gutter={[16, 0]} >
        <CommonFormItem schema={schema} span={8}></CommonFormItem>
        <Col className="search-btn-container"  >
          <Form.Item >
            <Space className="search-btn">
              <Button id='reset-btn' type="default" htmlType="button" onClick={onReset}>
                重置
              </Button>
              <Button id='search-btn' type="primary" htmlType="submit">
                搜索
              </Button>
            </Space>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}


export function Operation(props) {
  const { schema, ...rest } = props;
  return (
    <Space {...rest}>
      {schema.map((item, index) => {
        const { clickFunc, type, ...rest } = item;
        return (
          <Button onClick={clickFunc} type={type} key={index} {...rest}>
            {item.name}
          </Button>
        );
      })}
    </Space>
  );
}

export function SearchBox(props) {
  const {
    searchSchema = [],
    searchSubmit,
    layout = {},
    name = 'search'
  } = props;

  return (
    <div className={`search_box`}>
      <Search submit={searchSubmit} schema={searchSchema} layout={layout} name={name} />
    </div>
  );

}
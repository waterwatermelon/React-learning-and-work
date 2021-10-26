import { useState, useEffect } from 'react';
import { Form, Button, Space, Row, Col, Popover } from "antd";
import { DownOutlined, UpOutlined, FilterOutlined } from '@ant-design/icons';
import CommonFormItem from "../CommonForm/CommonFormItem";
import './custom-tool.scss'

export function Search(props) {
  const { schema: defaultSchema, submit, layout, name, span = 8 } = props;

  const [form] = Form.useForm();

  const [fold, setFold] = useState();
  const [schema, setSchema] = useState(defaultSchema);
  const handleToggleFold = () => {
    const nextFold = !fold;
    if (nextFold) {
      setSchema(defaultSchema.slice(0, 3));
    } else {
      setSchema(defaultSchema);
    }
    setFold(nextFold);
  };
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
    <Form className='search-form' name={name} form={form} onFinish={searchSubmit} {...layout}>
      <Row gutter={[16, 0]} >
        <CommonFormItem schema={schema} span={span}></CommonFormItem>
        <Col className="search-btn-container"  >
          <Form.Item >
            <Space className="search-btn">
              <Button id='reset-btn' type="default" htmlType="button" onClick={onReset}>
                重置
              </Button>
              <Button id='search-btn' type="primary" htmlType="submit">
                搜索
              </Button>
              <Button type='link' onClick={handleToggleFold} icon={fold ? <DownOutlined /> : <UpOutlined />}>{fold ? '展开' : '折叠'}</Button>
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
    collapse = false,

    searchSchema = [],
    searchSubmit,

    span: colSpan = 8,
    layout = {},
    name = 'search',
    // popover
    // { style, innerStyle , className, trigger, getPopupContainer }
    popoverStyle = {
      width: '1200px'
    },
    popoverInnerStyle = {},
  } = props;

  const [span, setSpan] = useState();
  useEffect(() => {

    const spans = [3, 4, 6, 8, 12, 24];
    if (spans.indexOf(colSpan) === -1) {
      console.warn(`[SearchBox] span的取值范围为 ${spans}`);
      // adjust span
      for (let i = 0; i < spans.length; i++) {
        if (colSpan < spans[i]) {
          setSpan(spans[i]);
          break;
        }
      }
    } else {
      setSpan(colSpan);
    }
  }, [colSpan]);
  return (
    <div className={`search_box`}>
      {collapse
        ?
        <div className='search-box-collapse-box'>
          <Popover
            arrowPointAtCenter={true}
            overlayStyle={popoverStyle}
            overlayInnerStyle={popoverInnerStyle}
            placement='bottomRight'
            content={
              <Search
                submit={searchSubmit}
                schema={searchSchema}
                layout={layout}
                name={name}
                span={span} />
            }
            trigger='click'
            getPopupContainer={trigger => trigger.parentNode}
          >
            <Button icon={<FilterOutlined />}>
              过滤
            </Button>
          </Popover>
        </div>
        : <Search submit={searchSubmit} schema={searchSchema} layout={layout} name={name} span={span} />
      }
    </div>
  );

}
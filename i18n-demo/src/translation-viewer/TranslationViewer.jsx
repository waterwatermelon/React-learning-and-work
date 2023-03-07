import { Button, Card, Checkbox, Col, Divider, Form, Input, Layout, List, Row, Select, Space, Typography } from 'antd';
import { AlertFilled } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import i18n from '../lang/i18n';
import './translation-viewer.css';

// const allResource = [{
//   key: 'title',
//   translation: [{ lang: 'zh_cn', value: '标题' }]
// }];

function TranslationViewer() {
  const colSpan = 6;
  const languageList = ['zh_cn', 'en_us'];

  const [form] = Form.useForm();
  const [allResource, setAllResource] = useState([]);
  const [displayList, setDisplayList] = useState([]);

  // tool: 获取嵌套对象的key
  function flatObject(val, keys = []) {
    return _.isObject(val)
      ? _.flatMap(val, (v, k) => flatObject(v, [...keys, k]))
      : { key: keys.join('.'), value: val };
  }

  function getResource() {
    // ① collect
    const languages = ['zh_cn', 'en_us'];
    const collectList = []; // { key, lang, translation }
    languages.forEach(lang => {
      const resourceBundle = i18n.getResourceBundle(lang);
      const schemas = flatObject(resourceBundle);
      schemas.forEach(schema => {
        const { key, value } = schema;
        collectList.push({
          key,
          translation: value,
          lang,
        });
      });
    });

    // ② aggregate
    const aggregateList = [];
    collectList.forEach(resource => {
      const { key } = resource;
      const index = aggregateList.findIndex(e => e.key === key);

      if (index === -1) {

        const translation = [];
        languageList.forEach(lang => {
          const collectItem = collectList.find(e => e.key === key && e.lang === lang);
          translation.push({
            lang: lang,
            value: collectItem?.translation,
            isLoss: !Boolean(collectItem),
          });
        });
        aggregateList.push({
          key,
          translation,
        });
      }
    });
    setAllResource(aggregateList);
    setDisplayList(aggregateList);
  }

  function filter() {
    const condition = form.getFieldsValue();
    let filterList = allResource.slice();
    if (condition.key) {
      filterList = filterList.filter(e => e.key.includes(condition.key));
    }
    console.log('filterList', filterList);
    if (condition.loss) {
      filterList = filterList.filter(e => e.translation.some(t => t.isLoss))
    }
    setDisplayList(filterList);

  }

  useEffect(() => {
    getResource();
  }, []);
  return (
    <Layout>
      <Form className='list' form={form} >
        <Row gutter={[8, 8]}>
          <Col span={colSpan}>
            <Form.Item label='key' name={'key'}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item label='loss' valuePropName='checked' name={'loss'}>
              <Checkbox />
            </Form.Item>
          </Col>
          <Col>
            <Button htmlType='submit' onClick={filter}>过滤</Button>
          </Col>
        </Row>
      </Form>
      <Divider />
      {/* List */}
      <List
        className='list'
        dataSource={displayList}
        renderItem={(resource) => {
          const { translation, key } = resource;
          return (<Card className='mt-12' key={key}>
            <Row>
              <Col span={6}>
                <Space>
                  <Typography.Text strong>
                    key:
                  </Typography.Text>
                  {resource.key}
                </Space>
              </Col>
              <Col span={18}>
                {
                  translation.map(translate => {
                    return <div>
                      [{translate.lang}]: {translate.isLoss
                        ? <Typography.Text type='danger'> <AlertFilled /> LOSS</Typography.Text>
                        : translate.value}
                    </div>
                  })
                }
              </Col>
            </Row>
          </Card>)
        }}
        pagination={{
          size: 10,
        }} />
    </Layout>
  )
}

export default TranslationViewer;
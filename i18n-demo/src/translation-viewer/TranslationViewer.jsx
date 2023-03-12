import { Button, Card, Checkbox, Col, Divider, Form, Input, Layout, List, Row, Select, Space, Typography } from 'antd';
import { AlertFilled } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import i18n from '../lang/i18n';
import './translation-viewer.css';
import extractTranslation from '../extractTranslation/translation';
console.log(extractTranslation);
// const allResource = [{
//   key: 'title',
//   translation: [{ lang: 'zh_cn', value: '标题' }]
// }];

function TranslationViewer() {
  const colSpan = 6;
  const languages = ['zh_cn', 'en_us'];

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
    const aggregateList = [];

    const flatExtractKeys = flatObject(extractTranslation).map(e => e.key);

    flatExtractKeys.forEach((extractKey) => {
      const translations = [];
      languages.forEach(lang => {
        const resourceBundle = i18n.getResourceBundle(lang);
        const flatResources = flatObject(resourceBundle);
        const resourceItem = flatResources.find(e => e.key === extractKey);
        if (resourceItem) {
          translations.push({
            lang,
            value: resourceItem.value,
          });
        } else {
          translations.push({
            lang,
            isLoss: true,
          });
        }
      });
      aggregateList.push({
        key: extractKey,
        translations,
      })
    });
    setAllResource([...aggregateList,]);
    setDisplayList([...aggregateList,]);
  }

  function filter() {
    const condition = form.getFieldsValue();
    let filterList = allResource.slice();
    if (condition.key) {
      filterList = filterList.filter(e => e.key.includes(condition.key));
    }
    if (condition.loss) {
      filterList = filterList.filter(e => e.translations.some(t => t.isLoss))
    }
    setDisplayList(filterList);
  }

  useEffect(() => {
    getResource();
  }, []);
  return (
    <Layout>
      <Card className='search-box'>
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
          <Row>
            {/* TODO: */}
            {/* <Button> 列表 视图</Button> */}
            {/* <Button> JSON 视图</Button> */}
          </Row>
        </Form>
      </Card>
      <Divider />
      {/* List */}
      <List
        className='list'
        dataSource={displayList}
        renderItem={(resource) => {
          const { translations, key } = resource;
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
                  translations.map(translate => {
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
          total: displayList.length,
          showTotal: (total, range) => `共${total}项数据`,
        }} />
    </Layout>
  )
}

export default TranslationViewer;
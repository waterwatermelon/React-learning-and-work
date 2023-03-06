import { Card, Col, Divider, Form, Input, Row, Select, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import i18n from './lang/i18n';

function TranslationViewer() {
  const colSpan = 6;
  const [languageList, setLanguageList] = useState([]);
  const [selectedLang, setSelectLang] = useState('');
  const allResource = [{
    key: 'title',
    translation: {
      zh_cn: '标题',
      en: 'title',
    }
  }];
  // 
  function initData() {
    const languageList = i18n.languages.map(e => ({ label: e, value: e }));
    languageList.unshift(({
      label: 'ALL',
      value: '',
    }));
    setSelectLang('');
    setLanguageList(languageList);
  }

  useEffect(() => {
    initData();
  }, []);
  return (
    <Card>
      <Form>
        <Row gutter={[8, 8]}>
          <Col span={colSpan}>
            <Form.Item label='语言'>
              <Select options={languageList} value={selectedLang}/>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Divider />
      <Card >
        <Row>
          <Col span={6}>
            <Typography.Text strong>key</Typography.Text>:title
          </Col>
          <Col span={18}>
            <div>
              [zh_cn]: 标题
            </div>
            <div>
              [en_]: title
            </div>
          </Col>
        </Row>
      </Card>

      {
        allResource.map(resource => {
          return (<Card > <Row>
            <Col span={6}>
              <Typography.Text strong>key</Typography.Text>:{resource.key}
            </Col>
            <Col span={18}>
              <div>
                [zh_cn]: {resource.translation['zh_cn']}
              </div>
              <div>
                [en]: {resource.translation['en']}
              </div>
            </Col>
          </Row>
          </Card>)
        })
      }
    </Card>
  )
}

export default TranslationViewer;
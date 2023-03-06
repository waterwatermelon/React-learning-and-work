import { useState } from 'react';
import MyTable from './table';
import { useTranslation } from 'react-i18next';
import * as antdLanguages from './lang/antd.local.js';
import { Button, ConfigProvider, Divider, Modal, Select } from 'antd';
import MyForm from './MyForm';
import MyTitle from './MyTitle';
import { SearchBox } from 'sn-ui-common-components';
import './App.css';

// TODO:处理组件库的本地偏好
const languageList = ['zh_cn', 'en_us'].map(e => ({ label: e, value: e }))

function ExamplePage() {
  const { i18n } = useTranslation();
  const [locale, setLocale] = useState(languageList[0].value);
  const [visible, setVisible] = useState(false);

  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleChange = e => {
    i18n.changeLanguage(e);
    setLocale(e)
  };
  return (
    <div>
      {/* 切换antd的语言设置*/}
      <ConfigProvider locale={antdLanguages[locale]}>
        <Select value={locale} onChange={handleChange} options={languageList} />
        <SearchBox />
        <Divider />
        <MyTitle />
        <Button onClick={handleOpenModal}>打开模态框</Button>
        <MyTable />
        <Modal
          title='modal'
          visible={visible}
          onCancel={() => {
            setVisible(false)
          }}>
        </Modal>
        <MyForm />
      </ConfigProvider>
    </div>
  );
}

export default ExamplePage;

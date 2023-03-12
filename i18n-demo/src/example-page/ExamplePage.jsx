import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as antdLanguages from '../lang/antd.local.js';
import { Button, ConfigProvider, Divider, Modal, Select } from 'antd';
import MyTitle from './MyTitle';
import MyForm from './MyForm';
import MyTable from './table';
// import { SearchBox } from 'sn-ui-common-components';
// TODO:处理组件库的本地偏好
const languageList = ['zh_cn', 'en_us'].map(e => ({ label: e, value: e }))

function ExamplePage() {
  const { i18n } = useTranslation();
  const [locale, setLocale] = useState(languageList[0].value);

  const handleChange = e => {
    console.log('change to', e);
    console.log(i18n.getResourceBundle(e));
    i18n.changeLanguage(e);
    setLocale(e)
  };
  return (
    <div>
      {/* 切换antd的语言设置*/}
      <ConfigProvider locale={antdLanguages[locale]}>
        <Select value={locale} onChange={handleChange} options={languageList} />
        {/* <SearchBox /> */}
        <Divider />
        
        <MyTitle />
        <MyTable />
        
        <MyForm />
      </ConfigProvider>
    </div>
  );
}

export default ExamplePage;

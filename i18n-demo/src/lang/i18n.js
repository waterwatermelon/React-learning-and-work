import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as languages from './locale';
import * as snUiLocales from 'sn-ui-common-components/dist/locale';
console.log('snUiLocales', snUiLocales);
// const componentsLocale = {
//   'zh_cn': {
//     SearchBox: {
//       search: '搜索',
//       reset: '重置'
//     }
//   }
// };
const filenames = Object.keys(languages);
// 获取资源 getResource
const resources = {};
for (let i = 0; i < filenames.length; i++) {
  const languageName = filenames[i];
  resources[languageName] = {
    translation: {
      ...languages[languageName],
      ...snUiLocales[languageName],
    }
  };
};

i18n
  .use(initReactI18next)
  .init({
    resources: resources,
    // 设置默认语言,取浏览器的默认语言
    lng: navigator.language.replace('-', '_').toLowerCase(),
  });


export default i18n;

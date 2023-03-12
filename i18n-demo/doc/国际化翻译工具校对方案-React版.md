---
author:sfj
---

# 国际化翻译工具校对方案

## 使用工具
- react
- react-i18next
- i18next
- @babel/core、@babel/cli babel命令行工具 
- babel-plugin-i18next-extract 翻译资源扫描器

## 设计
npm脚本说明：
- start 启动项目
- build 编译项目
- lang:extract 使用babel插件`i18next-extract`,扫描代码中翻译所引用的key。


翻译资源检查：
1.get used keys >> translation.json >> keyList: string[]
2.get allResource >> allResource [{lang, key, translation}]
3.keyList.foreach >> checkResult
3.1 langs.foreach 判断当前key是否的每种lang缺少翻译


项目结构
```
├── .babelrc babel配置文件
├── doc 设计文档目录
├── lib 同样引用了i18next的第三库
├── README.md
└── src
    ├── App.js
    ├── example-page
    │   └── ExamplePage.jsx
    ├── extractTranslation
    │   └── translation.json
    ├── lang
    │   ├── antd.local.js antd的翻译资源
    │   ├── i18n.js
    │   └── locale 本应用所需的翻译资源
    ├── translation-viewer 翻译检查
    └── util
        └── util.js
```
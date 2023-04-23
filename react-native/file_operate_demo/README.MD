

## 工具
- react-native-file-selector：文件选择可视化
- react-native-file-access：访问文件系统相关API
- rn-fetch-blob：
    - 以二进制格式处理网络请求，并与文件系统打通
    - 基于react-native-fetch-blob改造
## 实现功能

```
├── App.jsx
└── app
    ├── config.js 文件目录等配置信息
    ├── FetchBlobTest.jsx react-native-file-access功能测试
    ├── FileAccessTest.jsx react-native-file-selector功能测试 
    ├── FileSelectorTest.jsx react-native-file-selector功能测试 
    ├── FetchBlobTest.jsx rn-fetch-blob功能测试
    └── style.js 全局样式
```

### FileAccessTest.jsx 
- 读取目录的文件列表
- 写入数据到文件
- 读取文件的数据
- 下载文件

- 文件上传

### FileSelectorTest.jsx 
打开文件选择器。


### FetchBlobTest.jsx
- 文件流下载
- 文件上传

## 参考资料
- [RN上传文档组件react-native-file-selector - 简书](https://www.jianshu.com/p/f22d8220f0a1)
- [prscX/react-native-file-selector: React Native: Native File Selector](https://github.com/prscX/react-native-file-selector)
- [alpha0010/react-native-file-access: Filesystem access for React Native](https://github.com/alpha0010/react-native-file-access)
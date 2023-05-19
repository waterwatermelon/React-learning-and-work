# React-Native APP 开发学习路线

前置条件：

- Flex布局
- JavaScript开发经验
- React开发经验

第一阶段：

- 开发环境：React开发环境、Android开发环境
- 样式
- 交互：触摸事件
- 原生组件：View、Text、Image、FlatList;TextInput、Switch;
- 网络请求：axios
- 常见场景：表单页面、长列表的开发

- [可选]业务组件封装：分页加载数据的长列表 LongListWithPage

阶段目标： 一个表单页面、一个分页加载数据的长列表。

第二阶段：

- 使用导航：stack导航、tab导航。

- 使用本地存储：持久化登录状态、服务器地址等信息。

- 通过第三方包使用设备能力：相机扫码拍照、获取网络状态

- [可选]UI组件库： react-native-ui-lib

- [可选]框架搭建：UI组件选型与封装、导航与路由组件集成、网络通讯工具集成

阶段目标：

- 使用导航，完成页面与路由组织
- 用户信息展示界面
- 登录界面
- 表单页面，调用相机扫描结果填充表单字段
- 分页加载数据的长列表

参考资料：

- [react-navigation](https://reactnavigation.org/)
- [react-native-storage](https://github.com/sunnylqm/react-native-storage)
- [react-native-camera](https://react-native-camera.github.io/react-native-camera/)
- [react-native-wifi-reborn](https://www.npmjs.com/package/react-native-wifi-reborn)
- [react-native-ui-lib](https://wix.github.io/react-native-ui-lib/)

第三阶段：

- 特定平台代码 <https://reactnative.cn/docs/platform-specific-code>

- 原生模块编写

- 软件信息配置：软件图标、软件名称

- 打包发布：软件打包与版本管理

阶段目标：

- 了解特定平台代码的编写方式
- 了解向ReactNative层注册原生模块、提供设备原生能力接口的方法
- 打包正式发布可用的安装包（安卓版本），并实现软件版本迭代

参考资料：

- [原生模块简介 · React Native 中文网](https://reactnative.cn/docs/native-modules-intro)
- [打包发布 · React Native 中文网](https://reactnative.cn/docs/signed-apk-android)
- [Version your app  |  Android Studio  |  Android Developers](https://developer.android.google.cn/studio/publish/versioning)

- [<application>  |  Android Developers](https://developer.android.google.cn/guide/topics/manifest/application-element)

第四阶段：

- JavaScript运行环境
- React-Native 原理与架构学习

阶段目标：

- 理解Web端与ReactNative端中，JavaScript运行环境的差异
- 了解React-Native架构设计

参考资料：

- [JavaScript 环境 · React Native 中文网](https://reactnative.cn/docs/javascript-environment)
- [React Native 原理与新架构入门 - 知乎](https://zhuanlan.zhihu.com/p/339317763)

2023-05-19

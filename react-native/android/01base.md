## 应用基础知识

### 组件
app组件：activity、service、content-provider、broadcast-receiver
- activity 提供与用户交互的界面
- service 提供后台运行的服务
- broadcast-receiver 接收系统或者其他应用的广播消息
- content-provider 管理共享的数据。
安卓系统的特点：应用可以调用其他应用的组件。
### 清单文件
在app的mainfest文件中声明这些组件。

### 声明设备和应用要求
在清单文件中声明本app所需要用到的设备能力。
```xml
<mainfest>
    <uses-feature android:name="android.hardware.camera.any" 
        android:required="true"/> 
</mainfest>
```

### 应用资源
资源包括：图像、音视频文件。资源与源代码分离。

每个资源都有独一无二的整数ID。

备用资源限定符：资源目录名称中加入的短字符串。用于定义这些资源适用的设备配置。

移动端设备的资源是受限制的。

## 应用资源
在res目录下存放应用资源。

资源分组放置在系统所支持类型对应目录下。如位图资源放在`res/drawable`目录。

直接放在res目录会报错。
## 通用的架构原则

不应该用app组件存储应用数据与状态。

- 关注点分离
- 数据模型驱动UI
- 单一数据来源


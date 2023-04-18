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

## App入口 
### Activity
activity是作为app与用户交互的入口。 通过实现`Activity`子类来创建activity。

#### 配置manifest
mainfest文件中，在`application`标签里加一个子标签`acitivity`。必填属性`android:name`，其他属性标签（label）、图标（icon）、UI主题。

> 更多属性参考：https://developer.android.google.cn/guide/topics/manifest/activity-element

#### 声明意图过滤器 declare intent-filters
你的应用独立的，且不想被其他应用激活，就不需要声明意图过滤器。

### 活动的生命周期 activity lifecycle

- onCreate() 创建

- onStart() 启动

- onResume() 恢复

- onPause() 暂停

- onStop() 停止

- onRestart() 重启

- onDestory() 销毁
    - 释放当前活动持有的资源


### 任务与返回堆栈

任务是用户在执行某项工作时与之互动的一系列 Activity 的集合。

这些 Activity 按照每个 Activity 打开的顺序排列在一个返回堆栈中。

#### 管理任务 
定义启动模式：
- 在清单文件中定义
- 使用Intent对象的标记

使用清单文件：
使用`<activity />`标签的`launchMode`属性。

使用Intent对象的标记：
- FLAG_ACTIVITY_NEW_TASK 在新任务中启动 Activity。与launchMode:singleTask 效果一样。
- FLAG_ACTIVITY_SINGLE_TOP 将堆栈中已有的activity实例置顶。
- FLAG_ACTIVITY_CLEAR_TOP 将已有的activity实例上方的activity清除。

处理亲和性


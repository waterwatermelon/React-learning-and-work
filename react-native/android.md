app组件：activity fragment service content-provider broadcast-receiver
在appmainfest中声明这些组件。

移动端设备的资源是受限制的。
## 通用的架构原则

不应该用app组件存储应用数据与状态。

- 关注点分离
- 数据模型驱动UI
- 单一数据来源

## App入口
### Activity
activity是作为app与用户交互的入口。 通过实现`Activity`子类来创建activity。

### 配置manifest
mainfest文件中，在`application`标签里加一个子标签`acitivity`。必填属性`android:name`，其他属性标签（label）、图标（icon）、UI主题。

> 更多属性参考：https://developer.android.google.cn/guide/topics/manifest/activity-element

#### 声明意图过滤器 declare intent-filters
你的应用独立的，且不想被其他应用激活，就不需要声明意图过滤器。

### 活动的生命周期 activity lifecycle

- onCreate() 创建

- onStart() 启动

- onResume() 

- onPause() 暂停

- onStop() 停止

- onRestart() 重启

- onDestory() 销毁
    - 释放当前活动持有的资源
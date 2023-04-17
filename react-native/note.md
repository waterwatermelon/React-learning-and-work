## 基础知识
### 组件 
#### Image 
加载图片的组件。可以设置样式。



## 原生模块 NativeModules
### UIManager
原生模块UIManager 
- measure() 测量组件的宽度、高度、距离屏幕上方的距离、距离屏幕左侧的距离（在RN-v0.68中已废弃，推荐使用ref.measure)
- measureInWindow() 测量组件的宽度、高度、距离屏幕上方的距离、距离屏幕左侧的距离（在RN-v0.68中已废弃，推荐使用ref.measureInWindow)

ref:React.ElementRef<typeof View> 
- ref.measure((x,y,w,h,pageX,pageY) => {}:void)
- ref.measureInWindow((x,y,w,h) => {}:void)

参考资料：https://reactnative.cn/docs/0.68/new-architecture-library-intro#migrating-measure


## 开发环境
metro 配置 https://facebook.github.io/metro/docs/configuration/

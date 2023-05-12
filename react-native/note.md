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

参考资料：<https://reactnative.cn/docs/0.68/new-architecture-library-intro#migrating-measure>

## 开发环境

metro 配置 <https://facebook.github.io/metro/docs/configuration/>

### metro配置

修改devServer地址和端口。
1 修改服务端端口

```js
// metro.config.js
module.exports = {
  server: {
    port: 8082,
  },
};
```

2 修改客户端代码

```java
// app/src/main/packageName/MainActivity.java
@Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    SharedPreferences mPreferences =  PreferenceManager.getDefaultSharedPreferences(getApplicationContext());
    // 添加偏好设置
    mPreferences.edit().putString("debug_http_host","localhost:8082").commit();
  }
```

## 编译构建

修改apk文件名称

```groovy
// android/app/build.gradle 
android {
  // 方法1 默认配置中，设置参数
  defaultConfig {
    setPropperty("archivesBaseName", "$versionName")
  }
  // 方法2 应用变种配置中，修改输出文件名称
  applicationVariants.all { variant ->
    // 批量修改文件名称格式
    variant.outputs.all {
        outputFileName = "${variant.name}-${variant.versionName}.apk"
    }
  }
}
```

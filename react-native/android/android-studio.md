## 构建流程
### 术语
- 构建类型
- 产品变种 
- 构建变体
- 清单条目
- 依赖项
- 签名
- 代码和资源缩减
- 多apk支持

### build配置文件
1 gradle设置文件 settings.gradle

2 顶级build文件 build.gradle

3 模块级build文件 

4 gradle属性文件 gradle.properties

5 源代码集

## 配置应用模块

### 设置应用id
应用id由模块的build.gradle的applicationId属性定义。

```gradle
android {
    defaultConfig {
        applicationId = "com.example.myapp"
        minSdk = 15
        targetSdk = 24
        versionCode = 1
        versionName = "1.0"
    }
}
```


命名规则：
- 至少包含2段
- 每段必须以字母开头
- 只能使用数字、字母或下划线

### 设置命名空间
命名空间的作用，用于生成的R类的Java软件包。

命名空间有模块的build.gradle的namespace属性决定。

1 更改命名空间

2 test命名空间

## 添加依赖项
### 依赖项类型
1 本地模块依赖项
2 本地二进制文件依赖项
3 远程依赖项

### 依赖项配置

### 远程仓库
默认情况下，安卓项目指定google仓库和maven中央仓库。

```
dependencyResolutionManagement {
    repositories {
        google()
        mavenCentral()
        # 本地仓库
        mavenLocal()
        # 指导maven仓库地址
        maven {     url 'https://repo.example.maven2'}
    }
}
```

## 配置构建变体
构建变体是由构建类型和产品变种中配置、代码和资源组合在一起所得到的结果。

### 配置构建类型
在模块配置文件build.gradle的android代码块创建和配置构建类型。
```
android {
    buildTypes {
        debug {
            ...
        }
        release {
            ...
        }
    }
}
```

### 配置产品变种
在模块配置文件build.gradle的productFlavors代码块创建和配置构建类型。
产品变种支持与defaultConfig相同配置。

1 更改构建变体的应用id。
重新定义applicationId属性或者使用applicationSuffix后缀
```

android {
    defaultConfig {
        applicationId "com.example.myapp"
    }
    buildTypes {
        debug {
            applicationIdSuffix ".debug"
        }
    }
    productFlavors {
        free {
            applicationId "com.example.myapp.free"
        }
        pro {
            applicationIdSuffix ".pro"
        }
    }
}
```

Gradle 会在产品变种后面应用 build 类型配置，因此“free debug”build 变体的应用 ID 是“com.example.myapp.free.debug”。

3 变种过滤
过滤掉不需要构建的构建变种。
```
android {
  ...
  buildTypes {...}

  flavorDimensions "api", "mode"
  productFlavors {
    demo {...}
    full {...}
    minApi24 {...}
    minApi23 {...}
    minApi21 {...}
  }

  variantFilter { variant ->
      def names = variant.flavors*.name
      // To check for a certain build type, use variant.buildType.name == "<buildType>"
      if (names.contains("minApi21") && names.contains("demo")) {
          // Gradle ignores any variants that satisfy the conditions above.
          setIgnore(true)
      }
  }
}
...
```
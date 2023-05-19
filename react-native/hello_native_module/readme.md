## 基础结构

1 编写原生模块

FooModule.java

1.1 继承 ReactContextBaseJavaModule

```java
package com.hello_native_module;

import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.net.Uri;
import android.provider.AlarmClock;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class FooModule extends ReactContextBaseJavaModule {
  public FooModule(ReactApplicationContext context) {
    super(context);
    Log.d(TAG, "create");
  }
}

```

1.2 实现getName方法，返回模块在ReactNative层的标识

```java
public class FooModule extends ReactContextBaseJavaModule {
  @Override
  public String getName() {
    return "Foo";
  }
}
```

1.3 实现@ReactMethod注解的方法，提供给JavaScript层调用

```java
public class FooModule extends ReactContextBaseJavaModule {
  @ReactMethod
  public void bar(String message) { 
    Uri number = Uri.parse("srs://goods");
    Intent myIntent = new Intent(Intent.ACTION_VIEW, number);
    myIntent.putExtra(Intent.EXTRA_TEXT, message);
    Activity activity = getCurrentActivity();
    try {
      activity.startActivity(myIntent);
    } catch (ActivityNotFoundException e){
      Log.e("TAG", "e", e);
    }
  }
}
```

2 编写自己的包模块

FooPackage.java

2.1 实现一个模块，继承ReactPackage

```java

package com.hello_native_module;


import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.List;

public class FooPackage implements ReactPackage {
    
}

```

2.2 实现createNativeModules方法，注册当前包中的模块

```java

public class FooPackage implements ReactPackage {
  @Override
  public List<NativeModule> createNativeModules(ReactApplicationContext reactApplicationContext) {
    List<NativeModule> modules = new ArrayList<>();

    modules.add(new FooModule(reactApplicationContext));

    return modules;
  }
}

```

2.3 在MainApplication中的getPackages，注册自己的包

```java
public class MainApplication extends Application implements ReactApplication {
  private final ReactNativeHost mReactNativeHost =
    new DefaultReactNativeHost(this) {
      @Override
      protected List<ReactPackage> getPackages() {
        @SuppressWarnings("UnnecessaryLocalVariable")
        List<ReactPackage> packages = new PackageList(this).getPackages();
        
        packages.add(new FooPackage());
        return packages;
      }
    };
}
```

3 使用自己的模块

3.1 在JavaScript层，从react-native的NativeModules获取自己的模块

```jsx
import { NativeModules } from 'react-native';
const { Foo } = NativeModules;
```

3.2 调用模块提供给JavaScript层的方法

```jsx
Foo.bar('message');

```

## 更多特性

TBC
<https://reactnative.cn/docs/native-modules-android>

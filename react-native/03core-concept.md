# 核心概念
## 应用数据与文件
### 存储空间概览
分类：
- 应用专属存储空间：存储仅供应用使用的文件。
- 共享存储：存储与其他应用共享的文件。
- 偏好设置：以键值对形式存储私有原始数据。
- 数据库：持久性存储的数据。


物理存储位置
- 内部存储空间
- 外部存储空间

权限声明
- READ_EXTERNAL_STORAGE
- WRITE_EXTERNAL_STORAGE
- MANAGE_EXTERNAL_STORAGE


### 应用专属存储空间

- 内部存储空间目录 系统会阻止其他应用访问这些空间。

- 外部存储空间目录 

卸载应用时，系统会移除保存在专属存储空间的文件。

#### 从内部存储空间访问

系统会为每个应用在内部存储空间中提供目录，一个目录存储持久化的文件，一个目录存储应用缓存文件。应用读写这些目录的文件不需要任何权限。

> 这些目录的存储空间一般都比较小。

#### 访问持久性文件
使用上下文对象的`filesDir`属性。获取到文件目录。



#### 从外部存储空间访问
可以移除的存储设备都为外部存储空间。
1 验证外部存储空间的可用性

2 选择物理存储位置

3 访问持久性文件
使用context.getExternalFilesDi()获取持久性文件的目录

4 创建缓存文件
使用context.getExternalCacheDir()获取缓存文件的目录

#### 查询可用空间

通过`StorageManager.getAllocatableBytes(internalUuid)`查询可用空间。

1 创建存储空间管理activity

2 让用户移除部分设备文件
发送action为`ACTION_MANAGE_STORAGE`的intent。

3 让用户移除所有缓存文件
发送action为`ACTION_CLEAR_APP_CACHE`的intent。

### 保存到共享空间

如果用户数据可供其他应用访问，请使用共享存储空间。

访问以下类型数据的API：
- 媒体内容：系统提供标准的公共目录来存储这些文件。可以使用平台提供的MediaStore中的API来访问这个空间的文件。

- 文档和其他文件：例如PDF文档和EPUB图书。应该通过平台提供的存储访问框架来访问这些文件。

- 数据集：应用可以使用`BlobStoreManager`API来访问这些共享数据集。



### 访问共享存储空间中的媒体文件
框架提供了媒体集合索引，称为媒体库。

照片选择器是媒体库的替代方案。

媒体库的API
通过ContentResolver来访问媒体库。
媒体库的资源：
- 图片 通过MediaStore.Images访问。
- 视频 通过MediaStore.Video访问。
- 音频 (从API30起)通过MediaStore.Audio访问。
- 下载的文件 (从API29起)通过MediaStore.Downloads访问。

#### 请求必要权限
1 访问自己的媒体文件，不需要声明权限

2 访问其他应用的媒体文件 
文件必须位于以下任意媒体集合中：
- MediaStore.Images
- MediaStore.Video
- MediaStore.Audio

3 
### 保存键值对
SharedPreferences
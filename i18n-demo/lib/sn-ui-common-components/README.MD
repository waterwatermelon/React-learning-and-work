## npm 命令说明
npm run build 编译库文件

npm run pub 编译并发布npm包到仓库

npm run dev 运行开发服务器 端口8080

## 开发组件
在src目录下编写组件， 在src/index.js 文件中导出组件。


## 测试
### 方法一: 在本项目中调试
内部有一个react应用，在demo/index.js中编写测试组件

### 方法二: 连接到实际项目进行调试
1.先编译项目  
```
npm run build
```
2.在组件库下,创建一个包的全局软链接
```
cd /path/to/su-ui-common-components
npm link
```
3.在要调试的项目下,创建组件库的软连接
```sh
# 先卸载到原先安装的模块
npm uninstall sn-ui-common-components
# 切换到目标路径
cd /path/to/your/project
# 创建目标项目下的软链接
npm link sn-ui-common-components
```


## 使用说明
### CustomTable使用
```
      <CustomTable
        rowKey="id"
        dataSource={productList1}
        columns={cols}
        visibleEditCol={true}
        visibleOperation={false}
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        pagination={{
          ...{
            current: 1,
            pageSize: 5,
            total: 10,
          },
          ...{ showSizeChanger: true },
        }}
        onChange={onTableChange}
        operationSchema={operationSchema}
      ></CustomTable>
```
简单使用如上例，必传字段说明：  
&emsp;1.rowKey：数据的key  
&emsp;2.dataSource：数据  
&emsp;3.columns：列名  
其他自定义可选配置字段：  
&emsp;1.visibleEditCol：是否开启列编辑功能，默认开启  
&emsp;2.visibleOperation：是否显示操作按钮，默认显示（如：新增）  
&emsp;3.operationSchema：操作按钮配置项,具体配置如下：
  
```
const operationSchema = [
    {
      id: "add", //作id标识
      name: "新增",  //名称
      clickFunc: add,  //操作的方法函数
      type: "default",  //按钮类型
    }
  ];
```
其他字段同antd用法一致。 


### CustomTool使用
&emsp;提供SearchBox组件作为搜索栏  
```   
<SearchBox
        searchSchema={getSearchSchema}
        searchSubmit={searchSubmit}
></SearchBox>
```
简单使用如上例,必传字段说明：  
&emsp;1.searchSchema:搜索条件配置项，具体配置如下：  
```  
[{
    form: { formLabel: "产品分类", name: "categoryId" },   //formLabel：label名称  name：搜索字段
    content: {
      type: "select",   //搜索框类型，具体类别详见CommonForm
      mode:'multiple',  //是否多选下拉框
      selectSchema: [   //下拉框选项
        { title: "全部", value: "" },
        { title: "正常", value: "ACTIVE" },
        { title: "下架", value: "INACTIVE" },
        // { title: "删除", value: "DELETE" },
      ],
      showSearch: true,  //下拉框是否支持搜索
      optionFilterProp: "children",  //作用同antd
      allowClear: true,   //是否支持一键清除
    },
  }]
```
&emsp;2.searchSubmit：搜索条件的回调函数
### Menus的使用
&emsp;配置内嵌表格操作组件  
```
<Menus
    title={"操作"}
    schema={schema}
/>
```
简单使用如上例，必填字段：  
&emsp;1.title：内嵌表格操作组件名称  
&emsp;2.schema：具体操作配置项，具体配置如下：    
```
tableMenuSchema = [
  {
    text : "编辑",   //操作名称
    key : "edit"，  //操作标识
    onClick：edit   //操作方法
  },
  {
    text : "删除",
    key : "delete",
    onClick：delete
  }
];
```
### CommonFormItem使用
&emsp;包含大部分表单输入组件（如：text、password、select、number、textarea、radio、  
DatePicker、TimePicker、Cascader、Switch、TreeSelect、Upload、checkbox）
`<CommonFormItem schema={schema}></CommonFormItem>`  
简单使用如上例,必填字段说明：  
&emsp;1.schema：输入组件配置项:
```
[
  {
    form: { formLabel: "产品名称", name: "title" },
    content: {
      type: "radio",   //类型
      options:[    //配置项
        { label: 'Apple', value: 'Apple' },
        { label: 'Pear', value: 'Pear' },
        { label: 'Orange', value: 'Orange' },
      ]},
  },
  {
    form: { formLabel: "产品分类", name: "categoryId" },  
    content: {
      type: "select",
      mode:'multiple',
      selectSchema: [
        { title: "全部", value: "" },
        { title: "正常", value: "ACTIVE" },
        { title: "下架", value: "INACTIVE" },
        // { title: "删除", value: "DELETE" },
      ],
      showSearch: true,
      optionFilterProp: "children",
      allowClear: true,
    },
  },
  {
    form: { formLabel: "状态", name: "state" },
    content: {
      type: "DatePicker",   //类型
      isRange:true  //范围选择日期是true，否则单个选择
    },
  },
  {
    form: { formLabel: "状态", name: "state" },
    content: {
      type: "TimePicker",    //类型
      isRange:true    //范围选择时间是true，否则单个选择
    },
  },
  {
    form: { formLabel: "状态", name: "state" },
    content: {
      type: "Switch",
    },
  },
  {
    form: { formLabel: "状态", name: "state" },
    content: {
      type: "TreeSelect",
      treeData:[
        {
          title: 'Node1',
          value: '0-0',
          children: [
            {
              title: 'Child Node1',
              value: '0-0-1',
            },
            {
              title: 'Child Node2',
              value: '0-0-2',
            },
          ],
        },
        {
          title: 'Node2',
          value: '0-1',
        },
      ]
    },
  },
  {
    form: { formLabel: "状态", name: "state" },
    content: {
      type: "textarea",
    }
  },
  {
    form: { formLabel: "状态", name: "state" },
    content: {
      type: "Cascader",
      options:[
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake',
                },
              ],
            },
          ],
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          disabled: true,
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing',
              children: [
                {
                  value: 'zhonghuamen',
                  label: 'Zhong Hua Men',
                },
              ],
            },
          ],
        }
      ]
    },
  },
];
```

### 组件说明

|组件名称|类别|功能说明|包含子组件|
|-|-|-|-|
|LeftMenuPanel|-|侧边菜单栏展示|Antd.Menu|
|TwoColumnMainLayout|-|两列布局主体布局|LeftMenuPanel|

## 开发规范
- 给复杂组件写一个使用实例
- 代码中需要添加注释，说明清楚组件的API




## 版本说明
### v0.1.55 
- [ ] 添加
- [ ] 可以由外部控制菜单的折叠
- [ ] 可以由外部控制菜单折叠按钮的显示
- [ ] 搜索框支持给Form设置入name属性
- [ ] 调整表格分页器汇总数据的显示
### v0.1.58
- [x] 手动分页的情况下,序号显示异常
- [ ] 


## TODO


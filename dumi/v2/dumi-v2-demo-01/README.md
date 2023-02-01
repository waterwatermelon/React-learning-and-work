# dumi-v2-demo

A static site base on [dumi](https://d.umijs.org).

## Development

```bash
# install dependencies
$ npm install

# start dev server
$ npm start

# build docs
$ npm run build
```
## Project Structure
```
├── docs               # 组件库文档目录
│   ├── index.md       # 组件库文档首页
│   ├── guide          # 组件库其他文档路由表（示意）
│   │   ├── index.md
│   │   └── help.md
├── src                # 组件库源码目录
│   ├── Button         # 单个组件
│   │   ├── index.tsx  # 组件源码
│   │   ├── index.less # 组件样式
│   │   └── index.md   # 组件文档
│   └── index.ts       # 组件库入口文件
├── .dumirc.ts         # dumi 配置文件
└── .fatherrc.ts       # father-build 的配置文件，用于组件库打包
```

## LICENSE

MIT

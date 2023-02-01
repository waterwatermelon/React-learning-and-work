import { defineConfig } from 'dumi';

export default defineConfig({
  locales: [{
    id:'zh-CN',
    name: '中文',
  },{
    id:'en-US',
    name: 'English',
  },],
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'dumi-v2-demo-02',
  },
});

const zh_cn = {
  title: '标题',
  title: '也是标题',
  global: {
    greet: {
      morning: '早上好',
      noon: '中午好!',
      afternoon: '下午好',
      night: '晚上好'
    },
  },
  // 通用或者多次使用的文本放在common空间
  common: {
    confirm: {
      title: '确认',
    },
    table: {
      operate: '操作',
    },
    action: {
      add: '添加',
      edit: '编辑',
      delete: '删除',
      deleteBatch: '批量删除',
    }
  },
  // NOTE:按照模块划分命名空间
  /* user模块放置用户相关的数据 */
  user: {
    // 表单域中的提示信息
    tooltip: {
      name: '长度1-10个字符',
    },
    // 校验器提示信息
    validator: {
      name: {
        unique: '名称已被使用',
      },
      ip: {
        format: 'IP格式不正确',
        range: 'IP取值不合法',
      }
    },
    // 一些枚举数据
    enum: {
      status: {
        enable: '开启',
        disable: '关闭',
      }
    },
    // 标签
    label: {
      name: '用户名称',
      group: '组别',
      status: '状态',
      ip: 'IP地址',
    },
    // 从上下文中获取信息
    // eg：参数name在使用时候由用户传入
    deleteMessage: '你确定要删除{{name}}?',
  },
  group: {
    form: {
      label: {
        name: '用户组'
      }
    }
  }
  // ... 
  // 其他模块以此类推
};
export { zh_cn };
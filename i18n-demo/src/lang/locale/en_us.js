const en_us = {
  title: 'title',
  global: {
    greet: {
      morning: 'good morning',
      noon: 'good noon',
      afternoon: 'good afternoon',
      night: 'good night',
    },
  },
  common: {
    confirm: {
      title: 'confirm',
    },
    table: {
      operate: 'operate',
    }
  },
  // NOTE:按照模块划分命名空间
  user: {
    tooltip: {
      name: 'length between 1 and 10 ',
    },
    validator: {
      name: {
        unique: 'name is used',
      },
      ip: {
        format: 'format error',
        range: 'value invalid',
      }
    },
    enum: {
      status: {
        enable: 'enable',
        disable: 'disable',
      }
    },
    label: {
      name: 'name',
      group: 'group',
      status: 'status',
      ip: 'IP',
    },
    deleteMessage: 'do you delete {{name}}?',
  }
};
export { en_us };
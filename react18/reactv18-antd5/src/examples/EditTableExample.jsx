
import {
  EditableProTable,
  ProCard,
  ProFormField,
  ProFormRadio,
} from '@ant-design/pro-components';
import { Col, Input, Row, Tag } from 'antd';
import React, { useState } from 'react';

// 自定义输入组件
function MyInput(props) {
  console.log('props', props);
  const { value = 'FE80/64', onChange } = props;

  const handleChangeIp = (e) => {
    const prevValue = value.split('/')[1];
    onChange(e.target.value + '/' + prevValue);
  };
  return <Row gutter={[8, 8,]}>
    <Col span={18}>
      <Input
        value={value.split('/')[0]}
        onChange={handleChangeIp} />
    </Col>
    <Col span={6} >
      <Input value={value.split('/')[1]} />
    </Col>
  </Row>
};

const waitTime = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
// 数据源
const defaultData = [
  {
    id: 624748504,
    title: '活动名称一',
    readonly: '活动名称一',
    decs: '这个活动真好玩',
    state: 'open',
    created_at: 1590486176000,
    update_at: 1590486176000,
  },
  {
    id: 624691229,
    title: '活动名称二',
    readonly: '活动名称二',
    decs: '这个活动真好玩',
    state: 'closed',
    created_at: 1590481162000,
    update_at: 1590481162000,
  },
];

export default function EditableExample() {
  const [editableKeys, setEditableRowKeys] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [position, setPosition] = useState('bottom');

  // 列定义
  const columns = [
    {
      title: '活动名称',
      dataIndex: 'title',
      tooltip: '只读，使用form.getFieldValue获取不到值',
    
      // 传递给Form.Item组件的props
      // object写法
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
      // 函数写法
      // formItemProps: (form, { rowIndex }) => {
      //   return {
      //     rules: [{
      //       required: true,
      //       message: '此项为必填项',
      //     },]      
      //   };
      // },
      // 设置单元格的可编辑属性
      editable: (text, record, index) => {
        // 第一行不允许编辑
        return index !== 0;
      },
      width: '15%',
    },
    { title: '活动口令',
    key: 'key',
    dataIndex: 'key',
  },
    {
      title: '状态',
      key: 'state',
      dataIndex: 'state',
      valueType: 'select',
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        open: {
          text: '未解决',
          status: 'Error',
        },
        closed: {
          text: '已解决',
          status: 'Success',
        },
      },
    },
    {
      title: '自定义列',
      dataIndex: 'labels',
      width: '20%',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
      // 自定义表单组件
      renderFormItem: (_, { isEditable }) => {
        return <MyInput />;
      },
    },
    {
      title: '描述',
      dataIndex: 'decs',
      valueType: 'textarea',
      fieldProps: (form, { rowKey, rowIndex }) => {
        if (form.getFieldValue([rowKey || '', 'title']) === '不好玩') {
          return {
            disabled: true,
          };
        }
        if (rowIndex > 9) {
          return {
            disabled: true,
          };
        }
        return {};
      },
    },
    {
      title: '活动时间',
      dataIndex: 'created_at',
      valueType: 'date',
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={() => {
            setDataSource(dataSource.filter((item) => item.id !== record.id));
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  return (
    <>
      <EditableProTable
        rowKey="id"
        // 标题
        headerTitle="可编辑表格"
        // 最大数据量
        maxLength={5}
        scroll={{
          x: 960,
        }}
        // 添加一行定义
        recordCreatorProps={
          position !== 'hidden'
            ? {
              position,
              record: () => ({ id: (Math.random() * 1000000).toFixed(0) }),
            }
            : false
        }
        loading={false}
        // 工具栏
        toolBarRender={() => [
          <ProFormRadio.Group
            key="render"
            fieldProps={{
              value: position,
              onChange: (e) => setPosition(e.target.value),
            }}
            options={[
              {
                label: '添加到顶部',
                value: 'top',
              },
              {
                label: '添加到底部',
                value: 'bottom',
              },
              {
                label: '隐藏',
                value: 'hidden',
              },
            ]}
          />,
        ]}
        columns={columns}
        request={async () => ({
          data: defaultData,
          total: 3,
          success: true,
        })}
        value={dataSource}
        // 
        onChange={setDataSource}
        editable={{
          type: 'multiple',
          editableKeys,
          // 保存一行数据
          onSave: async (rowKey, data, row) => {
            console.log(rowKey, data, row);
            await waitTime(2000);
          },
          onChange: setEditableRowKeys,
        }}
      />
      <ProCard
        // 卡片标题
        title="表格数据"
        // header底部边框
        headerBordered
        // 内容可折叠 
        collapsible
        // 默认折叠
        defaultCollapsed>
        <ProFormField
          ignoreFormItem
          fieldProps={{
            style: {
              width: '100%',
            },
          }}
          mode="read"
          // 展示JSON格式数据
          valueType="jsonCode"
          text={JSON.stringify(dataSource)}
        />
      </ProCard>
    </>
  );
};

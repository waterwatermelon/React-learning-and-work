import React, { useState, useEffect, useCallback } from 'react';
import { Table, Modal, Space } from "antd";
import { Checkbox, InputNumber, Button, } from 'antd';
import store from 'store';

function ColumnEditorModal(props) {
  const { tableColumns, tableKey, visible, onSave, onCancel,style = "" } = props;
  const [data, setData] = useState([]);

  const onWidthChange = (value, index) => {
    const newData = JSON.parse(JSON.stringify(data));
    newData[index].width = `${value}%`;
    setData(newData);
  };

  const onVisibleChange = (event, index) => {
    const value = event.target.checked;
    const newData = JSON.parse(JSON.stringify(data));
    newData[index].visible = value;
    setData(newData);
  };

  const renderWidth = (value, record, index) => {
    return <InputNumber
      value={value.replace('%', '')}
      min={0}
      max={100}
      formatter={value => `${value}%`}
      parser={value => value.replace('%', '')}
      onChange={(val) => onWidthChange(val, index)}
    />;
  };

  const renderVisible = (value, record, index) => {
    return <Checkbox checked={typeof (value) === 'undefined' || value} onChange={(event) => onVisibleChange(event, index)}></Checkbox>;
  };

  const columns = [
    {
      title: "列名",
      dataIndex: "title",
      key: "title",

    },
    {
      title: "列宽 (%)",
      dataIndex: "width",
      key: "width",
      render: renderWidth
    },
    {
      title: "是否启用",
      align: "center",
      dataIndex: "visible",
      key: "visible",
      render: renderVisible
    },
  ];

  // 获取本地缓存中的数据
  const getLocalColumns = useCallback(() => {
    let data = [];
    const localColumns = store.get(tableKey);
    if (localColumns) {
      data = JSON.parse(localColumns);
    } else {
      data = [...tableColumns];
    }
    setData(data);
  }, [tableColumns]);

  useEffect(() => {
    getLocalColumns();
  }, [getLocalColumns]);


  const save = () => {
    store.set(tableKey, JSON.stringify(data));
    onSave && onSave(data);
  };

  // 重置数据
  const reset = () => {
    getLocalColumns();
  };

  return (
    <Modal
      destroyOnClose={true}
      visible={visible}
      title="自定义列"
      onOk={save}
      onCancel={onCancel}
      className={style}
    >
      <div>
        <div className="tool_box">
          <Space >
            <Button onClick={reset} type="default">重新加载</Button>
          </Space>
        </div>
        <Table dataSource={data} columns={columns} scroll={{ y: 500 }} pagination={false} rowKey="dataIndex"></Table>
      </div>
    </Modal>
  );
}


export default ColumnEditorModal

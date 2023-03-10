import React, { useState, useEffect, useCallback } from 'react';
import { Table, Space } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import './custom-table.scss';
import ColumnEditorModal from "./ColumnEditorModal";
import { Operation } from "../CustomTool/CustomTool";
import store from 'store';

/**
 * @param {object} props
 * @param {boolean} props.columnEditable 是否支持自定义列编辑
 * @param {boolean} props.visibleEditCol 是否显示自定义列编辑按钮
 * @param {boolean} props.visibleOperation 是否显示表格上方操作按钮
 * @param {array} props.operationSchema 表格上方操作按钮配置
 * @param {array} props.columns 定义表格数据的所有列
 * @param {string} props.tableKey 表格自定义列在前端缓存中的key
 * @param {boolean} props.showIndex 是否显示表格中的序号列
 * @returns
 */
function CustomTable(props) {
  const { columns = [], pagination = false, dataSource = [], rowKey = "id",
    tableKey = "", tableLayout = "fixed",
    operationSchema = [], columnEditable = true, visibleEditCol = true, visibleOperation = true,
    showIndex = true,editStyle = "", ...rest } = props;

  const [visibleColumns, setVisibleColumns] = useState([]); // 在表格中显示的列
  const [columnOpen, setColumnOpen] = useState(false);
  const [editColumns, setEditColumns] = useState([]); // 编辑列定义
  const [transitionPagination, setTransactionPagination] = useState(); // 保存分页器的信息
  // 在外部列数据发生变化时，更新表格需要显示的列
  const getVisibleColumns = useCallback(() => {
    // 添加序号列的定义
    let editColumnsTemp = [];
    const indexColumn = {
      dataIndex: 'index',
      key: 'index',
      title: '序号',
      align: 'center',
      visible: true,
      width: '10%',
      render: (r, t, index) => {
        let offset = 0;
        if (transitionPagination && transitionPagination.current) {
          offset = (transitionPagination.current - 1) * transitionPagination.pageSize;
        } else {
          offset = 0;
        }
        return offset + index + 1;
      }
    };
    if (showIndex) {
      editColumnsTemp = [indexColumn, ...columns];
    } else {
      editColumnsTemp = [...columns];
    }
    setEditColumns(editColumnsTemp);

  }, [columns, transitionPagination]); //

  useEffect(() => {
    setTransactionPagination(pagination);
  }, [pagination]);

  useEffect(() => {
    getVisibleColumns();
  }, [getVisibleColumns]);

  useEffect(() => {
    const localColumns = store.get(tableKey);
    const visibleColumns = [];

    if (localColumns) {
      let arr = JSON.parse(localColumns);
      editColumns.forEach((item, index) => {
        if (arr[index] && (typeof (arr[index].visible) === 'undefined' || arr[index].visible)) {
          item.width = arr[index].width;
          visibleColumns.push(item);
        }
      });
    } else {
      editColumns.forEach(item => {
        if (typeof (item.visible) === 'undefined' || item.visible) {
          visibleColumns.push(item);
        }
      });
    }
    setVisibleColumns(visibleColumns);
  }, [editColumns]);

  const openColumnEditor = () => {
    setColumnOpen(true);
  };

  const closeColumnEditor = () => {
    setColumnOpen(false);
  };

  const handleColumnSubmit = (data) => {
    setColumnOpen(false);
    getVisibleColumns();
  };

  const handleTableChange = (p, s, f) => {
    setTransactionPagination(p);
    props.onChange && props.onChange(p, s, f);
  };
  return (
    <div>
      <div style={visibleOperation || !visibleEditCol
        ? {
          display: 'flex',
          justifyContent: 'space-between'
        }
        : {
          display: 'flex',
          justifyContent: 'flex-end'
        }
      }
      >
        <div style={visibleOperation ? { display: "", paddingBottom: "8px" } : { display: "none" }}>
          <Operation schema={operationSchema}></Operation>
        </div>
        <div
          style={{
            fontSize: '16px',
            cursor: 'pointer',
            padding: '8px',
            display: visibleEditCol ? "" : "none"
          }}
        >
          <Space style={{ marginLeft: 8 }}>
            {columnEditable && <SettingOutlined id='custom-column' title="自定义列" onClick={openColumnEditor}></SettingOutlined>}
          </Space>
        </div>
      </div>
      <Table
        className="custom-table"
        rowKey={rowKey}
        columns={visibleColumns}
        dataSource={dataSource}
        pagination={
          transitionPagination && {
            showTotal: (total, range) => {
              if (total === 1) {
                return `总共${total}条数据`;
              } else {
                return `第${range[0]}-${range[1]}条数据，总共${total}条数据`;
              }
            },
            ...transitionPagination
          }
        }
        tableLayout={tableLayout}
        {...rest}
        onChange={handleTableChange}
      >
      </Table>
      <ColumnEditorModal
        visible={columnOpen}
        onSave={handleColumnSubmit}
        onCancel={closeColumnEditor}
        tableKey={tableKey}
        tableColumns={editColumns}
        style={editStyle}
      ></ColumnEditorModal>
    </div>
  );
}

export default CustomTable;

import { Transfer, Button, Table, Row, Col } from 'antd'
import { useState, useEffect } from 'react'

const getMockData = () => {
  const list = [];
  for (let i = 0; i < 20; i++) {
    const element = {
      key: i,
      title: `title ${i + 1}`,
      description: 'dddddddd '
    };
    list.push(element);
  }
  return list;
};


function TableTransfer(props) {


  return (
    <Transfer {...props}>
      {

        ({ direction, disabled, filteredItems, selectedKeys, onItemSelect, onItemSelectAll }) => {
          return (
            <Table
              rowSelection={{
                selectedRowKeys: selectedKeys,
                onSelectAll: (selected, selectedRows) => {
                  console.log(`selected`, selected);
                  console.log(`selectedRows`, selectedRows);
                  onItemSelectAll(selectedRows.map(item => item.key), selected);
                },
                onSelect: (e, isSelected) => {
                  console.log(`e`, e);
                  console.log(`isSelected`, isSelected);
                  onItemSelect(e.key, isSelected);
                }
              }}
              columns={props.columns}
              dataSource={filteredItems}
            />
          );
        }
      }
    </Transfer>
  )
}

export default function TableTransferWrapper() {
  const [list, setList] = useState([]);

  const [nextTargetKeys, setNextTargetKeys] = useState([]);

  const handleChange = (nextTargetKeys) => {
    setNextTargetKeys(nextTargetKeys);
  }

  const handleFilterItem = () => {
    // 保留偶数位上的元素
    const listTemp = list.slice().filter(item => item.key % 2);
    setList(listTemp);
  }
  useEffect(() => {
    setList(getMockData());
  }, []);
  return (
    <Row gutter={[12, 12]}>
      <Col span={24}>
        <Button type='primary' onClick={handleFilterItem} >过滤数组</Button>
      </Col>
      <Col span={24}>
        <TableTransfer
          columns={[{ title: '标题', dataIndex: 'title' }]}
          dataSource={list}
          targetKeys={nextTargetKeys}
          onChange={handleChange}
        />
      </Col>
    </Row>
  )
}

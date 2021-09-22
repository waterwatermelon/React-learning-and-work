import { useState, useEffect } from 'react'

import { Transfer, Button, Row, Col } from 'antd'

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
export default function ListTransfer() {
  const [targetKeys, setTargetKeys] = useState([]);
  const [list, setList] = useState([]);
  const handleChange = (nextTargetKeys, direction, moveKeys) => {
    console.log(`nextTargetKeys`, nextTargetKeys);
    console.log(`direction`, direction);
    console.log(`moveKeys`, moveKeys);
    setTargetKeys(nextTargetKeys)
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
        <Transfer
          dataSource={list}
          titles={['待选择', '已选择']}
          targetKeys={targetKeys}
          // selectedKeys={[]}
          onChange={handleChange}
          render={item => item.title}
        />
      </Col>
    </Row>
  )
}

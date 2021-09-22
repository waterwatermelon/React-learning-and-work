import { Transfer, Button, Row, Col, Card, Space } from 'antd'
import ListTransfer from './ListTransfer'
import TableTransfer from './TableTransfer'


export default function DevcieSelect() {




  return (
    <Space direction='vertical'>
      <Card title='简单列表筛选'>
        <ListTransfer />
      </Card>

      <Card title='表格列表筛选'>
        <TableTransfer />
      </Card>
    </Space>
  )
}

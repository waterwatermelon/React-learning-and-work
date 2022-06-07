import { Dropdown, Menu, Modal, Table } from 'antd';
import { useTranslation } from 'react-i18next';

function MyTable() {
  const { t } = useTranslation();

  const handleDelete = record => {
    Modal.confirm({
      title: t('common.confirm.title'),
      // NOTE:文本中包含上下文信息
      content: t('user.deleteMessage', { name: record.name }),
    });
  };

  const operationRender = (v, r) => {
    return <Dropdown overlay={
      <Menu>
        <Menu.Item onClick={() => handleDelete(r)}>删除</Menu.Item>
      </Menu>
    } >
      <span> {t('common.table.operate')} </span>
    </Dropdown>;
  }
  const getColumns = () => [{
    title: t('user.label.name'),
    dataIndex: 'name',
    align: 'center',
  }, {
    title: t('user.label.group'),
    dataIndex: 'group',
    align: 'center',
  }, {
    title: t('user.label.status'),
    dataIndex: 'status',
    align: 'center',
    render: v => v
      ? t('user.enum.status.enable')
      : t('user.enum.status.disable'),
  }, {
    title: t('common.table.operate'),
    dataIndex: 'operate',
    align: 'center',
    render: operationRender,
  }];
  return (
    <div>
      <Table
        columns={getColumns()}
        dataSource={[{
          name: 'san',
          group: 'vip',
          status: true,
        }]} />
    </div>
  )
}
export default MyTable;

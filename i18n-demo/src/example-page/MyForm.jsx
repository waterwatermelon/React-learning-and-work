import { Form, Input, Select } from 'antd';
import { useTranslation } from 'react-i18next';

export default function MyForm() {
  const { t } = useTranslation();
  return (
    <Form>
      <Form.Item
        label={t('user.label.name')}
        name='name'
        tooltip={t('user.tooltip.name')}
        rules={[{
          required: true,
        }]}>
        <Input />
      </Form.Item>
      <Form.Item
        label={t('user.label.group')}
        name='group'
        rules={[{
          required: true,
        }]}>
        <Select options={[{
          label: 'group-1',
          value: 'group-1'
        }]} />
      </Form.Item>
      <Form.Item
        label={t('user.label.ip')}
        name='ip'
        rules={[{
          validator: (_, value) => {
            if (!value) {
              return Promise.resolve();
            }
            const arr = value.split('.');
            if (arr.length !== 4) {
              return Promise.reject(t('user.validator.ip.format'));
            } else {
              if (arr[0] === '0') {
                return Promise.reject(t('user.validator.ip.range'));
              }
            }
          }
        }]}
      >
        <Input />
      </Form.Item>
    </Form>
  )
}

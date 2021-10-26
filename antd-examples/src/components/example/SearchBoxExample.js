import { SearchBox } from '../CustomTool/CustomTool';
import { useState } from 'react';
import { Divider } from 'antd';
export default function SearchBoxExample() {
  const [condition, setCondition] = useState({});

  const onSearch = (values) => {
    setCondition(values);
  }

  return (
    <div>
      <SearchBox
        title='title'
        // mode ['normal','collapse', ''] 
        // 搜索栏的表现形式：普通 通过按钮打开 
        collapse={true}
        span={6}
        searchSchema={[{
          form: {
            formLabel: 'label1',
            name: 'text',
          },
          content: {
            type: 'text',
            value: 'value'
          }
        },
        {
          form: {
            formLabel: 'label2',
            name: 'select',
          },
          content: {
            type: 'select',
            value: 'value'
          }
        }, {
          form: {
            formLabel: 'label3',
            name: 'datepicker',
          },
          content: {
            type: 'DatePicker',
          }
        }, {
          form: {
            formLabel: 'label4',
            name: 'text1',
          },
          content: {
            type: 'DatePicker',
            isRange: true,
            showTime: true,
          }
        }, {
          form: {
            formLabel: 'label'
          },
          content: {
            type: 'text',
            value: 'value'
          }
        }, {
          form: {
            formLabel: 'label'
          },
          content: {
            type: 'text',
            value: 'value'
          }
        }, {
          form: {
            formLabel: 'label'
          },
          content: {
            type: 'text',
            value: 'value'
          }
        }, {
          form: {
            formLabel: 'label'
          },
          content: {
            type: 'text',
            value: 'value'
          }
        }]}
        searchSubmit={onSearch}
      />


      <Divider >
        search condition
      </Divider>
      {
        JSON.stringify(condition)
      }
    </div>
  )
}

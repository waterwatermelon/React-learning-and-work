import React, { useCallback, useState } from 'react';
import { createEditor, } from 'slate';
import { Slate, Editable, withReact, } from 'slate-react';
import { Table, Image, Typography } from 'antd';
import './style.css';
function MyTable(props) {
  const { element } = props;
  const { columns = [], dataSource = [], size = 'small', ...rest } = element;
  return <Table
    columns={columns}
    dataSource={dataSource}
    size={size} {...rest}
    pagination={false}
  />;
}

function List(props) {
  const { element, children } = props;
  console.log('children', children);
  const { title } = element;
  return <ul>
    {children}
  </ul>;
}
function ListItem(props) {
  const {  children } = props;
  return <li>{children} </li>;
}
function MyImage(props) {
  const { element } = props;
  return <Image src={element.url} alt={''} />
}
function CodeElement(props) {
  return (
    <pre>
      <code>{props.children}</code>
    </pre>)
}
function NoteElement(props) {
  const { children } = props;
  return <blockquote>{children} </blockquote>
}

function Element(props) {
  const { attributes, children, element } = props;
  // console.log('element', element);
  // console.log('attributes', attributes);
  // console.log('children', children)
  switch (element.type) {

    case 'image':
      return <MyImage {...props} />
    case 'link':
      return <a href={element.url} target='_blank' rel="noreferrer" >{children}</a>
    case 'code':
      return <CodeElement {...props} />;
    case 'note':
      return <NoteElement {...props} />;
    case 'quote':
      return <blockquote>{children}</blockquote>;
    case 'heading-one':
      return <Typography.Title level={1}>{children} </Typography.Title>;
    case 'heading-two':
      return <Typography.Title level={2}>{children} </Typography.Title>;
    case 'heading-three':
      return <Typography.Title level={3}>{children} </Typography.Title>;
    case 'heading-four':
      return <Typography.Title level={4}>{children} </Typography.Title>;
    case 'heading-five':
      return <Typography.Title level={5}>{children} </Typography.Title>;

    case 'list':
      return <List {...props} />;
    case 'list-item':
      return <ListItem {...props} />;

    case 'table':
      return <MyTable {...props} />;
    default:
      return <p>{children}</p>;
  }
}
function Leaf({ attributes, children, leaf }) {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  if (leaf.underline) {
    children = <u>{children}</u>
  }
  if (leaf.emphasis) {
    children = <em> {children}</em>
  }
  return <span>{children}</span>;
}
export default function SlateDemo() {

  const initialValue = [{
    type: 'heading-one',
    children: [{
      text: 'Hello'
    },]
  },
  {
    type: 'paragraph',
    children: [{
      text: '欢迎使用vServe平台。',
    }, {
      type: 'link',
      url: 'http://www.baidu.com',
      children: [{
        text: '这是一个测试链接',
      }]
    }]
  }, {
    type: 'heading-two',
    children: [{
      text: '系统管理'
    }]
  }, {
    type: 'paragraph',
    children: [{
      text: '系统管理负责平台级别的功能管理。包括用户管理、服务器管理、系统升级等功能',
    }]
  }, {
    type: 'heading-three',
    children: [{
      text: '系统管理-用户管理'
    }]
  }, {
    type: 'image',
    url: '/guide-user-add.png',
    children: [{
      text: '',
    }]
  }, {
    type: 'paragraph',
    children: [{
      text: '添加用户功能路径为'
    }, {
      text: '用户管理->添加',
      emphasis: true,
    }, {
      text: '。'
    }]
  }, {
    type: 'note',
    children: [{
      text: '这是一段备注说明'
    }]
  }, {
    type: 'list',
    children: [{
      type: 'list-item',
      children: [{
        text: 'a',
      }]
    }, {
      type: 'list-item',
      children: [{
        text: 'bbb',
      }, {
        type: 'list',
        children: [{
          type: 'list-item',
          children: [{
            text: 'cccccccb'
          }]
        }]
      }]
    }]
  }, {
    type: 'table',
    columns: [{
      title: '名称',
      dataIndex: 'name',
      align: 'center',
    }, {
      title: '年龄',
      dataIndex: 'age',
      align: 'center',
    }],
    size: 'small',
    dataSource: [{
      name: 'Fabiola',
      age: 20,
    }, {
      name: 'Nick',
      age: 24,
    }, {
      name: 'Wilson',
      age: 28,
    }],
    children: [{
      text: '',
    }]
  }, {
    type: 'link',
    url: 'http://www.baidu.com',
    children: [{
      text: '测试',
    }]
  }];

  const [editor] = useState(() => withReact(createEditor()));

  const renderLeaf = useCallback(props => <Leaf {...props} />, []);
  const renderElement = useCallback(props => <Element {...props} />, []);


  return (
    <div
      className='slate-demo-box'
      style={{
        width: '60%',
        margin: 'auto'
      }}
    >
      {/* render slate context */}
      <Slate
        editor={editor}
        value={initialValue}
      >
        <Editable
          readOnly={true}
          renderLeaf={renderLeaf}
          renderElement={renderElement}
        />
      </Slate>
    </div>
  )
}

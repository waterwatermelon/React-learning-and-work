import React, { useState, useEffect, forwardRef, useRef } from "react";
import { Modal, Tabs, } from "antd";
import WangEditor from './richEditor/Editor';
const { TabPane } = Tabs;

const TAB_KEY = {
  BASE: 'base',
  DETAIL: 'detail',
  MATERIAL: 'material',
  RECOMMEND: 'recommend',
};
const Editor = forwardRef(WangEditor);

export default function ProductEditor() {
  const EditorRef = useRef();
  const [detail, setDetail] = useState('');

  return (
    <div>
      <Tabs>
        <TabPane tab="产品详情" key={TAB_KEY.DETAIL}>
          <Editor ref={EditorRef} content={detail}></Editor>
        </TabPane>
        </Tabs>
    </div>
  )
}

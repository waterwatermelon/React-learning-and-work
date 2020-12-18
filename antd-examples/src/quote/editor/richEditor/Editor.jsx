import React, { useState, useEffect, useImperativeHandle, useRef} from "react";
import Editor from "wangeditor";
import { Modal, Button } from "antd";
import "./index.scss";

const { BtnMenu, } = Editor;

class ClearBtn extends BtnMenu {
  constructor(editor) {
    const $elem = Editor.$(
      `<div class="w-e-menu" title="清空内容">
        <img class="w-e-extend-menu-icon" src="/images/editor_clear.png" />
      </div>`
    );
    super($elem, editor);
  }
  // 菜单点击事件
  clickHandler() {
    this.editor.txt.clear();
  }
  // 菜单是否被激活（如果不需要，这个函数可以空着）
  // 1. 激活是什么？光标放在一段加粗、下划线的文本时，菜单栏里的 B 和 U 被激活，如下图
  // 2. 什么时候执行这个函数？每次编辑器区域的选区变化（如鼠标操作、键盘操作等），都会触发各个菜单的 tryChangeActive 函数，重新计算菜单的激活状态
  tryChangeActive() {
    // 激活菜单
    // 1. 菜单 DOM 节点会增加一个 .w-e-active 的 css class
    // 2. this.this.isActive === true
    // this.active();

    // // 取消激活菜单
    // // 1. 菜单 DOM 节点会删掉 .w-e-active
    // // 2. this.this.isActive === false
    // this.unActive()
  }
}

class PreviewBtn extends BtnMenu {
  constructor(editor) {
    const $elem = Editor.$(
      `<div class="w-e-menu">
        <img class="w-e-extend-menu-icon" src="/images/editor_preview.png" />
      </div>`
    );
    super($elem, editor);
  }
  // 菜单点击事件
  clickHandler() {
    this.editor.preview && this.editor.preview();
  }

  tryChangeActive() {

  }
}


/**
 *
 * 预览面板
 * @param {*} props
 * @returns
 */
function PreviewModal(props) {
  const { visible ,htmlText, close } =props;

  return (
    <Modal
      className="full-screen-preview"
      width="100vw"
      mask={false}
      title="预览"
      visible={visible}
      onCancel={close}
      footer={[
        <Button key="submit" type="primary" onClick={close}>
          确定
        </Button>,
      ]}
    >
      <div dangerouslySetInnerHTML={{ __html: htmlText }}>

      </div>
    </Modal>
  );
}

function WangEditor(props, ref) {
  const { content } = props;
  const [ isPreview, setIsPreview] = useState(false);
  const [ previewContent, setPreviewContent] = useState("");
  const previewKey = 'previewMenuKey';

  const clearKey = 'clearMenuKey';

  const editorRef = useRef(null);
  let editor = new Editor("#editor");
  
  useImperativeHandle(ref, () => ({
    getContent: () => {
      return getContent();
    },
    clear: () => {
      clear();
    }
  }));

  useEffect(() => {
    editor.config.height = 500;
    editor.config.focus = true;
    editor.config.menus = [
      "head",
      "bold",
      "fontSize",
      "fontName",
      "italic",
      "underline",
      "strikeThrough",
      "indent",
      "lineHeight",
      "foreColor",
      "backColor",
      "link",
      "list",
      "justify",
      // "quote",
      // "emoticon",
      "image",
      // "video",
      "table",
      // "code",
      "splitLine",
      "undo",
      "redo",
    ];
    editor.config.colors = [
      "#000000",
      "#1c487f",
      "#4d80bf",

      "#4185d4",
      
      "#c24f4a",
      "#8baa4a",
      "#7b5ba1",
      "#46acc8",
      "#f9963b",
      "#eeece0",
      // "#ffffff"
    ];
    editor.config.uploadImgShowBase64 = true;

    editor.menus.extend('previewMenuKey', PreviewBtn);
    editor.config.menus = editor.config.menus.concat(previewKey);
    editor.preview = preview;

    editor.menus.extend(clearKey, ClearBtn);
    editor.config.menus = editor.config.menus.concat(clearKey);

    editor.create();
    editor.txt.html(content || "");

    editorRef.current = editor;

    return (() => {
      editor.destroy();
      editor = null;
    });
  }, []);

  function getContent() {
    if (editorRef.current){
      // console.log('(editorRef.current', editorRef.current.txt.html());
      const content = editorRef.current.txt.html();
      return content;
    }

    return '';
  }

  function clear() {
    editor.txt.clear();
  }

  function preview() {
    setPreviewContent(getContent());
    setIsPreview(true);
  }

  function closePreview() {
    setPreviewContent("");
    setIsPreview(false);
  }

  return (
    <div>
      <div id="editor" ></div>
      <PreviewModal visible={isPreview} htmlText={previewContent} close={closePreview}></PreviewModal>
    </div>
  );
}

export default WangEditor;

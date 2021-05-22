import { useState, useRef } from 'react';

// https://stackoverflow.com/questions/61245376/react-useref-with-array-for-dynamic
// 使用列表数组保存组件列表的引用
export default function UseRefArrayComponent() {
  const [list, setList] = useState([{ }, {}]);
  const listRef = useRef([]);
  return (
    <div>
      <h3>
      使用列表数组保存组件列表的引用
      </h3>

      {
        list.map((item, idx) => {
          // FIXME:每次列表重新渲染都会给listRef添加元素
          return (<div ref={ref => listRef.current.push(ref)}> [{idx}]</div>);
        })
      }
    </div>
  )
}

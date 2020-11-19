# summary
记录react-hook的使用

## useRef
`const refX = useRef(initialValue)`;

- 引用组件或者DOM实例
```js

function RefFunctionComponent(props) {
  const divRef = useRef();
  function changeColor() {
    console.log('divRef', divRef);
    divRef.current.style.backgroundColor = '#abcedf';
  }
  return <div ref={divRef} style={{ width: '200px', height: '100px', backgroundColor: 'salmon' }}>
    <button onClick={changeColor}>改变颜色</button>
  </div>
}
```

- 跨组件生命周期 保存变量


# summary
记录react-hook的使用

## useRef

  useRef返回一个ref对象,返回的ref对象在组件的整个生命周期保持不变


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

## forwardRef

```js

function Table(props,ref) {
  useImperativeHandle(
    ref,
    getSelectedKeys: () => {
      handler
    },
    [input],
  )
}

const WrapperTable = forwardRef(Table);
function Container() {
  const tableRef = useRef();


  return <WrapperTable ref={tableRef}/>
}
```

Table是函数组件，没有ref对象。需要借助forwardRef来转发ref，借助useImperativeHandle(ref, {}),将部分属性挂载到ref。
> 使用场景：父组件需要引用子组件的实例，但是子组件是一个函数组件。
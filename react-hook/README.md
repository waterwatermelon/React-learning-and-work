# summary
记录react-hook的使用

## useRef

useRef返回一个ref对象,返回的ref对象在组件的整个生命周期保持不变

`const refX = useRef(initialValue);`
initialValue 将用于初始化该ref的current属性,initialValue的数据类型可以是任意类型
```js
// eg: 
// 数字
const refA = useRef(0);
// 数组
const refB = useRef([]);
const refS = useRef('hello');
```

- 作用1：跨组件生命周期 保存变量

- 作用2：保存组件引用或者DOM实例
```js
function RefFunctionComponent(props) {
  const divRef = useRef();
  function changeColor() {
    console.log('divRef', divRef);
    divRef.current.style.backgroundColor = '#abc';
  }
  return <div ref={divRef} style={{ width: '200px', height: '100px', backgroundColor: 'salmon' }}>
    <button onClick={changeColor}>改变颜色</button>
  </div>
}
```


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

Table是函数组件，没有实例，无法挂载ref。需要借助forwardRef来转发ref，借助useImperativeHandle(ref, {}),将部分属性挂载到ref。
> 使用场景：父组件需要引用子组件的实例，但是子组件是一个函数组件。

## useCallback
语法：`useCallback(fn,[input])`

原理：根据依赖input的值缓存函数，当input中的值发生变化的时候才重新声明一个新的函数。

作用1：缓存内部函数实例，减少组件重新渲染的次数

useCallback配合Memo使用可以减少props没有变化的组件重新渲染次数，优化性能。只使用其中一个，不会起到优化性能的作用。
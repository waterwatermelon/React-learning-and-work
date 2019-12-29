# 合成事件
## 事件池
SytheticEvent 是合并而来的，意味着它可被其他对象复用。而且在完成一次事件回调后，它的所有属性将被无效化。所以，出于性能考虑，你不能在异步操作访问事件。但仍然可以导出事件属性。
```js
function onClick(event) {
  console.log(event); // => nullfied object
  console.log(event.type); // => "click"
  const eventType = event.type; // => "click"

  setTimeout(()=>{
    console.log(event.type); // => null
    console.log(eventType); // => "click"
  }, 0);

  this.setState({clickEvent: event}); // => null
  this.setState({eventType:event.type}); // => "click"
}
```
# Context
通过在组件树中提供一个传递组件树的方式,从而避免在每一个层级手动传递props.
## API 
- React.createContext 创建一个共享上下文的组件,defaultValue可设置共享的默认值
```js
// Provider 生产者 生产数据
// Consumer 消费者 消费provider生产的数据
// 消费者需要嵌套在生产者下面,才能拿到共享数据
const {  Provider,Consumer } = React.createContext(defaultValue);

<Provider value={ /* 可以共享的数据*/ }> </Provider>
```

```js
// Parent.js
import React from 'react';

export const { Provider, Consumer } = React.createContext('默认值');

export default function Parent() {
  let name = 'in parent';
  return (
    <Provider value={name}>
      parent name:{name}
    </Provider>
  )
}
// Children.js
import React from 'react';
import { Consumer } from './Parent.js';

export default function Son(props) {
  return (
    <Consumer> 
    {
      (name) => {
        return <span> children name:{name}</span>
      }
    }
    </Consumer>
  )
}
```
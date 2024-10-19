# xterm 库的使用
## Guide
### 下载安装
npm install @xterm/xterm

```jsx
import { Terminal } from '@xterm/xterm';
import '@xterm/xterm/css/xterm.css';
import { useEffect, useRef } from 'react'


function TermBox() {

  const ref = useRef();
  useEffect(() => {
    const terminal = new Terminal();
    terminal.open(ref.current);
    terminal.write("Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ");
    terminal.onKey(event => {
      console.log('[onKey]', event);
      let { key } = event;
      let enterKey = false;
      if (key === '\r') {
        terminal.write("\n");
        enterKey = true;
      }
      terminal.write(key);
      if (enterKey) {
        // TODO: 
        // 1.send message
        // 2.recevie message 
        // 3.print response data
      }
    });


  }, []);

  return <div ref={ref}
    style={{ border: '1px solid grey', width: '800px', height: '640px', overflow: 'auto', }} >
  </div>
}
```

## 参考资料

- https://xtermjs.org/docs/api/terminal/classes/terminal/


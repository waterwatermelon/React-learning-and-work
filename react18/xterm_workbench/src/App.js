import React, { useEffect, useRef } from 'react'
import { Terminal } from '@xterm/xterm';
import '@xterm/xterm/css/xterm.css';
import { sleep } from './util';

function TermBox() {

  const domref = useRef();
  const terminalref = useRef();
  const PROMT = "Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ";
  const handleKey = async event => {
    console.log('[onKey]', event);
    let { key } = event;
    let enterKey = false;
    if (key === '\r') {
      terminalref.current.write("\n");
      enterKey = true;
    }
    terminalref.current.write(key);
    if (enterKey) {
      // 1.send message
      // 2.recevie message 
      // 3.print response data
      await sleep(1000); // mock wait server response

      terminalref.current.write("success!!!");
      terminalref.current.write("\r\n");
      terminalref.current.write(PROMT);
    }
  };
  useEffect(() => {
    const terminal = new Terminal();
    terminalref.current = terminal;
    terminal.open(domref.current);
    terminal.write(PROMT);
    terminal.onKey(handleKey);


  }, []);

  return <div ref={domref} style={{ border: '1px solid grey', width: '800px', height: '640px', overflow: 'auto', }} >
  </div>
}

export default function App() {


  return (
    <div>
      <h1>
        xterm workbench
      </h1>
      <TermBox />
    </div>
  )
}

import React, { createContext, useContext, useState } from 'react';
const ThemeContext = createContext('');
const THEME_LIST = ['light', 'dark', 'blue'];


export default function Demo() {
  const [theme, setTheme] = useState(THEME_LIST[0]);
  const handleChangeContext = () => {
    let currentIndex = THEME_LIST.findIndex(e => e === theme);
    currentIndex = (currentIndex + 1) % THEME_LIST.length;
    setTheme(THEME_LIST[currentIndex]);
  }
  return (
    <ThemeContext.Provider value={theme}>
      <h2>hello context</h2>
      <ClassParent />
      <FunctionComponent />
      {/* <ThemeContext.Consumer children={ConsumerHoc()} /> */}
      <ThemeContext.Consumer children={ConsumerHocCommon(ConsumerComponent)} />
      <button onClick={handleChangeContext}>change context</button>
    </ThemeContext.Provider>
  )
}


function ClassParent() {
  return (<ClassComponent />);
}

class ClassComponent extends React.Component {
  // 指定contextType
  //  1.通过this.context获取到最近的Context的值。
  //  2.订阅context的变化
  // 不指定contextType,会使用默认的Context
  static contextType = ThemeContext;

  componentDidUpdate() {
    console.log('[ClassComponent] this.context', this.context);
  }
  render() {
    return <div>ClassComponent</div>
  }
}

function FunctionComponent(props) {
  // 函数组件通过使用useContext()
  //  1.获取到所需的Context
  //  2.订阅Context的变化
  const themeContext = useContext(ThemeContext);
  console.log('[FunctionComponent] themeContext', themeContext);
  return <div>function component</div>
}

function ConsumerHoc(context) {
  return <div><ConsumerComponent theme={context} /> </div>;
}

// 将消费者作为参数传入，可将消费者&消费逻辑解绑
function ConsumerHocCommon(C) { 
  return context => {
    return <C theme={context}/>
  }
}
// 通过props接收Context数据
function ConsumerComponent(props) {
  console.log('[ConsumerComponent] props', props);
  return <div>ConsumerComponent</div>
}
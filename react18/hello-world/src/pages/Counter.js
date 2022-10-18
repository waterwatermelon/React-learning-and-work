import { useState } from 'react';

function Counter() {
  const [couter, setCouter] = useState(0);
  const add = () => {
    setCouter(c => c + 1);
  }
  return (
    <div className="App">
      <span> number : {couter} </span>
      <button onClick={add}> add</button>
    </div>
  );
}

export default Counter;

import './App.css';
import Hello from './Hello';
import ComponentOne from './ComponentOne/ComponetOne.tsx';
import ComponentTwo from './ComponentTwo/ComponentTwo.tsx';

function App() {
  return (
    <div className="App">
      <Hello/>
      <ComponentOne name="hhh"/>
      <ComponentTwo name="hhh"/>
    </div>
  );
}

export default App;

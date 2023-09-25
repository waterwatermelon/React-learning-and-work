import './App.css';
import 'antd/dist/antd.css'
import StepsFormDemo from './pages/StepsFormDemo';
import ProFormFields from './pages/ProFormFields';
import JsonSchemaForm from './pages/JsonSchemaForm';

function App() {
  return (
    <div className="App">
      <ProFormFields />
      <JsonSchemaForm />
    </div>
  );
}

export default App;

import './App.css';
import 'antd/dist/antd.css';

import StepsFormDemo from './pages/StepsFormDemo';
import ProFormFields from './pages/ProFormFields';
import JsonSchemaForm from './pages/JsonSchemaForm';
import { Tabs } from 'antd';
// import { Router, Route } from 'react-router-dom';
import EditTableDemo from './pages/table/EditTableDemo';

function App() {
  return (
    <div className="App">
      <Tabs items={[{
        label: 'ProFormFields',
        key: 'ProFormFields',
        children: <ProFormFields />,
      }, {
        label: 'JsonSchemaForm',
        key: 'JsonSchemaForm',
        children: <JsonSchemaForm />,
      }, {
        label: 'StepsFormDemo',
        key: 'StepsFormDemo',
        children: <StepsFormDemo />,
      }, {
        label: 'EditTableDemo',
        key: 'EditTableDemo',
        children: <EditTableDemo />,
      }]} />

      {/* Q: Route v6  usage ? */}
      {/* <Router>
        <Route path='/path_a' Component={() => 'a'} />
        <Route path='/path_b' Component={() => 'b'} />
      </Router> */}
    </div>
  );
}

export default App;

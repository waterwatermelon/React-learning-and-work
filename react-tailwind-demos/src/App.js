import Button from "./demos/button/Button";
import Checkbox from "./demos/checkbox/Checkbox";
import Input from "./demos/input/Input";
import Radio, { RadioGroup } from "./demos/radio/Radio";
import Select from "./demos/select/Select";
import Switch from "./demos/switch/Switch";

function App() {
  return (
    <div >
      <h1 className="text-blue">hello tailwindcss</h1>
      <Button />
      <br />
      <br />
      <Input />
      <br />
      <br />
      <Input type='password' placeholder='password' />

      <br />
      <br />

      <Select />


      <br />
      <br />
      <RadioGroup options={[{ label: '1', value: '1' }, { label: '21', value: '21' },]} />
      <br />
      <br />
      <Switch />
      <br />
      <br />
      <Checkbox />
    </div>
  );
}

export default App;

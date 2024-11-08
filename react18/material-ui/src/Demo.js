import * as React from 'react';
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from '@mui/material';

export default function ButtonUsage() {
  return <> 
   <Button variant="contained">Hello world</Button>
  <br/>
    <TextField label="Outlined" variant="outlined" />
    <br/>
    <TextField error label="Outlined" variant="outlined" />
    <br/>
    <FormControl>
      <InputLabel id="demo-simple-select-label">Age</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        // value={age}
        label="Age"
      // onChange={handleChange}
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>

</>;
}

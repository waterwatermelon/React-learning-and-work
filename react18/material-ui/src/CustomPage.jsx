import { Button, TextField } from '@mui/material'
import React from 'react';
import './custom-page.css';

export default function CustomPage() {
  return (
    <div className='bg page'>
      <h1 className='title'>
        CustomPage
      </h1>

      <TextField style={{ background: '#fff' }} label="contained" placeholder='enter username' variant="filled" />
      <br />
      <Button>submit</Button>
    </div>
  )
}

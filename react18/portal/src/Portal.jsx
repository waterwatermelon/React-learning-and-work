import React from 'react'
import './portal.css';
import Login from './form/Login';
import UserInfo from './form/UserInfo';

export default function Portal() {
  return (
    <>
      <div class="wrapper">

        <div class="wrapper-header">
          <div class="title" id="title">
            欢迎来到xxx
          </div>
          <div class="logo">Logo Logo</div>

          

        </div>
        <div class="wrapper-body">
          <div class="wrapper-content">
            <Login />
          </div>
        </div>
      </div>

    </>
  )
}

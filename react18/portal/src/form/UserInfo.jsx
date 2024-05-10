import React from 'react'
import './userinfo.css';

export default function UserInfo() {
  return (
    <div className='userinfo-box'>
      <div class="form-title mb-16">用户信息</div>
      <div style={{ marginTop: '24px' }}>
        <div className='form-item'>
          <label className='form-label'>帐号</label>
          <span className='form-content'>admin</span>
        </div>
        <div className='form-item'>
          <label className='form-label'>登录成功</label>
          <span className='form-content'>2024-12-12 01:00</span>
        </div>
        <div className='form-operate'>
          <button className='btn offlin-btn' >下线</button>
        </div>
      </div>
    </div>
  )
}

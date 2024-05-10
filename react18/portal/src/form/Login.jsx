import React from 'react'
import './login.css';

export default function Login() {
  return (
    <div className='login-box'>
      <div class="form-title">登录</div>
      <div class="form-info" id="form-info">
        <span class="info-icon">
          <svg class="icon-svg" viewBox="64 64 864 864" focusable="false" data-icon="info-circle" fill="currentColor"
            aria-hidden="true">
            <path
              d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z">
            </path>
            <path
              d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z">
            </path>
          </svg>
        </span>
        <div class="info-text">
          登录帐号和密码请咨询前台获取。
        </div>
      </div>
      <form name="login">

        <div class="input-box">
          <span class="input-icon">
            <svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31 31" fill="currentColor">
              <path class="cls-1"
                d="M17.67,29.69h-5.53c-5.38,0-9.63,0-9.63-3.01v-.55c0-5.32,4.32-9.64,9.63-9.64h5.53c5.31,0,9.63,4.32,9.63,9.64v.55c0,3.01-4.46,3.01-9.63,3.01h0ZM12.14,18.63c-4.15,0-7.52,3.36-7.52,7.49v.55c0,.86,5.08.86,7.52.86h5.53c1.86,0,7.52,0,7.52-.86v-.55c0-4.13-3.37-7.49-7.52-7.49h-5.53ZM14.63,16.42c-4.24,0-7.69-3.46-7.69-7.71S10.39,1.01,14.63,1.01s7.69,3.46,7.69,7.7-3.45,7.71-7.69,7.71h0ZM9.04,8.72c0,3.06,2.51,5.56,5.58,5.56s5.58-2.49,5.58-5.56-2.5-5.55-5.58-5.55-5.58,2.49-5.58,5.55h0ZM9.04,8.72" />
            </svg>
          </span>
          <input class="input" placeholder="请输入帐号" name="account" />
        </div>
        <div class="input-box">
          <span class="input-icon">
            <svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31 31" fill="currentColor">
              <path class="cls-1"
                d="M25.16,13.61v12.39H6.58v-12.39h18.58M25.16,11.13H6.58c-1.36,0-2.48,1.11-2.48,2.48v12.39c0,1.36,1.11,2.48,2.48,2.48h18.58c1.36,0,2.48-1.11,2.48-2.48v-12.39c0-1.36-1.11-2.48-2.48-2.48h0ZM25.16,11.13" />
              <path class="cls-1"
                d="M15.56,3.7c2.73,0,4.95,2.23,4.95,4.95v2.48h-9.91v-2.48c0-2.73,2.23-4.95,4.95-4.95M15.56,1.22c-4.09,0-7.43,3.34-7.43,7.43v4.95h14.86v-4.95c0-4.09-3.34-7.43-7.43-7.43h0ZM15.56,1.22" />
              <path class="cls-1"
                d="M13.39,17.94c0,1.37,1.11,2.48,2.48,2.48s2.48-1.11,2.48-2.48-1.11-2.48-2.48-2.48-2.48,1.11-2.48,2.48h0ZM13.39,17.94" />
              <path class="cls-1"
                d="M15.87,24.14c-.68,0-1.24-.56-1.24-1.24v-4.34c0-.68.56-1.24,1.24-1.24s1.24.56,1.24,1.24v4.34c0,.68-.56,1.24-1.24,1.24h0ZM15.87,24.14" />
            </svg>
          </span>
          <input class="input" placeholder="请输入密码" type="password" name="password" />
        </div>
        <span class="form-error" id="error-text">
          密码错误
        </span>
        <div class="form-operate">
          <button class="btn" id="submit" type="button">登录</button>
        </div>


        <div class="form-footer">
          <div class="checkbox-box">
            <input type="checkbox" name="check" />
            <span class="checkbox-mask"></span>
          </div>
          <div class="form-footer-text">
            我已阅读并同意<a>《企业网络上网协议》</a>,我提供个人数据并同意 <a>《隐私策略》 </a>
          </div>
        </div>
      </form>
    </div>
  )
}

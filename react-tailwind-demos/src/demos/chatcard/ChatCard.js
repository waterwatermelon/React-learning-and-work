
import React from 'react';
import './chatcard.css';

function ChatCard() {
  return <>
    <div class="chat-notification">
      <div class="chat-notification-logo-wrapper">
        <img class="chat-notification-logo" src="/img/logo.svg" alt="ChitChat Logo" />
      </div>
      <div class="chat-notification-content">
        <h4 class="chat-notification-title">ChitChat</h4>
        <p class="chat-notification-message">You have a new message!</p>
      </div>
    </div>
    <div className='h-12'> </div>

    {/*  */}
    <div class="p-6 max-w-sm mx-auto bg-white rounded-md shadow-lg flex items-center space-x-4">
      <div class="shrink-0">
        <img class="h-12 w-12" src="/img/logo.svg" alt="ChitChat Logo" />
      </div>
      <div>
        <div class="text-xl font-medium text-black">ChitChat</div>
        <p class="text-slate-500">You have a new message!</p>
      </div>
    </div>
  </>;
}

export default ChatCard;
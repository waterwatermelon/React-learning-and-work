import axios from 'axios';
// import AccountApi from './account/AccountApi';
// import CallApi from './call/CallApi';
// import CallLogApi from './calllog/CallLogApi';
// import ConfigApi from './config/ConfigApi';
// import ContactApi from './contact/ContactApi';
// import DeviceApi from './device/DeviceApi';
import GlobalConfig from './GlobalConfig';
// import ToolApi from './tool/ToolApi';
// import RmuApi from './tool/RmuApi';
// import VsdkEvent from './event/VsdkEvent';

function LOG(...optionalParams) {
  console.info(optionalParams);
}

function LOGE(...optionalParams) {
  console.error(optionalParams);
}

/** ***************** */
/* Private Variable */
/** ***************** */
let ready = false;
const keepAliveTimeOut = 5 * 1000;
let start = false; // 开启服务, socket 监听
let websocket = null;
let socketAddress = null;
let keepAlive = null;
let reconnectTimeOut = null;
const ax = axios.create({
  baseURL: GlobalConfig.endpoint,
});

function onSocketMessage(event) {
  if (event.data) {
    try {
      const obj = JSON.parse(event.data);
      console.log(`on socket message ${obj.type}`, event);
      VSDK.event.sendEvent(obj.type, obj);
    } catch (error) {
      LOG('on socket message error,', error);
    }
  }
}

function onSocketClose(event) {
  LOG('socket close by remote,', event);
  if (start) {
    if (reconnectTimeOut) {
      clearTimeout(reconnectTimeOut);
      reconnectTimeOut = null;
    }
    reconnectTimeOut = setTimeout(() => {
      LOGE('reconnect socket');
      // eslint-disable-next-line no-use-before-define
      initSocket(socketAddress);
    }, keepAliveTimeOut);
  }
}

/**
 * SOCKET 可能在300000ms后超时关闭, 客户端持续保活
 */
function keepAliveSocket() {
  LOG('init keep alive');
  setTimeout(() => {
    if (keepAlive) {
      clearInterval(keepAlive);
    }
    keepAlive = setInterval(() => {
      websocket.send('ping');
    }, keepAliveTimeOut);
  }, keepAliveTimeOut);
}

function initWebSocket(result) {
  if (window && 'WebSocket' in window) {
    LOG('init socket ');
    if (result.callstate) {
      if (websocket) {
        LOGE('close old websocket');
        websocket.onmessage = null;
        websocket.onclose = null;
        websocket.close();
        websocket = null;
        if (keepAlive) {
          clearInterval(keepAlive);
        }
      }
      socketAddress = result.callstate;
      websocket = new WebSocket(result.callstate);
      LOG(`create socket ${result.callstate}`);
      if (websocket) {
        websocket.onmessage = onSocketMessage;
        websocket.onclose = onSocketClose;
        keepAliveSocket();
      }
    } else {
      LOGE('Invalid websocket address');
    }
  } else {
    LOGE('Not support websocket');
  }
}

function initSocket() {
  const request = new XMLHttpRequest();
  request.open('GET', GlobalConfig.endpoint + GlobalConfig.socketAddress);
  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      try {
        const result = JSON.parse(request.responseText);
        initWebSocket(result);
      } catch (e) {
        LOGE('init socket error', e);
      }
    }
  };
  request.send(null);
}

function init() {
  initSocket();
}

/** **************** */
/* Public Function */
/** **************** */
const VSDK = {
  // TODO move after init()
  // calllog: new CallLogApi(ax, GlobalConfig.calllog),
  // contact: new ContactApi(ax, GlobalConfig.contact),
  // config: new ConfigApi(ax, GlobalConfig.config),
  // device: new DeviceApi(ax, GlobalConfig.device),
  // account: new AccountApi(ax, GlobalConfig.account),
  // call: new CallApi(ax, GlobalConfig.action),
  // tool: new ToolApi(ax, GlobalConfig.tool),
  // rmu: new RmuApi(ax, GlobalConfig.tool),
  // event: new VsdkEvent(),
  listeners: [],
  init() {
    if (!ready) {
      LOG('init');
      start = true;
      init();
      // this.event.init();
      if (window) {
        window.onbeforeunload = function () {
          VSDK.uninit();
        };
      }
      if (websocket) {
        ready = true;
      }
    }
  },
  uninit() {
    start = false;
    VSDK.clear();
    ready = false;
  },
  clear() {
    if (websocket) {
      clearInterval(keepAlive);
      websocket.onmessage = null;
      websocket.onclose = null;
      websocket.close();
    }
    this.event.destroy();
  },
  getWordCut(arr) {
    const obj = {};
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      obj[item] = obj[item] + 1 || 1;
    }
    return obj;
  },
  addEventListener(event, listener, id) {
    this.listeners.push(id);
    // console.log(
    //   `ZXCV   add  after======${JSON.stringify(
    //     // this.getWordCut(this.listeners),
    //     this.listeners.length,
    //   )} +++++++`,
    // );

    return this.event.addEventListener(event, listener);
  },

  removeEventListener(listener) {
    listener.remove();
  },
  emitMessage(message) {
    try {
      console.log(`get server message${message}`);
      const obj = JSON.parse(message);
      if (websocket) {
        websocket.send(message);
      }
      if (obj.type) {
        this.event.sendEvent(obj.type, obj);
      } else {
        this.event.sendEvent(obj.event, obj);
      }
    } catch (err) {
      console.error(err);
    }
  },
  reconnect() {
    initSocket(socketAddress);
    this.event.init();
  },
  makeCall(number, acc_id, call_type = 'video') {
    console.log(`send make call ${number}`);
    this.call
      .makeCall(number, acc_id, call_type)
      .then(response => {
        LOG('make call response', response);
      })
      .catch(error => {
        LOGE('make call error', error);
        this.event.sendEvent('make_call_error', error);
      });
  },
  answerCall(id, call_type = 'video') {
    console.log(`send answer call${id}`);
    return this.call.answerCall(id, call_type);
    // ax.post(GlobalConfig.action.answerCall, {
    //   call_id: id,
    //   call_type,
    // })
    //   .then(response => {
    //     LOG('answerCall resp', response);
    //   })
    //   .catch(error => {
    //     LOG('answerCall error', error);
    //   });
  },
  hangupCall(id) {
    console.log(`send hangup call${id}`);
    ax.post(GlobalConfig.action.hangupCall, {
      call_id: id,
    })
      .then(response => {
        LOG('hangupCall resp', response);
      })
      .catch(error => {
        LOG('hangupCall error', error);
      });
  },
  videoLayoutChange(layout) {
    console.log('videoLayoutChange', layout);
    ax.post(GlobalConfig.action.videoLayout, layout)
      .then(response => {
        LOG('videoLayoutChange resp', response);
      })
      .catch(error => {
        LOG('videoLayoutChange error', error);
      });
    return true;
  },
};

if (window) {
  window.vsdk = VSDK;
}

export default VSDK;

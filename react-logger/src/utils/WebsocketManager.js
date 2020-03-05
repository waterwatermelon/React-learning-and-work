import io from 'socket.io-client';
import {
    setAppToken, setNoticeWeekCount,
    setMalWeekCount, addMalLiveItem, delMalLiveItem,
    setDutyPointPeople, setDutyPointDevice, addDutyPoint, modDutyPoint, delDutyPoint,
    addNoticeUnReadData, delNoticeUnReadData
} from '../redux/action/index';
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
// import Logger from '../components/Logger';
import { updateToken } from '../fetch/api';

// let url = '';
const nsp = '/ws';
let dispatch = null;
/**
 * 消息体
 * @param {Object} msg 后台发送的消息
 * @param {string} msg.type 消息类型
 * @param {Object} msg.data 消息数据
 */
class Message {
    constructor(msg) {
        this.msg = msg;
        this.data = msg.data;
        this.type = msg.type;
    }
    getType = function () {
        return this.type;
    }
    getData = function () {
        return this.data;
    }
}
// 消息处理句柄对象  [type]:handler
const handlers = {
    'WEBSOCKET_CONNECT': connectSuccessHandler,
    'ANNOUNCEMENT_WEEK_COUNT_DATA': setNoticeWeekCountHandler,
    'MALFUNCTION_WEEK_COUNT_DATA': setMalfunctionWeekCountHandler,
    'MALFUNCTION_DATA': setMalfunctionDataHandler,
    'DUTY_PEOPLE_CHANGE': changeDutyPeopleHandler,
    'DUTY_ORG_CHANGE_DATA': changeDutyOrgDataHandler,
    'DEVICE_STATUS_CHANGE_DATA': changeDeviceStatusHandler,
    'NOTICE_UNREAD_DATA': setNoticeUnreadListHandler,
}
function connectSuccessHandler(data) {
    console.log(data);
}
function setNoticeWeekCountHandler(weekCount) {
    dispatch(setNoticeWeekCount(weekCount));
}
function setMalfunctionWeekCountHandler(weekCount) {
    dispatch(setMalWeekCount(weekCount));
}
function setMalfunctionDataHandler(malfunction) {
    // 添加或者删除故障信息
    // console.log('malfunction :', malfunction);
    if (!malfunction.isStore) {
        dispatch(addMalLiveItem(malfunction));
    } else {
        dispatch(delMalLiveItem(malfunction));
    }
}
function changeDutyPeopleHandler(dutyPoint) {
    // 人员交接班
    const dutyPeople = {
        orgId: dutyPoint.id,
        masterId: dutyPoint.master.id,
        masterName: dutyPoint.master.name,
        soldierId: dutyPoint.soldier && dutyPoint.soldier.id,
        soldierName: dutyPoint.soldier && dutyPoint.soldier.name,
    }
    dispatch(setDutyPointPeople(dutyPeople));
}

function changeDutyOrgDataHandler(org) {
    switch (org.operate) {
        case 'ADD':
            dispatch(addDutyPoint(org));
            break;
        case 'MOD':
            dispatch(modDutyPoint(org));
            break;
        case 'DEL':
            dispatch(delDutyPoint(org));
            break;
    }
}
function changeDeviceStatusHandler(dutyPoint) {
    // 值班点设备状态变化
    dispatch(setDutyPointDevice(dutyPoint));
}

function setNoticeUnreadListHandler(notice) {
    console.log('notice', notice);
    if (!notice.isRead) {
        dispatch(addNoticeUnReadData(notice));
    } else {
        dispatch(delNoticeUnReadData(notice));
    }
}

/**
 *
 * react组件化的WebsocketManager组件
 * @class WebSocketManager
 * @extends {Component}
 */
class WebSocketManager extends Component {
    constructor({ store }) {
        super();
        this.store = store;
        dispatch = store.dispatch;
        this.url = '';
        this.socket = null;
        this.connectTimer = null;
        this.handlers = handlers;
        this.RETRY_COUNT = 5;
        this.updateTokenJob = null;
    }
    componentDidUpdate(prevProps) {
        // 监听token更新情况
        // console.log('[ws] componentDidUpdate');
        // console.log('this.props :', this.props);
        // console.log('prevProps :', prevProps);
        if (prevProps.token === '' && this.props.token !== '') {
            this.init();
        }
        if (prevProps.token !== '' && prevProps.token !== this.props.token) {
            this.connect(this.props.token);
            this.genUpdateTokenJob(this.props.token, this.props.expires);
        }
    }
    render() {
        return null;
    }
    init() {
        const state = this.store.getState();
        const token = state.app.info.token || '';
        // this.socket = io(`${url}${nsp}`, { query: { token } });
        // this.registerEventHandler(token);
        // Logger.addDebugLog('[ws] init');
        this.connect(token);
        this.socket.on('connect', () => {
            console.log('[ws] connected !');
            // Logger.addDebugLog('[ws] connected !');
        })
        this.socket.on('disconnect', () => {
            console.log('[ws] disconnect');
            // Logger.addDebugLog('[ws] disconnect !');

        });
        this.socket.on('connect_error', () => {
            console.log('[ws] connect error');
            // Logger.addDebugLog('[ws] connect error !');
        });
        this.socket.on('reconnect_attempt', (number) => {
            //
            // const token = this.store.getState().app.info.token;
            // this.socket.io.opts.query = {
            //     token,
            // }
            console.log('[ws] reconnect_attempt,attemperNumber', number);
            // Logger.addDebugLog(`[ws] reconnect_attempt,attemperNumber:${number}`);
            // Logger.addDebugLog(`[ws] this.RETRY_COUNT:${this.RETRY_COUNT}`);
            if (number >= this.RETRY_COUNT) {
                clearTimeout(this.updateTokenJob);
                console.log('[ws] close socket !');
                this.socket.close();
                this.props.history.push('/error/3');
            }
        });
    }

    connect(token) {
        const url = localStorage.getItem("host");
        if (url === '') {
            console.error('[ws] connect base url', url);
        }
        this.socket = io(`${url}${nsp}`, { query: { token } });
        this.registerEventHandler(token);
    }
    registerEventHandler(event) {
        this.socket.on(event, this.messageHandler);
    }
    cancelEventHandler(event) {
        this.socket.off(event);
    }
    /**
     * @param {Object} msg
     * @param {string} msg.type 消息类型
     * @param {Object} msg.data 具体数据
     */
    messageHandler(msg) {
        console.log('receive message:', msg);
        // Logger.addDebugLog(msg);
        const message = new Message(msg);
        const type = message.getType();
        const data = message.getData();
        handlers[type](data);
    }
    sendMessage(event = 'test', msg = 'test') {
        this.socket.emit(event, msg);
    }
    /**
     * 生成更新Token的任务,任务触发时间由expires来确定
     * @param {*} token
     * @param {number} expires token有效期，单位：秒
     * @memberof WebSocketManager
     */
    genUpdateTokenJob(token, expires) {
        console.log('[ws] genUpdateTokenJob');
        console.log('expires :', expires);
        // Logger.addDebugLog('[ws] genUpdateTokenJob');
        // Logger.addDebugLog(`expires:${expires}`);
        this.updateTokenJob = setTimeout(() => {
            console.log('[job] update token');
            // Logger.addDebugLog('[job] update token');
            updateToken({ token })
                .then((body) => {
                    if (body.success) {
                        dispatch(setAppToken(body.content));
                        localStorage.setItem("app", JSON.stringify({ token: body.content.token }))
                        this.connect(body.content.token);
                    } else {
                        console.error('update token fail');
                    }
                }).catch((err) => {
                    console.error(err);
                    console.error('update token error');
                });
        }, expires * 1000 - 60 * 1000);
    }
}

const mapStateToProps = (state) => ({
    token: state.app.info.token,
    expires: state.app.info.expires,
})
const mapDispatchToProps = {

}
// 使用withRouter装饰，可获取当前Router的history对象
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WebSocketManager))
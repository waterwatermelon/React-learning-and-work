import ReactDOM from 'react-dom';
import React from 'react';
import { getDateTime } from './utils/util';
import './style/logger.css';

/**
 * log
 * <string> level 日志级别
 * <string | object > message 日志内容,可能是字符串或者是对象
 * <date> ctime 日志生成时间
 */
/**
 *
 * logger工具
 * @class Logger 
 * 在页面上输出log
 * TODO:环境判断,默认的log级别
 */
class Logger {
    constructor({ level }) {
        this.list = [];
        this.fold = false;
        // this.state = {
        //     list: []
        // }
        
        this.LEVEL = level || 'debug';
        this.createContainer();
        this.clearOldLog();
        this.render();
        this.handleSwitchFold = this.handleSwitchFold.bind(this);
        this.handleClearLog = this.handleClearLog.bind(this);
    }
    // 渲染日志信息的容器
    createContainer() {
        let el = document.createElement('div');
        el.id = 'logger';
        el.classList.add("logger");
        document.body.appendChild(el);
        el = null;
    }
    // 未使用 模拟react组件的setStata函数
    setState(nextState) {
        this.state = Object.assign(this.state, nextState);
        this.render();
    }
    // 添加日志
    addLog(log) {
        console.log('log', log)
        log.ctime = new Date();
        this.list.push(log);
        this.render();
    }
    /* 添加debug info warn error级别的日志 START*/
    addDebugLog(message) {
        const log = { message };
        log.level = 'debug';
        this.addLog(log);
    }
    addInfoLog(message) {
        const log = { message };
        log.level = 'info';
        this.addLog(log);
    }
    addWarnLog(message) {
        const log = { message };
        log.level = 'warn';
        this.addLog(log);
    }
    addErrorLog(message) {
        const log = { message };
        log.level = 'error';
        this.addLog(log);
    }
    /* 添加debug info warn error级别的日志 END*/
    //定时清空旧的日志
    clearOldLog() {
        setInterval(() => {
            this.delLog();
        }, 1000 * 60 * 30); // 30 minutes 
        // }, 1000);
    }
    // 删除第一条日志
    delLog() {
        if (this.list.length) {
            this.list.pop();
            this.render();
        }
    }

   
    handleSwitchFold() {
        const dom = document.getElementById("logger");
        this.fold = !this.fold;
        if (this.fold) {
            dom.style.height = '30px';
            dom.style.width = '120px';
        } else {
            dom.style.height = '';
            dom.style.width = '';
        }
        this.render();
    }
    // 清空所有日志
    handleClearLog() {
        if (this.list.length) {
            this.list = [];
            this.render();
        }
    }
    // 渲染日志 
    renderLogs() {
        // TODO:按照等级进行过滤
        return this.list.map((item, idx) => {
            const message = item.message instanceof Object ? JSON.stringify(item.message) : item.message;
            return (
                <div className={`logger-item`}>
                    <span className="logger-time">
                        {getDateTime(item.ctime) + `[${item.level}]`}
                    </span>
                    >> &nbsp;
                    <span className={`logger-${item.level}`}>
                        {message}
                    </span>
                </div>)
        })
    } 
    render() {
        ReactDOM.render(
            <div 
                className="logger-box" 
            >
                {this.renderLogs()}
                <div className="logger-btns">
                    <button 
                        className="logger-btn" 
                        onClick={this.handleSwitchFold}>
                        {this.fold ? '展开' : '折叠'}
                    </button>
                    <button 
                        className="logger-btn" 
                        onClick={this.handleClearLog}>
                            清空
                    </button>
                </div>
            </div>
            , document.getElementById('logger'));
    }
}
if (process.env.NODE_ENV === 'development') {
}  
// 单例模式
if (!window.Logger) {
    window.Logger = new Logger({});
    window.Logger.addDebugLog(`NODE_ENV:${process.env.NODE_ENV}`);
}
export default window.Logger;


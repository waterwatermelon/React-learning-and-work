import { notification } from 'antd';

export function showMessage(type, message, des) {
    notification[type]({
        message: message,
        description: des,
    });
};
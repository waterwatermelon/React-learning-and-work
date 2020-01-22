import { ADD_NUMBER, ADD_ADDRESS } from './actionType';
export const addNumber = (number) => ({
    type: ADD_NUMBER,
})

export const addAddress = (address) => {
    return {
        type: ADD_ADDRESS,
        address,
    }
}

// export function addAddressAsync(address) {
//     return function (dispatch) {
//         dispatch(addAddress(address));
//         return new Promise((res, rej) => {
//             setTimeout(() => {
//                 res('ok');
//             }, 1000);
//         })
//     }
// }
// redux-thunk 测试action
export function testAsync() {
    return function (dispatch) {
        console.log('call async pro');
        return new Promise(res => {
            setTimeout(() => {
                console.log('micro task');
                res('micro task');
            }, 3000);
        });
    }
}
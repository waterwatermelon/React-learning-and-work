import { ADD_NUMBER, ADD_ADDRESS,SET_ADDRESS_LIST, REQUEST_FETCH, RECEIVE_FETCH } from './actionType';
export const addNumber = (number) => ({
    type: ADD_NUMBER,
})
// address action creator
function setAddressList(addressList) {
    return {
        type:SET_ADDRESS_LIST,
        addressList,
    }
}
export const addAddress = (address) => {
    return {
        type: ADD_ADDRESS,
        address,
    }
}
// fetch action creator
export function requestFetch(){
    return {
        type:REQUEST_FETCH,
    }
}
export function receiveFetch(){
    return {
        type:RECEIVE_FETCH,
    }
}

// url,method,data,callback
export function getAddressListAsync() {
    return function(dispatch) {
        dispatch(requestFetch());
        return fetch('/json/addressList.json')
            .then(response => response.json())
            .then(json => {
                dispatch(receiveFetch());
                dispatch(setAddressList(json));
                return json;
            });
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
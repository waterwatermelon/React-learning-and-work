import axios from 'axios'; 
const baseURL  ='http://127.0.0.1:7001'
export function login(data){
    return axios({
        url:baseURL+'/api/login',
        method:'post',
        data
    })
}
const getResponse = function(url,data,method='post'){
    return axios({
        url:baseURL+url,
        data,
        method
    });
}

export default getResponse;
import axios from 'axios'; 
const baseURL  ='http://127.0.0.1:7001'
const getResponse = function(url,data,method='post'){
    return axios({
        url:baseURL+url,
        data,
        method
    });
}

export default getResponse;
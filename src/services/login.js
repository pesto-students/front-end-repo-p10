import axios from "./axios"

export const clientLoginAPI = (payload) => {
    return axios.post('/client/login',payload).then(res=>{
        return res;
    }).catch(error=>{
        throw error?.response || error;
    });
}

export const superAdminLoginAPI = (payload) => {
    return axios.post('/super/login',payload).then(res=>{
        return res;
    }).catch(error=>{
        throw error?.response || error;
    });
}
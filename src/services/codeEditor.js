import axios from "./axios";

export const runCodeAPI = (payload={}) => {
  return  axios.post("/run",payload).then(res=>{
        return res;
    }).catch(error=>{
        throw error?.response || error;
    })
}

export const getJobStatusAPI = (params={}) => {
    return  axios.get("/code/status",{
        params:params,
    }).then(res=>{
          return res;
      }).catch(error=>{
        throw error?.response || error;
      })
  }
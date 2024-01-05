import axios from "./axios";

export const getClientDataAPI = (payload) => {
    return axios.get("/client",payload)
      .then((res) => res)
      .catch((error) => {
          throw error?.response || error
      });
  };
  
  export const editSuperAdminDataAPI = (payload) => {
    return axios.post("/super/edit",payload)
      .then((res) => res)
      .catch((error) => {
          throw error?.response || error
      });
  };
  export const getSuperAdminDataAPI = (payload) => {
    return axios.get("/super",payload)
      .then((res) => res)
      .catch((error) => {
          throw error?.response || error
      });
  };
  
import axios from "./axios";

export const getAllClientsAPI = (payload) => {
    return axios.post("/client/all",payload)
      .then((res) => res)
      .catch((error) => {
          throw error?.response || error
      });
  };

  export const editClientDataAPI = (payload) => {
    return axios.post("/client/edit",payload)
      .then((res) => res)
      .catch((error) => {
          throw error?.response || error
      });
  };
  
  export const addClientAPI = (payload) => {
    return axios.post("/org/add",payload)
      .then((res) => res)
      .catch((error) => {
          throw error?.response || error
      });
  };
  

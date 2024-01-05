import axios from "./axios";

export const getGraphDataAPI = (payload) => {
    return axios.get("/interview/monthly-data",payload)
      .then((res) => res)
      .catch((error) => {
          throw error?.response || error
      });
  };
  
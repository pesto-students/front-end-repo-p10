import axios from "./axios";

export const getInterviewStatsAPI = () => {
  return axios.get("/interivew/stats")
    .then((res) => res)
    .catch((error) => {
        throw error?.response || error
    });
};

export const getAllInterviewsAPI = (payload) => {
  return axios.post("/interview/all",payload)
    .then((res) => res)
    .catch((error) => {
        throw error?.response || error
    });
};

export const addInterviewAPI = (payload) => {
  return axios.post("/interview/add",payload)
    .then((res) => res)
    .catch((error) => {
        throw error?.response || error
    });
};


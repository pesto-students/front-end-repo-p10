import axios from "./axios"

export const getAllQuestionsAPI = (payload) => {
    return axios.post("/question/all",payload)
      .then((res) => res)
      .catch((error) => {
          throw error?.response || error
      });
  };

export const addQuestionAPI = (payload) => {
    return axios.post("/question/add",payload)
      .then((res) => res)
      .catch((error) => {
          throw error?.response || error
      });
  };  
  
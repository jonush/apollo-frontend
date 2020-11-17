import { axiosWithAuth } from "./index";

// Topic Endpoints
const questions = `${process.env.REACT_APP_API_URI}/questions`;

// fetch a question by its ID
const getQuestionByID = id => {
  return axiosWithAuth()
    .get(`${questions}/${id}`)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    })
};

const getQuestionByTopicID = topicID => {
  return axiosWithAuth()
    .get(`${questions}/topic/${topicID}`)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    })
};

const getDefaultQuestions = topicID => {
  return axiosWithAuth()
    .get(`${questions}/topic/${topicID}/default`)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    })
};

const createQuestion = question => {
  return axiosWithAuth()
    .post(questions, question)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    })
};

const updateQuestion = (question, id) => {
  return axiosWithAuth()
    .put(`${questions}/${id}`, question)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    })
};

const deleteQuestion = id => {
  return axiosWithAuth()
    .delete(`${questions}/${id}`)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    })
};

export {
  getQuestionByID,
  getQuestionByTopicID,
  getDefaultQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};
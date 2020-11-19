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

// fetch a question by a topic ID
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

// get all default questions from a topic
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

// create a new question
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

// edit a question
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

// delete a question
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
import { axiosWithAuth } from "./index";

// Topic Endpoints
const surveyQuestions = `${process.env.REACT_APP_API_URI}/survey-questions`;

// fetch all survey questions
const getAllSurveyQuestions = () => {
  return axiosWithAuth()
    .get(surveyQuestions)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    })
};

// fetch a survey question by its ID
const getSurveyQuestionByID = id => {
  return axiosWithAuth()
    .get(`${surveyQuestions}/${id}`)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    })
};

// create a new survey question
const createSurveyQuestion = question => {
  return axiosWithAuth()
    .post(surveyQuestions, question)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    })
};

// edit a survey question
const updateSurveyQuestion = (question, id) => {
  return axiosWithAuth()
    .put(`${surveyQuestions}/${id}`, question)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    })
};

// delete a survey question
const deleteSurveyQuestion = id => {
  return axiosWithAuth()
    .delete(`${surveyQuestions}/${id}`)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    })
};

export {
  getAllSurveyQuestions,
  getSurveyQuestionByID,
  createSurveyQuestion,
  updateSurveyQuestion,
  deleteSurveyQuestion,
};
import { axiosWithAuth } from "./index";

// Responses Endpoints
const responses = `${process.env.REACT_APP_API_URI}/responses`;

// fetch a response by its ID
const getResponseByID = id => {
  return axiosWithAuth()
    .get(`${responses}/${id}`)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    })
};

// fetch all responses by a survey ID
const getResponsesBySurveyID = surveyID => {
  return axiosWithAuth()
    .get(`${responses}/survey/${surveyID}`)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    })
};

// create a new response
const createResponse = response => {
  return axiosWithAuth()
    .post(responses, response)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    })
};

// edit a response
const updateResponse = (response, id) => {
  return axiosWithAuth()
    .put(`${responses}/${id}`, response)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    })
};

// delete a response
const deleteResponse = id => {
  return axiosWithAuth()
    .delete(`${responses}/${id}`)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    })
};

export {
  getResponseByID,
  getResponsesBySurveyID,
  createResponse,
  updateResponse,
  deleteResponse,
};
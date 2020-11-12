import { axiosWithAuth } from "./index";

// Survey Endpoints
const surveys = `${process.env.REACT_APP_API_URI}/surveys`;

// fetch a topic by its ID
const getSurveyByID = id => {
  return axiosWithAuth()
    .get(`${surveys}/${id}`)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    })
};

const getSurveyByTopicID = topicID => {
  return axiosWithAuth()
    .get(`${surveys}/topic/${topicID}`)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    })
};

const createSurvey = survey => {
  return axiosWithAuth()
    .post(surveys, survey)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    })
};

const updateSurvey = (survey, id) => {
  return axiosWithAuth()
    .put(`${surveys}/${id}`, survey)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    })
};

const deleteSurvey = id => {
  return axiosWithAuth()
    .delete(`${surveys}/${id}`)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    })
};

export {
  getSurveys,
  getSurveyByID,
  getSurveyByTopicID,
  createSurvey,
  updateSurvey,
  deleteSurvey,
};
import { axiosWithAuth } from "./index";

// Survey Endpoints
const surveys = `${process.env.REACT_APP_API_URI}/surveys`;

// fetch a survey by its ID
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

// get all surveys by a topic ID
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

// create a new survey
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

// edit a survey
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

// delete a survey
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
  getSurveyByID,
  getSurveyByTopicID,
  createSurvey,
  updateSurvey,
  deleteSurvey,
};
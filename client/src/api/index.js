import axios from "axios";

// The methods to make calls to the API endpoints should be in this file.
// Methods should be created and exported from this file, and imported into components.

// BASE URL
const baseURL = `https://apollo-be-api.herokuapp.com`

// API ENDPOINTS
// refer to the API documentation for a list of all endpoints:
// https://github.com/jonush/apollo-backend
const auth = `${baseURL}/auth`;
const users = `${baseURL}/users`;
const topics = `${baseURL}/topics`;
const topicMembers = `${baseURL}/topic-members`;
const surveys = `${baseURL}/surveys`;
const questions = `${baseURL}/questions`;
const surveyQuestions = `${baseURL}/survey-questions`;
const responses = `${baseURL}/responses`;
const comments = `${baseURL}/comments`;

// AXIOS AUTHENTICATION HEADER FOR TOKEN
// use this method to make calls to restricted routes (instead of "axios")
const axiosWithAuth = () => {
  const token = localStorage.getItem('token');
  return axios.create({
    headers: {
      Authorization: 'Bearer ' + token,
    },
    baseURL: baseURL
  });
};

// Authentication Endpoints
const registerUser = newUser => {
  return axios
    .post(`${auth}/register`, newUser)
    .then(res => {
      localStorage.setItem('token', res.data.token);
      return res.data;
    })
    .catch(err => {
      console.log(err);
    })
};

const loginUser = credentials => {
  return axios
    .post(`${auth}/login`, credentials)
    .then(res => {
      localStorage.setItem('token', res.data.token);
      return res.data;
    })
    .catch(err => {
      console.log(err);
    })
};

export {
  axiosWithAuth,
  registerUser,
  loginUser,
};
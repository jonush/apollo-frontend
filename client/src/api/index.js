import axios from "axios";

// The methods to make calls to the API endpoints should be in this file.
// Methods should be created and exported from this file, and imported into components.

// BASE URL
// can also be set up in a .env file as: process.env.REACT_APP_API_URI
const baseURL = `https://apollo-be-api.herokuapp.com`

// refer to the API documentation for a list of all endpoints:
// https://github.com/jonush/apollo-backend
const auth = `${process.env.REACT_APP_API_URI}/auth`;
const users = `${process.env.REACT_APP_API_URI}/users`;

// AXIOS AUTHENTICATION HEADER FOR TOKEN
// use this method to make calls to restricted routes (instead of "axios")
const axiosWithAuth = () => {
  const token = localStorage.getItem('token');
  return axios.create({
    headers: {
      Authorization: token,
    },
    baseURL: process.env.REACT_APP_API_URI
  });
};

// Authentication Endpoints
// register a new user
const registerUser = newUser => {
  return axios
    .post(`${auth}/register`, newUser)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    })
};

// log in with a user's credentials
const loginUser = credentials => {
  return axios
    .post(`${auth}/login`, credentials)
    .then(res => {
      localStorage.setItem('token', res.token);
      return res.message;
    })
    .catch(err => {
      console.log(err);
    })
};

export {
  baseURL,
  axiosWithAuth,
  registerUser,
  loginUser,
};
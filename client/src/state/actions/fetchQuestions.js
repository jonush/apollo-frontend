import { axiosWithAuth } from "../../api/index";

export const QUESTIONS_START = "QUESTIONS_START";
export const QUESTIONS_SUCCESS = "QUESTIONS_SUCCESS";
export const QUESTIONS_FAILURE = "QUESTIONS_FAILURE";
export const QUESTIONS_RESET = "QUESTIONS_RESET";

// Questions Endpoint
const questions = `${process.env.REACT_APP_API_URI}/questions`

export const fetchQuestions = id => dispatch => {
  dispatch({ type: QUESTIONS_START })

  axiosWithAuth()
    .get(`${questions}/topic/${id}`)
    .then(res => {
      dispatch({ type: QUESTIONS_SUCCESS, payload: res.data })
    })
    .catch(err => {
      dispatch({ type: QUESTIONS_FAILURE, payload: err })
    })
};

export const fetchDefaultQuestions = id => dispatch => {
  dispatch({ type: QUESTIONS_START })

  axiosWithAuth()
    .get(`${questions}/topic/${id}/default`)
    .then(res => {
      dispatch({ type: QUESTIONS_SUCCESS, payload: res.data })
    })
    .catch(err => {
      dispatch({ type: QUESTIONS_FAILURE, payload: err })
    })
};

export const resetQuestions = () => dispatch => {
  dispatch({ type: QUESTIONS_RESET })
}
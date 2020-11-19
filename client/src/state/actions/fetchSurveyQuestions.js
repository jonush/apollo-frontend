import { axiosWithAuth } from "../../api/index";

export const SURVEY_QUESTIONS_START = "SURVEY_QUESTIONS_START";
export const SURVEY_QUESTIONS_SUCCESS = "SURVEY_QUESTIONS_SUCCESS";
export const SURVEY_QUESTIONS_FAILURE = "SURVEY_QUESTIONS_FAILURE";
export const SURVEY_QUESTIONS_RESET = "SURVEY_QUESTIONS_RESET";

// Survey Questions Endpoint
const surveyQuestions = `${process.env.REACT_APP_API_URI}/survey-questions`

export const fetchSurveyQuestions = id => dispatch => {
  dispatch({ type: SURVEY_QUESTIONS_START })

  axiosWithAuth()
    .get(`${surveyQuestions}/survey/${id}`)
    .then(res => {
      dispatch({ type: SURVEY_QUESTIONS_SUCCESS, payload: res.data })
    })
    .catch(err => {
      dispatch({ type: SURVEY_QUESTIONS_FAILURE, payload: err })
    })
};

export const resetSurveyQuestions = () => dispatch => {
  dispatch({ type: SURVEY_QUESTIONS_RESET })
}
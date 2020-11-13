import { axiosWithAuth } from "../../api/index";

export const RESPONSES_START = "RESPONSES_START";
export const RESPONSES_SUCCESS = "RESPONSES_SUCCESS";
export const RESPONSES_FAILURE = "RESPONSES_FAILURE";
export const RESPONSES_RESET = "RESPONSES_RESET";

// Responses Endpoints
const responses = `${process.env.REACT_APP_API_URI}/responses`

export const fetchResponses = id => dispatch => {
  dispatch({ type: RESPONSES_START })

  axiosWithAuth()
    .get(`${responses}/survey/${id}`)
    .then(res => {
      dispatch({ type: RESPONSES_SUCCESS, payload: res.data })
    })
    .catch(err => {
      dispatch({ type: RESPONSES_FAILURE, payload: err })
    })
};

export const resetResponses = () => dispatch => {
  dispatch({ type: RESPONSES_RESET })
}
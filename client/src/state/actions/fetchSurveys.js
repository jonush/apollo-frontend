import { axiosWithAuth } from "../../api/index";

export const SURVEYS_START = "SURVEYS_START";
export const SURVEYS_SUCCESS = "SURVEYS_SUCCESS";
export const SURVEYS_FAILURE = "SURVEYS_FAILURE";

// Survey Endpoints
const surveys = `${process.env.REACT_APP_API_URI}/surveys`

export const fetchSurveys = id => dispatch => {
  dispatch({ type: SURVEYS_START })

  axiosWithAuth()
    .get(`${surveys}/topic/${id}`)
    .then(res => {
      console.log(res);
      dispatch({ type: SURVEYS_SUCCESS, payload: res.data })
    })
    .catch(err => {
      dispatch({ type: SURVEYS_FAILURE, payload: err })
    })
};
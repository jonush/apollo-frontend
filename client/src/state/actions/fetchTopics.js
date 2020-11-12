import { axiosWithAuth } from "../../api/index";

export const TOPICS_START = "TOPICS_START";
export const TOPICS_SUCCESS = "TOPICS_SUCCESS";
export const TOPICS_FAILURE = "TOPICS_FAILURE";

// Topic Endpoints
const topics = `${process.env.REACT_APP_API_URI}/topics`

export const fetchTopics = () => dispatch => {
  dispatch({ type: TOPICS_START })

  axiosWithAuth()
    .get(topics)
    .then(res => {
      console.log(res);
      dispatch({ type: TOPICS_SUCCESS, payload: res.data })
    })
    .catch(err => {
      dispatch({ type: TOPICS_FAILURE, payload: err })
    })
};
import { axiosWithAuth } from "../../api/index";

export const MEMBERS_START = "MEMBERS_START";
export const MEMBERS_SUCCESS = "MEMBERS_SUCCESS";
export const MEMBERS_FAILURE = "MEMBERS_FAILURE";
export const MEMBERS_RESET = "MEMBERS_RESET";

// Topic Members Endpoint
const topicMembers = `${process.env.REACT_APP_API_URI}/topic-members`

// get all topic members from a topic ID
export const fetchTopicMembers = topicID => dispatch => {
  dispatch({ type: MEMBERS_START })

  axiosWithAuth()
    .get(`${topicMembers}/topic/${topicID}`)
    .then(res => {
      dispatch({ type: MEMBERS_SUCCESS, payload: res.data })
    })
    .catch(err => {
      dispatch({ type: MEMBERS_FAILURE, payload: err })
    })
};

export const resetTopicMembers = () => dispatch => {
  dispatch({ type: MEMBERS_RESET })
};
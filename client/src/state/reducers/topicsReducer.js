import { TOPICS_START, TOPICS_SUCCESS, TOPICS_FAILURE } from "../actions/fetchTopics";

export const initialState = {
  isFetching: false,
  topics: [],
  errors: "",
};

export const topicsReducer = (state = initialState, action) => {
  switch(action.type) {
    case TOPICS_START:
      return {
        ...state,
        isFetching: true,
      }
    case TOPICS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        topics: action.payload,
      }
    case TOPICS_FAILURE:
      return {
        ...state,
        errors: action.payload
      }
    default:
      return state
  }
}

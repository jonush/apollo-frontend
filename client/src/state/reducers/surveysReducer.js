import { SURVEYS_START, SURVEYS_SUCCESS, SURVEYS_FAILURE } from "../actions/fetchSurveys";

export const initialState = {
  isFetching: false,
  surveys: [],
  errors: "",
};

export const surveysReducer = (state = initialState, action) => {
  switch(action.type) {
    case SURVEYS_START:
      return {
        ...state,
        isFetching: true,
      }
    case SURVEYS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        surveys: action.payload,
      }
    case SURVEYS_FAILURE:
      return {
        ...state,
        errors: action.payload
      }
    default:
      return state
  }
}

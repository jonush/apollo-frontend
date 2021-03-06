import {
  RESPONSES_START,
  RESPONSES_SUCCESS,
  RESPONSES_FAILURE,
  RESPONSES_RESET,
} from "../actions/fetchResponses";

export const initialState = {
  isLoading: false,
  responses: [],
  errors: "",
};

export const responsesReducer = (state = initialState, action) => {
  switch(action.type) {
    case RESPONSES_START:
      return {
        ...state,
        isLoading: true,
      }
    case RESPONSES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        responses: action.payload,
      }
    case RESPONSES_FAILURE:
      return {
        ...state,
        errors: action.payload
      }
    case RESPONSES_RESET:
      return {
        responses: initialState.responses,
      }
    default:
      return state
  }
}

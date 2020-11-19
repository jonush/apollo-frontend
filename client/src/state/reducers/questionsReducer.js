import {
  QUESTIONS_START,
  QUESTIONS_SUCCESS,
  QUESTIONS_FAILURE,
  QUESTIONS_RESET,
} from "../actions/fetchQuestions";

export const initialState = {
  isFetching: false,
  questions: [],
  errors: "",
};

export const questionsReducer = (state = initialState, action) => {
  switch(action.type) {
    case QUESTIONS_START:
      return {
        ...state,
        isFetching: true,
      }
    case QUESTIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        questions: action.payload,
      }
    case QUESTIONS_FAILURE:
      return {
        ...state,
        errors: action.payload
      }
    case QUESTIONS_RESET: {
      return {
        questions: initialState.questions,
      }
    }
    default:
      return state
  }
}

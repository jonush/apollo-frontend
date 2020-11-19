import {
  SURVEY_QUESTIONS_START,
  SURVEY_QUESTIONS_SUCCESS,
  SURVEY_QUESTIONS_FAILURE,
  SURVEY_QUESTIONS_RESET,
} from "../actions/fetchSurveyQuestions";

export const initialState = {
  isFetching: false,
  surveyQuestions: [],
  errors: "",
};

export const surveyQuestionsReducer = (state = initialState, action) => {
  switch(action.type) {
    case SURVEY_QUESTIONS_START:
      return {
        ...state,
        isFetching: true,
      }
    case SURVEY_QUESTIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        surveyQuestions: action.payload,
      }
    case SURVEY_QUESTIONS_FAILURE:
      return {
        ...state,
        errors: action.payload
      }
    case SURVEY_QUESTIONS_RESET: {
      return {
        surveyQuestions: initialState.surveyQuestions,
      }
    }
    default:
      return state
  }
}

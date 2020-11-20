import { combineReducers } from "redux";
import { topicsReducer as topicsList } from "../reducers/topicsReducer";
import { surveysReducer as surveysList } from "../reducers/surveysReducer";
import { responsesReducer as responsesList } from "../reducers/responsesReducer";
import { questionsReducer as questionsList } from "../reducers/questionsReducer";
import { surveyQuestionsReducer as surveyQuestionsList } from "../reducers/surveyQuestionsReducer";
import { membersReducer as membersList } from "../reducers/membersReducer";

export default combineReducers({
  topicsList,
  surveysList,
  responsesList,
  questionsList,
  surveyQuestionsList,
  membersList,
});
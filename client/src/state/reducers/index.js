import { combineReducers } from "redux";
import { topicsReducer as topicsList } from "../reducers/topicsReducer";
import { surveysReducer as surveysList } from "../reducers/surveysReducer";
import { responsesReducer as responsesList } from "../reducers/responsesReducer";

export default combineReducers({
  topicsList,
  surveysList,
  responsesList,
});
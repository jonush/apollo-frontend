import { combineReducers } from "redux";
import { topicsReducer as topicsList } from "../reducers/topicsReducer";
import { surveysReducer as surveysList } from "../reducers/surveysReducer";

export default combineReducers({
  topicsList,
  surveysList,
});
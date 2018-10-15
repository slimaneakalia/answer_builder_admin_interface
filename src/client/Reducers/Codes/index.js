import { combineReducers } from "redux";
import CodesSearchResult from "_reducers/Codes/CodesSearchResult";
import currentAnswerCodeUID from "_reducers/Codes/currentAnswerCodeUID";

export default combineReducers({
  currentAnswerCodeUID,
  CodesSearchResult
});

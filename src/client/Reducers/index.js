import { combineReducers } from "redux";
import Languages from "_reducers/Languages";
import Channels from "_reducers/Channels";
import Codes from "_reducers/Codes";

export default combineReducers({
  Languages,
  Channels,
  Codes
});

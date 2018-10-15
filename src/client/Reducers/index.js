import { combineReducers } from "redux";
import Languages from "_reducers/Languages";
import Channels from "_reducers/Channels";
import Codes from "_reducers/Codes";
import Commands from "_reducers/Commands";
import Variables from "_reducers/Variables";
import Items from "_reducers/Items";
import { routerReducer } from "react-router-redux";

export default combineReducers({
  Languages,
  Channels,
  Codes,
  Commands,
  Variables,
  Items,
  routing: routerReducer
});

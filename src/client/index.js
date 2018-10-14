/* 
	* @author{Slimane AKALIA} slimaneakalia@gmail.com, Linkedin.com/in/slimaneakalia
*/
import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "_reducers";
import fetchLanguages from "_action_creators/Languages";
import fetchChannels from "_action_creators/Channels";
import fetchAnswerCodes from "_action_creators/AnswerCodes";
import fetchAnswerItems from "_action_creators/AnswerItems";
import fetchAnswerVariables from "_action_creators/AnswerVariables";
import fetchCommands from "_action_creators/Commands";
import App from "./App";

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

fetchLanguages(store);
fetchChannels(store);
fetchAnswerCodes(store);
fetchAnswerItems(store);
fetchAnswerVariables(store);
fetchCommands(store);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

/* 
	* @author{Slimane AKALIA} slimaneakalia@gmail.com, Linkedin.com/in/slimaneakalia
*/
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeTab from "_home";
import CodesTab from "_codes";
import ItemTab from "_items";
import VariablesTab from "_variables";
import CommandsTab from "_commands";
import SideBar from "_shared/Components/SideBar";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "_reducers";
import fetchLanguages from "_action_creators/Languages";
import fetchChannels from "_action_creators/Channels";
import fetchAnswerCodes from "_action_creators/AnswerCodes";
import fetchAnswerItems from "_action_creators/AnswerItems";
import fetchAnswerVariables from "_action_creators/AnswerVariables";
import fetchCommands from "_action_creators/Commands";
import { createBrowserHistory } from "history";
import { syncHistoryWithStore } from "react-router-redux";

const activeClassName = "active";
const routes = {
  home: "/",
  items: "/items",
  codes: "/codes",
  variables: "/variables",
  commands: "/commands"
};

const tabs = [
  {
    link: routes.home,
    className: "sf-house",
    label: "Home"
  },
  {
    link: routes.items,
    className: "sf-window-system",
    label: "Answer items"
  },
  {
    link: routes.codes,
    className: "sf-file-code",
    label: "Answer codes"
  },
  {
    link: routes.variables,
    className: "sf-sign-sync",
    label: "Answer variables"
  },
  {
    link: routes.commands,
    className: "sf-notepad",
    label: "Commands"
  }
];

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

const history = syncHistoryWithStore(createBrowserHistory(), store);

export default function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <React.Fragment>
          <SideBar activeClassName={activeClassName} tabs={tabs} />
          <Route path={routes.home} exact component={HomeTab} />
          <Route path={routes.items} exact component={ItemTab} />
          <Route path={routes.codes} exact component={CodesTab} />
          <Route path={routes.variables} exact component={VariablesTab} />
          <Route path={routes.commands} exact component={CommandsTab} />
        </React.Fragment>
      </Router>
    </Provider>
  );
}

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

export default function App() {
  return (
    <Router>
      <React.Fragment>
        <SideBar activeClassName={activeClassName} tabs={tabs} />
        <Route path={routes.home} exact component={HomeTab} />
        <Route path={routes.items} exact component={ItemTab} />
        <Route path={routes.codes} exact component={CodesTab} />
        <Route path={routes.variables} exact component={VariablesTab} />
        <Route path={routes.commands} exact component={CommandsTab} />
      </React.Fragment>
    </Router>
  );
}

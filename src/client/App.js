/* 
	* @author{Slimane AKALIA} slimaneakalia@gmail.com, Linkedin.com/in/slimaneakalia
*/
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeTab from "_home";
import CodesTab from "_codes";
import ItemTab from "_items";
import SideBar from "_shared/Components/SideBar";

const activeClassName = "active";
const routes = {
  home: "/",
  items: "/items",
  codes: "/codes"
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
      </React.Fragment>
    </Router>
  );
}

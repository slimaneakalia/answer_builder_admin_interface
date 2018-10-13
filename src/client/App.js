/* 
	* @author{Slimane AKALIA} slimaneakalia@gmail.com, Linkedin.com/in/slimaneakalia
*/
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeTab from "_home";
import SideBar from "_shared/Components/SideBar";

const activeClassName = "active";
const routes = {
  home: "/"
};
const tabs = [
  {
    link: routes.home,
    className: "sf-house",
    label: "Home"
  }
];

export default function App() {
  return (
    <Router>
      <React.Fragment>
        <SideBar activeClassName={activeClassName} tabs={tabs} />
        <Route path={routes.home} exact component={HomeTab} />
      </React.Fragment>
    </Router>
  );
}

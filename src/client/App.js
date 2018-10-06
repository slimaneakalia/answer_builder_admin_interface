import React from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import HomeTab from "_home";

const SideBar = () => (
  <div id="cm-menu">
    <nav className="cm-navbar cm-navbar-primary">
      <div className="cm-flex">
        <div className="cm-logo" />
      </div>
      <div className="btn btn-primary md-menu-white" data-toggle="cm-menu" />
    </nav>
    <div id="cm-menu-content">
      <div id="cm-menu-items-wrapper">
        <div id="cm-menu-scroller">
          <ul className="cm-menu-items">
            <li>
              <NavLink
                to="/"
                exact
                className="sf-house"
                activeClassName="active"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/codes"
                exact
                className="sf-file-code"
                activeClassName="active"
              >
                Answer codes
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

const Codes = () => (
  <React.Fragment>
    <div className="anchor" id="a0" />

    <div className="container-fluid cm-container-white">
      <b>Hello Codes</b>
    </div>
  </React.Fragment>
);

const CurrentTab = () => (
  <React.Fragment>
    <Route path="/" exact component={HomeTab} />
    <Route path="/codes" exact component={Codes} />
  </React.Fragment>
);

const SidebarExample = () => (
  <Router>
    <React.Fragment>
      <SideBar />
      <CurrentTab />
    </React.Fragment>
  </Router>
);

export default SidebarExample;

/* 
	* @author{Slimane AKALIA} slimaneakalia@gmail.com, Linkedin.com/in/slimaneakalia
*/
import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

function SideBar({ tabs, activeClassName }) {
  const links = tabs.map(tab => (
    <li>
      <NavLink
        to={tab.link}
        exact
        className={tab.className}
        activeClassName={activeClassName}
      >
        {tab.label}
      </NavLink>
    </li>
  ));

  return (
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
            <ul className="cm-menu-items">{links}</ul>
          </div>
        </div>
      </div>
    </div>
  );
}

SideBar.propTypes = {
  tabs: PropTypes.isRequired,
  activeClassName: PropTypes.string.isRequired
};

export default SideBar;

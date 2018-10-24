/* 
	* @author{Slimane AKALIA} slimaneakalia@gmail.com, Linkedin.com/in/slimaneakalia
*/
import React from "react";

const TabHeader = ({ label }) => (
  <header id="cm-header">
    <nav className="cm-navbar cm-navbar-primary">
      <div className="cm-flex">
        <h1>{label}</h1>
      </div>
    </nav>
  </header>
);

export default TabHeader;

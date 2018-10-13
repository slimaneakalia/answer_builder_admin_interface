/* 
	* @author{Slimane AKALIA} slimaneakalia@gmail.com, Linkedin.com/in/slimaneakalia
*/
import React from "react";

function WrapTableContainer(WrappedComponent, label) {
  const HOC = props => (
    <React.Fragment>
      <div className="panel panel-default">
        <h3>{label}</h3>
        <div className="panel-body">
          <WrappedComponent {...props} />
        </div>
      </div>
    </React.Fragment>
  );

  return HOC;
}

export default WrapTableContainer;

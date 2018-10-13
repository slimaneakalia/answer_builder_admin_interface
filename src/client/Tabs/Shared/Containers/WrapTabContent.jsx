/* 
	* @author{Slimane AKALIA} slimaneakalia@gmail.com, Linkedin.com/in/slimaneakalia
*/
import React from "react";
import TabHeader from "_shared/Components/TabHeader";

function WrapTabContent(WrappedComponent, label) {
  const HOC = props => (
    <React.Fragment>
      <TabHeader label={label} />
      <div id="global">
        <WrappedComponent {...props} />
      </div>
    </React.Fragment>
  );

  return HOC;
}

export default WrapTabContent;

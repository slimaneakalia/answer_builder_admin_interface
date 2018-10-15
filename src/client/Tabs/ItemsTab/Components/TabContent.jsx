import React from "react";

import AnswerCodesPanelContainer from "_items/Containers/AnswerCodesPanelContainer";
import AnswerItemsDashboardContainer from "_items/Containers/AnswerItemsDashboardContainer";
import WrapTableContainer from "_shared/Containers/WrapTableContainer";

const NoAnswerCode = () => (
  <div className="anchor" id="a0">
    <div className="container-fluid cm-container-white">
      <div className="row cm-container-white">
        <h1>No Answer Code is selected</h1>
      </div>
    </div>
  </div>
);

const AnswerItemsDashboard = WrapTableContainer(
  AnswerItemsDashboardContainer,
  "Answer items"
);

const AnswerCodesPanel = WrapTableContainer(
  AnswerCodesPanelContainer,
  "Answer code"
);

const TabComponent = ({ Code, Description }) => {
  if (Code && Description) {
    return (
      <React.Fragment>
        <div className="anchor" id="a0" />
        <div className="container-fluid cm-container-white">
          <AnswerCodesPanel Code={Code} Description={Description} />
          <AnswerItemsDashboard />
        </div>
      </React.Fragment>
    );
  }
  return <NoAnswerCode />;
};

export default TabComponent;

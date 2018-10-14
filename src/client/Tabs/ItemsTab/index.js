import React from "react";

import WrapTabContent from "_shared/Containers/WrapTabContent";
import AnswerCodesPanelContainer from "_items/Containers/AnswerCodesPanelContainer";
import AnswerItemsDashboardContainer from "_items/Containers/AnswerItemsDashboardContainer";

const TabComponent = () => (
  <React.Fragment>
    <div className="anchor" id="a0" />
    <div className="container-fluid cm-container-white">
      <AnswerCodesPanelContainer />
      <AnswerItemsDashboardContainer />
    </div>
  </React.Fragment>
);

const TabContent = WrapTabContent(TabComponent, "Answer items");
export default TabContent;

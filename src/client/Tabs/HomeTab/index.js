import React from "react";

import WrapTabContent from "_shared/Components/WrapTabContent";
import SearchBar from "_shared/Components/SearchBar";

const TabComponent = () => (
  <React.Fragment>
    <div className="anchor" id="a0" />
    <div className="container-fluid cm-container-white">
      <SearchBar placeholder="Enter a text" />
    </div>
  </React.Fragment>
);

const TabContent = WrapTabContent(TabComponent, "Home");
export default TabContent;

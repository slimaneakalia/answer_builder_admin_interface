import React from "react";

import WrapTabContent from "_shared/Containers/WrapTabContent";
import SearchTextContainer from "_shared/Containers/SearchTextContainer";
import AnswerCodesTableContainer from "_home/Containers/AnswerCodesTableContainer";

const onSearchClick = e => {
  console.log("New event was detected !");
  console.log(e);
};

const TabComponent = () => (
  <React.Fragment>
    <div className="anchor" id="a0" />
    <div className="container-fluid cm-container-white">
      <SearchTextContainer
        placeholder="Search ..."
        onSearchClick={onSearchClick}
      />
    </div>

    <div className="container-fluid">
      <div style={{ height: "20px" }} />
      <AnswerCodesTableContainer withAddItemButton />
    </div>
  </React.Fragment>
);

const TabContent = WrapTabContent(TabComponent, "Answer codes");
export default TabContent;

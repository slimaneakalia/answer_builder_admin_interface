import React from "react";

import WrapTabContent from "_shared/Containers/WrapTabContent";
import SearchTextContainer from "_shared/Containers/SearchTextContainer";
import ChannelFilterContainer from "_shared/Containers/ChannelFilterContainer";
import LanguageFilterContainer from "_shared/Containers/LanguageFilterContainer";

import AnswerCodesTableContainer from "_home/Containers/AnswerCodesTableContainer";

const TabComponent = () => (
  <React.Fragment>
    <div className="anchor" id="a0" />
    <div className="container-fluid cm-container-white">
      <SearchTextContainer placeholder="Search ..." />
    </div>

    <div className="container-fluid cm-container-white">
      <ChannelFilterContainer />
    </div>

    <div className="container-fluid cm-container-white">
      <LanguageFilterContainer />
    </div>

    <div className="container-fluid">
      <div style={{ height: "20px" }} />
      <AnswerCodesTableContainer />
    </div>
  </React.Fragment>
);

const TabContent = WrapTabContent(TabComponent, "Home");
export default TabContent;

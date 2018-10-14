import React from "react";

import WrapTabContent from "_shared/Containers/WrapTabContent";
import SearchTextContainer from "_shared/Containers/SearchTextContainer";
import AnswerVariablesContainer from "_home/Containers/AnswerVariablesContainer";

const searchByName = e => {
  console.log("searchByName event was detected !");
  console.log(e);
};

const searchByValue = e => {
  console.log("searchByValue event was detected !");
  console.log(e);
};

const searchByGroup = e => {
  console.log("searchByGroup event was detected !");
  console.log(e);
};

const searchBySubGroup = e => {
  console.log("searchBySubGroup event was detected !");
  console.log(e);
};

const TabComponent = () => (
  <React.Fragment>
    <div className="anchor" id="a0" />
    <div className="container-fluid cm-container-white">
      <div className="row">
        <div className="col-sm-6">
          <SearchTextContainer
            label="Search by name"
            placeholder="Enter a name ..."
            onSearchClick={searchByName}
          />
        </div>

        <div className="col-sm-6">
          <SearchTextContainer
            label="Search by value"
            placeholder="Enter a value ..."
            onSearchClick={searchByValue}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-6">
          <SearchTextContainer
            label="Search by group"
            placeholder="Enter a group ..."
            onSearchClick={searchByGroup}
          />
        </div>

        <div className="col-sm-6">
          <SearchTextContainer
            label="Search by subgroup"
            placeholder="Enter a subgroup ..."
            onSearchClick={searchBySubGroup}
          />
        </div>
      </div>
    </div>

    <div className="container-fluid">
      <div style={{ height: "20px" }} />
      <AnswerVariablesContainer withAddItemButton />
    </div>
  </React.Fragment>
);

const TabContent = WrapTabContent(TabComponent, "Answer variables");
export default TabContent;

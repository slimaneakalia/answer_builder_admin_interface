import React from "react";

import WrapTabContent from "_shared/Containers/WrapTabContent";
import SearchTextContainer from "_shared/Containers/SearchTextContainer";
import AnswerVariablesContainer from "_home/Containers/AnswerVariablesContainer";
import WrapTableContainer from "_shared/Containers/WrapTableContainer";
import { searchVariableByKey } from "_action_creators/AnswerVariables";
import ActionTypes from "_action_creators/ActionTypes";

const searchByName = (input, dispatch) => {
  searchVariableByKey(
    "name",
    input.value,
    dispatch,
    ActionTypes.UPDATE_SEARCH_NAME
  );
};

const searchByValue = (input, dispatch) => {
  searchVariableByKey(
    "value",
    input.value,
    dispatch,
    ActionTypes.UPDATE_SEARCH_VALUE
  );
};

const searchByGroup = (input, dispatch) => {
  searchVariableByKey(
    "group",
    input.value,
    dispatch,
    ActionTypes.UPDATE_SEARCH_GROUP
  );
};

const searchBySubGroup = (input, dispatch) => {
  searchVariableByKey(
    "subGroup",
    input.value,
    dispatch,
    ActionTypes.UPDATE_SEARCH_SUBGROUP
  );
};

const AnswerVariables = WrapTableContainer(
  AnswerVariablesContainer,
  "Answer variables"
);

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
      <AnswerVariables withAddItemButton />
    </div>
  </React.Fragment>
);

const TabContent = WrapTabContent(TabComponent, "Answer variables");
export default TabContent;

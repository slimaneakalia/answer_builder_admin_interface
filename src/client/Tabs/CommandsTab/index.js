import React from "react";

import WrapTabContent from "_shared/Containers/WrapTabContent";
import CommandsTableContainer from "_commands/Containers/CommandsTableContainer";
import SearchTextContainer from "_shared/Containers/SearchTextContainer";
import WrapTableContainer from "_shared/Containers/WrapTableContainer";
import { searchCommandByKey } from "_action_creators/Commands";
import ActionTypes from "_action_creators/ActionTypes";

const searchByName = (input, dispatch) => {
  searchCommandByKey(
    "name",
    input.value,
    dispatch,
    ActionTypes.UPDATE_SEARCH_NAME
  );
};

const searchByText = (input, dispatch) => {
  searchCommandByKey(
    "text",
    input.value,
    dispatch,
    ActionTypes.UPDATE_SEARCH_TEXT
  );
};

const searchByDescription = (input, dispatch) => {
  searchCommandByKey(
    "description",
    input.value,
    dispatch,
    ActionTypes.UPDATE_SEARCH_DESCRIPTION
  );
};

const CommandsTable = WrapTableContainer(
  CommandsTableContainer,
  "Answer commands"
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
            label="Search by text"
            placeholder="Enter a text ..."
            onSearchClick={searchByText}
          />
        </div>
      </div>

      <div className="row">
        <SearchTextContainer
          label="Search by description"
          placeholder="Enter a description ..."
          onSearchClick={searchByDescription}
        />
      </div>
    </div>
    <div className="container-fluid">
      <CommandsTable withAddItemButton />
    </div>
  </React.Fragment>
);

const TabContent = WrapTabContent(TabComponent, "Commands");
export default TabContent;

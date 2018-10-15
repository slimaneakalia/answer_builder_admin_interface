import React from "react";

import WrapTabContent from "_shared/Containers/WrapTabContent";
import CommandsTableContainer from "_commands/Containers/CommandsTableContainer";
import SearchTextContainer from "_shared/Containers/SearchTextContainer";
import WrapTableContainer from "_shared/Containers/WrapTableContainer";

const searchByName = (e, dispatch) => {
  console.log("searchByName event was detected !");
  console.log(e);
};

const searchByText = (e, dispatch) => {
  console.log("searchByText event was detected !");
  console.log(e);
};

const searchByDescription = (e, dispatch) => {
  console.log("searchByDescription event was detected !");
  console.log(e);
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

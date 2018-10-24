import React from "react";

import AnswerItemTableContentContainer from "_home/Containers/AnswerItemTableContentContainer";
import ChannelFilterContainer from "_shared/Containers/ChannelFilterContainer";
import LanguageFilterContainer from "_shared/Containers/LanguageFilterContainer";
import SearchTextContainer from "_shared/Containers/SearchTextContainer";

const AnswerItemsDashboard = ({ searchByName, searchBytext }) => (
  <React.Fragment>
    <div className="row cm-container-white">
      <div className="col-sm-6">
        <ChannelFilterContainer />
      </div>

      <div className="col-sm-6">
        <LanguageFilterContainer />
      </div>
    </div>

    <div className="row cm-container-white">
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
          onSearchClick={searchBytext}
        />
      </div>
    </div>
    <br />
    <AnswerItemTableContentContainer withAddItemButton />
  </React.Fragment>
);

export default AnswerItemsDashboard;

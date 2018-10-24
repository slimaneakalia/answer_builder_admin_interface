import React from "react";

import WrapTabContent from "_shared/Containers/WrapTabContent";
import SearchTextContainer from "_shared/Containers/SearchTextContainer";
import AnswerCodesTableContainer from "_home/Containers/AnswerCodesTableContainer";
import WrapTableContainer from "_shared/Containers/WrapTableContainer";
import { fetchAnswerCodesByText } from "_action_creators/AnswerCodes";
import ActionTypes from "_action_creators/ActionTypes";

const onSearchClick = (input, dispatch) => {
  const action = { type: ActionTypes.UPDATE_SEARCH_TEXT, text: input.value };
  dispatch(action);

  fetchAnswerCodesByText(input.value, dispatch);
};

const AnswerCodesTable = WrapTableContainer(
  AnswerCodesTableContainer,
  "Answer codes"
);

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
      <AnswerCodesTable withAddItemButton />
    </div>
  </React.Fragment>
);

const TabContent = WrapTabContent(TabComponent, "Answer codes");
export default TabContent;

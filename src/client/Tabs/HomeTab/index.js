/* 
	* @author{Slimane AKALIA} slimaneakalia@gmail.com, Linkedin.com/in/slimaneakalia
*/
import React from "react";

import WrapTabContent from "_shared/Containers/WrapTabContent";
import SearchTextContainer from "_shared/Containers/SearchTextContainer";
import ChannelFilterContainer from "_shared/Containers/ChannelFilterContainer";
import LanguageFilterContainer from "_shared/Containers/LanguageFilterContainer";

import AnswerCodesTableContainer from "_home/Containers/AnswerCodesTableContainer";
import AnswerItemTableContentContainer from "_home/Containers/AnswerItemTableContentContainer";
import WrapTableContainer from "_shared/Containers/WrapTableContainer";
import AnswerVariablesContainer from "_home/Containers/AnswerVariablesContainer";
import searchAllByText from "_action_creators";

const onSearchClick = (input, dispatch) => {
  searchAllByText(input.value, dispatch);
};

const AnswerItemTable = WrapTableContainer(
  () => <AnswerItemTableContentContainer />,
  "Answer Items"
);

const AnswerCodesTable = WrapTableContainer(
  AnswerCodesTableContainer,
  "Answer codes"
);

const AnswerVariables = WrapTableContainer(
  AnswerVariablesContainer,
  "Answer variables"
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

    <div className="container-fluid cm-container-white">
      <ChannelFilterContainer />
    </div>

    <div className="container-fluid cm-container-white">
      <LanguageFilterContainer />
    </div>

    <div className="container-fluid">
      <div style={{ height: "20px" }} />
      <AnswerCodesTable />
    </div>

    <div className="container-fluid">
      <AnswerItemTable />
    </div>

    <div className="container-fluid">
      <AnswerVariables />
    </div>
  </React.Fragment>
);

const TabContent = WrapTabContent(TabComponent, "Home");
export default TabContent;

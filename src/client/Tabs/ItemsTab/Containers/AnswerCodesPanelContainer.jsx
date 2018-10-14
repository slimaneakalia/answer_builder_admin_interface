import React from "react";
import AnswerCodesPanel from "_items/Components/AnswerCodesPanel";
import WrapTableContainer from "_shared/Containers/WrapTableContainer";

const data = {
  Code: "My current answer code",
  Description: "My current description"
};

const Component = () => <AnswerCodesPanel {...data} />;

const AnswerCodesPanelContainer = WrapTableContainer(Component, "Answer code");

export default AnswerCodesPanelContainer;

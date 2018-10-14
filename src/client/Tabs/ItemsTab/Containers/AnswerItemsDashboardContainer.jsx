import React from "react";
import AnswerItemsDashboard from "_items/Components/AnswerItemsDashboard";
import WrapTableContainer from "_shared/Containers/WrapTableContainer";

const searchByName = e => {
  console.log("Search by name event was detected !");
  console.log(e);
};

const searchBytext = e => {
  console.log("Search by text event was detected !");
  console.log(e);
};

const Component = () => (
  <AnswerItemsDashboard
    searchByName={searchByName}
    searchBytext={searchBytext}
  />
);

const AnswerItemsDashboardContainer = WrapTableContainer(
  Component,
  "Answer items"
);

export default AnswerItemsDashboardContainer;

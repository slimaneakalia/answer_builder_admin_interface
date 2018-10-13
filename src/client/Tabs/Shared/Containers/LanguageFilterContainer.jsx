/* 
	* @author{Slimane AKALIA} slimaneakalia@gmail.com, Linkedin.com/in/slimaneakalia
*/
import React from "react";
import SearchFilter from "_shared/Components/SearchFilter";

const data = {
  FR: { Language_label: "FR", selected: false },
  EN: { Language_label: "EN", selected: true }
};

const updateFilter = e => {
  console.log("New update language event was detected !");
  console.log(e);
};

const constants = {
  label: "Filter by language",
  textkey: "Language_label"
};

const LanguageFilterContainer = () => (
  <SearchFilter updateFilter={updateFilter} data={data} {...constants} />
);

export default LanguageFilterContainer;

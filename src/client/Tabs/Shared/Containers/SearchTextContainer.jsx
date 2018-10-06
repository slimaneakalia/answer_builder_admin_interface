import React from "react";
import SearchBar from "../Components/SearchBar";

const onSearchClick = e => {
  console.log("New event was detected !");
  console.log(e);
};

const SearchTextContainer = props => (
  <SearchBar onSearchClick={onSearchClick} {...props} />
);

export default SearchTextContainer;

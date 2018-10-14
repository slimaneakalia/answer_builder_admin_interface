/* 
	* @author{Slimane AKALIA} slimaneakalia@gmail.com, Linkedin.com/in/slimaneakalia
*/
import React from "react";
import PropTypes from "prop-types";
import SearchBar from "_shared/Components/SearchBar";

const SearchTextContainer = props => <SearchBar {...props} />;

SearchTextContainer.propTypes = {
  onSearchClick: PropTypes.isRequired
};

export default SearchTextContainer;

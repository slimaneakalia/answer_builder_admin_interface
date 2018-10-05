import React from "react";
import PropTypes from "prop-types";

const SearchBar = ({ label, onSearchClick }) => {
    const searchBar = (<div className="input-group input-group-lg">
      <input type="text" className="form-control" placeholder={placeholder} />
      <span className="input-group-btn">
        <button
          style={{ zIndex: 2 }}
          className="btn btn-primary md-search-white"
          type="button"
          onClick={{ onSearchClick }}
        >
          &nbsp;&nbsp;&nbsp;&nbsp;
        </button>
      </span>
    </div>);

    if (label){
        return (
            <React.Fragment>
                <h2 style="margin-top:0">{label}</h2>
                <blockquote>{searchBar}</blockquote>
            </React.Fragment>
        )
    }else
        return searchBar;
}
    
);

SearchBar.propTypes = {
  label: PropTypes.string,
  placeholder : PropTypes.string.isRequired,
  onSearchClick: PropTypes.isRequired
};

export default SearchBar;

import React from "react";
import PropTypes from "prop-types";

function createFilterItem(item, idKey, textkey, updateFilter) {
  const classNames = item.selected
    ? ["btn-primary", "fa-close"]
    : ["btn-danger", "fa-plus"];
  return (
    <button
      type="button"
      className={`btn ${classNames[0]}`}
      key={item[idKey]}
      onClick={updateFilter}
    >
      {item[textkey]} &nbsp;&nbsp;
      <i className={`fa ${classNames[1]}`} />
    </button>
  );
}

const SearchFilter = ({ label, data, idKey, textkey, updateFilter }) => {
  const buttons = data.map(item =>
    createFilterItem(item, idKey, textkey, updateFilter)
  );
  return (
    <React.Fragment>
      <h2 style={{ marginTop: 0 }}>{label}</h2>
      <blockquote>{buttons}</blockquote>
    </React.Fragment>
  );
};

SearchFilter.propTypes = {
  label: PropTypes.string.isRequired,
  data: PropTypes.isRequired,
  idKey: PropTypes.string.isRequired,
  textkey: PropTypes.string.isRequired,
  updateFilter: PropTypes.isRequired
};

export default SearchFilter;

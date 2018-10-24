/* 
	* @author{Slimane AKALIA} slimaneakalia@gmail.com, Linkedin.com/in/slimaneakalia
*/
import React from "react";

function createFilterItem(item, id, textkey, updateFilter) {
  const classNames = item.selected
    ? ["btn-primary", "fa-close"]
    : ["btn-danger", "fa-plus"];
  return (
    <button
      type="button"
      className={`btn ${classNames[0]}`}
      key={id}
      id={id}
      onClick={updateFilter}
      style={{ marginRight: "10px" }}
    >
      {item[textkey]} &nbsp;&nbsp;
      <i className={`fa ${classNames[1]}`} />
    </button>
  );
}

const SearchFilter = ({ label, data, textkey, updateFilter }) => {
  const buttons = Object.keys(data).map(key =>
    createFilterItem(data[key], key, textkey, updateFilter)
  );

  return (
    <React.Fragment>
      <h2 style={{ marginTop: 0 }}>{label}</h2>
      <blockquote>{buttons}</blockquote>
    </React.Fragment>
  );
};

export default SearchFilter;

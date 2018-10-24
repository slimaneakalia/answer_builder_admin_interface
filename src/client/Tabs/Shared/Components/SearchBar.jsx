/* 
	* @author{Slimane AKALIA} slimaneakalia@gmail.com, Linkedin.com/in/slimaneakalia
*/
import React from "react";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.searchBarRef = React.createRef();
  }

  handleClick = () => {
    const { onSearchClick } = this.props;
    onSearchClick(this.searchBarRef.current);
  };

  render() {
    const { label, placeholder } = this.props;
    const searchBar = (
      <div className="input-group input-group-lg">
        <input
          type="text"
          className="form-control"
          placeholder={placeholder}
          ref={this.searchBarRef}
        />
        <span className="input-group-btn">
          <button
            style={{ zIndex: 2 }}
            className="btn btn-primary md-search-white"
            type="button"
            onClick={this.handleClick}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;
          </button>
        </span>
      </div>
    );

    if (label) {
      return (
        <React.Fragment>
          <h2 style={{ marginTop: 0 }}>{label}</h2>
          <blockquote>{searchBar}</blockquote>
        </React.Fragment>
      );
    }
    return searchBar;
  }
}

export default SearchBar;

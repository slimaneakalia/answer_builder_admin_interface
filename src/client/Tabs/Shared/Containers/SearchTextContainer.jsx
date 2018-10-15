/* 
	* @author{Slimane AKALIA} slimaneakalia@gmail.com, Linkedin.com/in/slimaneakalia
*/
import SearchBar from "_shared/Components/SearchBar";
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSearchClick: e => ownProps.onSearchClick(e, dispatch)
});

export default connect(
  null,
  mapDispatchToProps
)(SearchBar);

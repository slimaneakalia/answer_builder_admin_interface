/* 
	* @author{Slimane AKALIA} slimaneakalia@gmail.com, Linkedin.com/in/slimaneakalia
*/
import { connect } from "react-redux";
import SearchFilter from "_shared/Components/SearchFilter";

const updateFilter = (e, dispatch) => {
  console.log("New update language event was detected !");
  console.log(e);
  console.log(dispatch);
};

const constants = {
  label: "Filter by language",
  textkey: "Language_label"
};

const mapStateToProps = state => ({
  data: state.Languages
});

const mapDispatchToProps = dispatch => ({
  updateFilter: e => updateFilter(e, dispatch),
  ...constants
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchFilter);

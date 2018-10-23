/* 
	* @author{Slimane AKALIA} slimaneakalia@gmail.com, Linkedin.com/in/slimaneakalia
*/
import { connect } from "react-redux";
import SearchFilter from "_shared/Components/SearchFilter";
import { updateFilterId } from "_action_creators/Languages";

const updateFilter = (e, dispatch) => {
  const id = e.currentTarget.getAttribute("id");
  dispatch(updateFilterId(id));
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

/* 
	* @author{Slimane AKALIA} slimaneakalia@gmail.com, Linkedin.com/in/slimaneakalia
*/
import { connect } from "react-redux";
import SearchFilter from "_shared/Components/SearchFilter";

const updateFilter = (e, dispatch) => {
  console.log("New update channel event was detected !");
  console.log(e);
  console.log(dispatch);
};

const constants = {
  label: "Filter by channel",
  textkey: "Channel_label"
};

const mapStateToProps = state => ({
  data: state.Channels
});

const mapDispatchToProps = dispatch => ({
  updateFilter: e => updateFilter(e, dispatch),
  ...constants
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchFilter);

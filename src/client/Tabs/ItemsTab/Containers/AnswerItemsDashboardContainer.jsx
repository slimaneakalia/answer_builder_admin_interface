import AnswerItemsDashboard from "_items/Components/AnswerItemsDashboard";
import { connect } from "react-redux";
import { searchByName, searchByText } from "_action_creators/AnswerItems";

const mapDispatchToProps = dispatch => ({
  searchByName: input => searchByName(input.value, dispatch),
  searchBytext: input => searchByText(input.value, dispatch)
});

export default connect(
  null,
  mapDispatchToProps
)(AnswerItemsDashboard);

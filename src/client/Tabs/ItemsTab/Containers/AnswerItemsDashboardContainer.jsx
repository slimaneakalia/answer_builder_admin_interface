import AnswerItemsDashboard from "_items/Components/AnswerItemsDashboard";
import { connect } from "react-redux";

const searchByName = (e, dispatch) => {
  console.log("Search by name event was detected !");
  console.log(e);
};

const searchBytext = (e, dispatch) => {
  console.log("Search by text event was detected !");
  console.log(e);
};

const mapDispatchToProps = dispatch => ({
  searchByName: e => searchByName(e, dispatch),
  searchBytext: e => searchBytext(e, dispatch)
});

export default connect(
  null,
  mapDispatchToProps
)(AnswerItemsDashboard);

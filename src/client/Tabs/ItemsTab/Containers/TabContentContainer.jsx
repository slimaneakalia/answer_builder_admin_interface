import { connect } from "react-redux";
import TabContent from "_items/Components/TabContent";

const mapStateToProps = state => {
  const currentUID = state.Codes.currentAnswerCodeUID;
  if (currentUID) {
    const tmp = state.Codes.CodesSearchResult[currentUID];
    if (tmp) return tmp;
  }

  return {};
};

export default connect(mapStateToProps)(TabContent);

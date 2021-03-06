import AnswerCodesPanel from "_items/Components/AnswerCodesPanel";

import { connect } from "react-redux";

const mapStateToProps = state => {
  let data = {};
  const currentUID = state.Codes.currentAnswerCodeUID;
  if (currentUID) {
    const tmp = state.Codes.CodesSearchResult[currentUID];
    if (tmp) data = tmp;
  }

  return { data };
};

export default connect(mapStateToProps)(AnswerCodesPanel);

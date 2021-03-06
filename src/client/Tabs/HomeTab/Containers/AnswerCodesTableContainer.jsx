/* 
	* @author{Slimane AKALIA} slimaneakalia@gmail.com, Linkedin.com/in/slimaneakalia
*/
import AnswerCodesTable from "_home/Components/AnswerCodesTable";
import checkDescription from "_shared/Helpers/AnswerItemHelper";
import { connect } from "react-redux";
import {
  editCode,
  removeCode,
  updateCurrentCode,
  createNewAnswerCode
} from "_action_creators/AnswerCodes";
import { createItem } from "_action_creators/AnswerItems";

const remove = (answerCodeUID, dispatch) => {
  removeCode({ Answer_UID: answerCodeUID }, dispatch);
};

const editAnswerCode = (answerCodeUID, code, description, dispatch) => {
  editCode(
    { Answer_UID: answerCodeUID, Code: code, Description: description },
    dispatch
  );
};

const mapStateToProps = state => ({
  channels: state.Channels,
  languages: state.Languages,
  data: state.Codes.CodesSearchResult,
  currentAnswerCodeUID: state.Codes.currentAnswerCodeUID
});

const mapDispatchToProps = dispatch => ({
  editAnswerCode: (answerCodeUID, code, description) =>
    editAnswerCode(answerCodeUID, code, description, dispatch),
  remove: answerCodeUID => remove(answerCodeUID, dispatch),
  createNewAnswerItem: answerItemData => createItem(answerItemData, dispatch),
  createNewAnswerCode: answerCodeData =>
    createNewAnswerCode(answerCodeData, dispatch),
  selectNewCode: codeUID => updateCurrentCode(codeUID, dispatch),
  checkDescription
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnswerCodesTable);

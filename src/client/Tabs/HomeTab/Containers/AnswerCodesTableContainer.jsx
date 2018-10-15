/* 
	* @author{Slimane AKALIA} slimaneakalia@gmail.com, Linkedin.com/in/slimaneakalia
*/
import AnswerCodesTable from "_home/Components/AnswerCodesTable";
import checkDescription from "_shared/Helpers/AnswerItemHelper";
import { connect } from "react-redux";

const remove = (answerCodeUID, dispatch) => {
  console.log(`UID to remove : ${answerCodeUID}`);
};

const editAnswerCode = (answerCodeUID, code, description, dispatch) => {
  console.log(`New Edition with data to add :`);
  console.log(`answerCodeUID : ${answerCodeUID}`);
  console.log(`code : ${code}`);
  console.log(`description : ${description}`);
};

const createNewAnswerItem = (answerItemData, dispatch) => {
  console.log("New AnswerItem to add :");
  console.log(answerItemData);
  return new Promise(resolve => {
    resolve();
    // reject("Internal Server error : Minoucha");
  });
};

const createNewAnswerCode = (answerCodeData, dispatch) => {
  console.log("New AnswerCode to add :");
  console.log(answerCodeData);
  return new Promise(resolve => {
    resolve();
    // reject("Internal Server error : Minoucha");
  });
};

const selectNewCode = (codeUID, dispatch) => {
  console.log("New Code to select");
  console.log(codeUID);
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
  createNewAnswerItem: answerItemData =>
    createNewAnswerItem(answerItemData, dispatch),
  createNewAnswerCode: answerCodeData =>
    createNewAnswerCode(answerCodeData, dispatch),
  selectNewCode: codeUID => selectNewCode(codeUID, dispatch),
  checkDescription
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnswerCodesTable);

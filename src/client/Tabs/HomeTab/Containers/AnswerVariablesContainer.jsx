/* 
	* @author{Slimane AKALIA} slimaneakalia@gmail.com, Linkedin.com/in/slimaneakalia
*/
import { connect } from "react-redux";
import AnswerVariablesTable from "_home/Components/AnswerVariablesTable";
import {
  editVariable,
  duplicateVariable,
  removeVariable,
  createVariable
} from "_action_creators/AnswerVariables";

const mapStateToProps = state => ({
  data: state.Variables.VariablesSearchResult
});

const mapDispatchToProps = dispatch => ({
  edit: answerVariableData => editVariable(answerVariableData, dispatch),
  duplicate: answerVariableUID =>
    duplicateVariable(answerVariableUID, dispatch),
  remove: answerVariableUID => removeVariable(answerVariableUID, dispatch),
  create: answerVariableData => createVariable(answerVariableData, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnswerVariablesTable);

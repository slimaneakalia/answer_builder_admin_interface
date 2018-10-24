/* 
	* @author{Slimane AKALIA} slimaneakalia@gmail.com, Linkedin.com/in/slimaneakalia
*/
import { connect } from "react-redux";
import AnswerVariablesTable from "_home/Components/AnswerVariablesTable";
import {
  editVariable,
  duplicateVariable,
  removeVariable
} from "_action_creators/AnswerVariables";

const create = answerVariableData => {
  console.log("New AnswerVariable to add :");
  console.log(answerVariableData);
  return new Promise(resolve => {
    resolve();
    // reject("Internal Server error : Minoucha");
  });
};

const mapStateToProps = state => ({
  data: state.Variables.VariablesSearchResult
});

const mapDispatchToProps = dispatch => ({
  edit: answerVariableData => editVariable(answerVariableData, dispatch),
  duplicate: answerVariableUID =>
    duplicateVariable(answerVariableUID, dispatch),
  remove: answerVariableUID => removeVariable(answerVariableUID, dispatch),
  create: answerVariableData => create(answerVariableData, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnswerVariablesTable);

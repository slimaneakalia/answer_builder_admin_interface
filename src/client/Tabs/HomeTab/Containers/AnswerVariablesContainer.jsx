/* 
	* @author{Slimane AKALIA} slimaneakalia@gmail.com, Linkedin.com/in/slimaneakalia
*/
import { connect } from "react-redux";
import AnswerVariablesTable from "_home/Components/AnswerVariablesTable";

const remove = answerVariableUID => {
  console.log(`AnswerVariableUID to remove : ${answerVariableUID}`);
};

const duplicate = answerVariableUID => {
  console.log(`AnswerVariableUID to duplicate : ${answerVariableUID}`);
};

const edit = answerVariableData => {
  console.log(`New Edition with data to add :`);
  console.log(answerVariableData);
  return new Promise((resolve, reject) => {
    resolve();
    // reject("Internal Server error : Minoucha");
  });
};

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
  edit: answerVariableData => edit(answerVariableData, dispatch),
  duplicate: answerVariableUID => duplicate(answerVariableUID, dispatch),
  remove: answerVariableUID => remove(answerVariableUID, dispatch),
  create: answerVariableData => create(answerVariableData, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnswerVariablesTable);

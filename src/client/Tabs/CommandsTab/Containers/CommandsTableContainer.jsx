/* 
	* @author{Slimane AKALIA} slimaneakalia@gmail.com, Linkedin.com/in/slimaneakalia
*/
import CommandsTable from "_commands/Components/CommandsTable";
import { connect } from "react-redux";

const remove = (CommandUID, dispatch) => {
  console.log(`CommandUID to remove : ${CommandUID}`);
};

const duplicate = (CommandUID, dispatch) => {
  console.log(`CommandUID to duplicate : ${CommandUID}`);
};

const edit = (commandData, dispatch) => {
  console.log(`New Edition with data to add :`);
  console.log(commandData);
  return new Promise((resolve, reject) => {
    // resolve();
    reject("Internal Server error edition : Minoucha");
  });
};

const create = (commandData, dispatch) => {
  console.log("New Command to add :");
  console.log(commandData);
  return new Promise((resolve, reject) => {
    // resolve();
    reject("Internal Server error creation : Minoucha");
  });
};

const mapStateToProps = state => ({
  data: state.Commands.CommandsSearchResult
});

const mapDispatchToProps = dispatch => ({
  edit: commandData => edit(commandData, dispatch),
  duplicate: CommandUID => duplicate(CommandUID, dispatch),
  remove: CommandUID => remove(CommandUID, dispatch),
  create: commandData => create(commandData, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommandsTable);

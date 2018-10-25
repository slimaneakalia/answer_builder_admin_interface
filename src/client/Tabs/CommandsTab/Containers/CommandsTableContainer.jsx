/* 
	* @author{Slimane AKALIA} slimaneakalia@gmail.com, Linkedin.com/in/slimaneakalia
*/
import CommandsTable from "_commands/Components/CommandsTable";
import { connect } from "react-redux";
import {
  editCommand,
  duplicateCommand,
  removeCommand,
  createCommand
} from "_action_creators/Commands";

const mapStateToProps = state => ({
  data: state.Commands.CommandsSearchResult
});

const mapDispatchToProps = dispatch => ({
  edit: commandData => editCommand(commandData, dispatch),
  duplicate: CommandUID => duplicateCommand(CommandUID, dispatch),
  remove: CommandUID => removeCommand(CommandUID, dispatch),
  create: commandData => createCommand(commandData, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommandsTable);

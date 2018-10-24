/* 
	* @author{Slimane AKALIA} slimaneakalia@gmail.com, Linkedin.com/in/slimaneakalia
*/
import { connect } from "react-redux";
import AnswerItemTableContentComponent from "_home/Components/AnswerItemTableContentComponent";
import checkDescription from "_shared/Helpers/AnswerItemHelper";
import {
  editItem,
  duplicateItem,
  removeItem
} from "_action_creators/AnswerItems";

const remove = (answerItemUID, dispatch) => removeItem(answerItemUID, dispatch);

const edit = (answerItem, dispatch) => editItem(answerItem, dispatch);

const duplicate = (answerItemUID, dispatch) =>
  duplicateItem(answerItemUID, dispatch);

const mapStateToProps = state => ({
  channels: state.Channels,
  languages: state.Languages,
  data: state.Items.ItemsSearchResult
});

const mapDispatchToProps = dispatch => ({
  remove: answerItemUID => remove(answerItemUID, dispatch),
  edit: answerItem => edit(answerItem, dispatch),
  duplicate: answerItemUID => duplicate(answerItemUID, dispatch),
  checkDescription
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnswerItemTableContentComponent);

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

const mapStateToProps = state => ({
  channels: state.Channels,
  languages: state.Languages,
  data: state.Items.ItemsSearchResult
});

const mapDispatchToProps = dispatch => ({
  remove: answerItemUID => removeItem(answerItemUID, dispatch),
  edit: answerItem => editItem(answerItem, dispatch),
  duplicate: answerItemUID => duplicateItem(answerItemUID, dispatch),
  checkDescription
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnswerItemTableContentComponent);

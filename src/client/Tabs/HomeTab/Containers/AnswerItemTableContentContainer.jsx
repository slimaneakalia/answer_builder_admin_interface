/* 
	* @author{Slimane AKALIA} slimaneakalia@gmail.com, Linkedin.com/in/slimaneakalia
*/
import { connect } from "react-redux";
import AnswerItemTableContentComponent from "_home/Components/AnswerItemTableContentComponent";
import checkDescription from "_shared/Helpers/AnswerItemHelper";

const remove = (answerItemUID, dispatch) => {
  console.log(`Answer UID to remove : ${answerItemUID}`);
};

const edit = (answerItem, dispatch) => {
  console.log(`New Edition with data to do :`);
  console.log(answerItem);
  return new Promise((resolve, reject) => {
    resolve("Edition error from minoucha");
    // reject("Edition error from minoucha");
  });
};

const duplicate = (answerItemUID, dispatch) => {
  console.log(`Answer UID to duplicate : ${answerItemUID}`);
};

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

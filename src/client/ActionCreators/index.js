import { fetchAnswerCodesByText } from "_action_creators/AnswerCodes";
import { fetchAnswerItemsByText } from "_action_creators/AnswerItems";
import { fetchAnswerVariablesByText } from "_action_creators/AnswerVariables";

export default function searchAllByText(text, dispatch) {
  fetchAnswerCodesByText(text, dispatch);
  fetchAnswerItemsByText(text, dispatch);
  fetchAnswerVariablesByText(text, dispatch);
}

import { fetchAnswerCodesByText } from "_action_creators/AnswerCodes";
import { fetchAnswerItemsByText } from "_action_creators/AnswerItems";
import { fetchAnswerVariablesByText } from "_action_creators/AnswerVariables";
import ActionTypes from "_action_creators/ActionTypes";

export default function searchAllByText(text, dispatch) {
  const actionText = { type: ActionTypes.UPDATE_SEARCH_TEXT, text };
  dispatch(actionText);

  fetchAnswerCodesByText(text, dispatch);
  fetchAnswerItemsByText(text, dispatch);
  fetchAnswerVariablesByText(text, dispatch);
}

export function initSearchCriterias(store) {
  let action = { type: ActionTypes.UPDATE_SEARCH_TEXT, text: "" };
  store.dispatch(action);

  action = { type: ActionTypes.UPDATE_SEARCH_NAME, name: "" };
  store.dispatch(action);
}

import { GETData } from "_action_creators/ApiMiddleware";
import ActionTypes from "_action_creators/ActionTypes";
import _ from "lodash";

export default function fetchAnswerItems(store) {
  GETData("/answer_items/all", {})
    .then(result => result.json())
    .then(result => {
      const action = { type: ActionTypes.FETCH_ITEMS, data: result };
      store.dispatch(action);
    })
    .catch(() => {
      fetchAnswerItems(store);
    });
}

export function fetchAnswerItemsByText(text, dispatch) {
  const actionText = { type: ActionTypes.UPDATE_SEARCH_TEXT, text };
  dispatch(actionText);

  GETData("/answer_items/all_by_text", { text })
    .then(result => result.json())
    .then(result => {
      const action = { type: ActionTypes.FETCH_ITEMS, data: result };
      dispatch(action);
    })
    .catch(() => {
      fetchAnswerItemsByText(dispatch);
    });
}

function extractFilteringArray(state, filterKey) {
  const filterData = state[filterKey];
  const array = Object.keys(filterData).filter(key => filterData[key].selected);

  return array;
}

function getAnswerItemCriteria(state) {
  const criterias = _.pick(state.search, ["text"]);
  const languages = extractFilteringArray(state, "Languages");
  const channels = extractFilteringArray(state, "Channels");

  if (languages.length > 0) criterias.Language = languages.toString();
  if (channels.length > 0) criterias.Channel = channels.toString();

  return criterias;
}

export function fetchAnswerItemsByCriterias(currentState, dispatch) {
  const criterias = getAnswerItemCriteria(currentState);
  GETData("/answer_items/all_by_criterias", criterias)
    .then(result => result.json())
    .then(result => {
      const action = { type: ActionTypes.FETCH_ITEMS, data: result };
      dispatch(action);
    })
    .catch(err => {
      console.log("error");
      console.log(err);
      fetchAnswerItemsByCriterias(currentState, dispatch);
    });
}

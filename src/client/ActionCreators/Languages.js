import { GETData } from "_action_creators/ApiMiddleware";
import ActionTypes from "_action_creators/ActionTypes";
import { fetchAnswerItemsByCriterias } from "_action_creators/AnswerItems";

export default function fetchLanguages(store) {
  GETData("/languages/all")
    .then(result => result.json())
    .then(result => {
      const action = { type: ActionTypes.FETCH_LANGUAGES, data: result };
      store.dispatch(action);
    })
    .catch(() => {
      fetchLanguages(store);
    });
}

export function updateFilterId(languageId) {
  return (dispatch, getState) => {
    const action = {
      type: ActionTypes.UPDATE_LANGUAGE_FILTER,
      id: languageId
    };
    dispatch(action);

    fetchAnswerItemsByCriterias(getState(), dispatch);
  };
}

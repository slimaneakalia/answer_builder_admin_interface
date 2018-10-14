import { GETData } from "_action_creators/ApiMiddleware";
import ActionTypes from "_action_creators/ActionTypes";

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

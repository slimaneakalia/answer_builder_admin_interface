import { GETData } from "_action_creators/ApiMiddleware";
import ActionTypes from "_action_creators/ActionTypes";

export default function fetchAnswerCodes(store) {
  GETData("/answers/all")
    .then(result => result.json())
    .then(result => {
      const action = { type: ActionTypes.FETCH_CODES, data: result };
      store.dispatch(action);
    })
    .catch(() => {
      fetchAnswerCodes(store);
    });
}

import { GETData } from "_action_creators/ApiMiddleware";
import ActionTypes from "_action_creators/ActionTypes";

export default function fetchCommands(store) {
  GETData("/commands/all")
    .then(result => result.json())
    .then(result => {
      const action = { type: ActionTypes.FETCH_COMMANDS, data: result };
      store.dispatch(action);
    })
    .catch(() => {
      fetchCommands(store);
    });
}

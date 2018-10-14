import { GETData } from "_action_creators/ApiMiddleware";
import ActionTypes from "_action_creators/ActionTypes";

export default function fetchChannels(store) {
  GETData("/channels/all")
    .then(result => result.json())
    .then(result => {
      const action = { type: ActionTypes.FETCH_CHANNELS, data: result };
      store.dispatch(action);
    })
    .catch(() => {
      fetchChannels(store);
    });
}

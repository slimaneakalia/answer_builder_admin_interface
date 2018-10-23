import { GETData } from "_action_creators/ApiMiddleware";
import ActionTypes from "_action_creators/ActionTypes";
import { fetchAnswerItemsByCriterias } from "_action_creators/AnswerItems";

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

export function updateFilterId(channelId) {
  return (dispatch, getState) => {
    const action = {
      type: ActionTypes.UPDATE_CHANNEL_FILTER,
      id: channelId
    };
    dispatch(action);
    fetchAnswerItemsByCriterias(getState(), dispatch);
  };
}

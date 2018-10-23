import ActionTypes from "_action_creators/ActionTypes";

export default function Channels(state = {}, action) {
  let newState;
  switch (action.type) {
    case ActionTypes.FETCH_CHANNELS:
      newState = {};
      action.data.forEach(channel => {
        newState[channel.Channel_UID] = {
          Channel_label: channel.Channel_label,
          selected: false
        };
      });
      return newState;

    case ActionTypes.UPDATE_CHANNEL_FILTER:
      newState = { ...state };
      if (newState[action.id])
        newState[action.id].selected = !newState[action.id].selected;
      return newState;

    default:
      return state;
  }
}

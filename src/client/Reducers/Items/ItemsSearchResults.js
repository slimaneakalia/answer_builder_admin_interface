import ActionTypes from "_action_creators/ActionTypes";

export default function ItemsSearchResult(state = {}, action) {
  let newState;
  switch (action.type) {
    case ActionTypes.FETCH_ITEMS:
      newState = {};
      action.data.forEach(item => {
        newState[item.AnswerItem_UUID] = {
          Answer_UID: item.Answer_UID,
          Name: item.Name,
          Language: item.Language,
          Channel: item.Channel,
          Text: item.Text,
          Activated: item.Activated,
          _Default: item._Default
        };
      });

      return newState;

    default:
      return state;
  }
}

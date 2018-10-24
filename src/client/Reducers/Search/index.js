import ActionTypes from "_action_creators/ActionTypes";

export default function Search(state = {}, action) {
  let newState;
  switch (action.type) {
    case ActionTypes.UPDATE_SEARCH_TEXT:
      newState = { ...state };
      newState.text = action.text;
      return newState;

    case ActionTypes.UPDATE_SEARCH_NAME:
      newState = { ...state };
      newState.name = action.name;
      return newState;

    default:
      return state;
  }
}

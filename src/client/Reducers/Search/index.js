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

    case ActionTypes.UPDATE_SEARCH_VALUE:
      newState = { ...state };
      newState.value = action.value;
      return newState;

    case ActionTypes.UPDATE_SEARCH_GROUP:
      newState = { ...state };
      newState.group = action.group;
      return newState;

    case ActionTypes.UPDATE_SEARCH_SUBGROUP:
      newState = { ...state };
      newState.subGroup = action.subGroup;
      return newState;

    case ActionTypes.UPDATE_SEARCH_DESCRIPTION:
      newState = { ...state };
      newState.description = action.description;
      return newState;

    default:
      return state;
  }
}

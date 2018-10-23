import ActionTypes from "_action_creators/ActionTypes";

export default function Languages(state = {}, action) {
  let newState;
  switch (action.type) {
    case ActionTypes.FETCH_LANGUAGES:
      newState = {};
      action.data.forEach(language => {
        newState[language.Language_UID] = {
          Language_label: language.Language_label,
          selected: false
        };
      });
      return newState;

    case ActionTypes.UPDATE_LANGUAGE_FILTER:
      newState = { ...state };
      if (newState[action.id])
        newState[action.id].selected = !newState[action.id].selected;
      return newState;
    default:
      return state;
  }
}

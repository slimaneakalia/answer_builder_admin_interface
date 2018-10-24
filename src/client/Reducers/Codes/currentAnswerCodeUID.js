import ActionTypes from "_action_creators/ActionTypes";

export default function currentAnswerCodeUID(state = "", action) {
  switch (action.type) {
    case ActionTypes.FETCH_CODES:
      return "";

    case ActionTypes.REMOVE_CODE:
      if (action.Answer_UID === state) return "";
      return `${state}`;

    case ActionTypes.UPDATE_CURRENT_CODE:
      return action.newCode;

    default:
      return state;
  }
}

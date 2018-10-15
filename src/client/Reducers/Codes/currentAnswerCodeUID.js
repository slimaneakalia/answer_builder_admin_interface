import ActionTypes from "_action_creators/ActionTypes";

export default function currentAnswerCodeUID(state = {}, action) {
  switch (action.type) {
    case ActionTypes.FETCH_CODES:
      return "";

    default:
      return state;
  }
}

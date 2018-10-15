import ActionTypes from "_action_creators/ActionTypes";

export default function currentAnswerCodeUID(state = {}, action) {
  let newState;
  switch (action.type) {
    case ActionTypes.FETCH_CODES:
      newState = action.data[0].Answer_UID;
      return newState;

    default:
      return state;
  }
}

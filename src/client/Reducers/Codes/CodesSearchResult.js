import ActionTypes from "_action_creators/ActionTypes";

export default function CodesSearchResult(state = {}, action) {
  let newState;
  switch (action.type) {
    case ActionTypes.FETCH_CODES:
      newState = {};
      action.data.forEach(code => {
        newState[code.Answer_UID] = {
          Code: code.Code,
          Description: code.Description
        };
      });
      return newState;

    default:
      return state;
  }
}

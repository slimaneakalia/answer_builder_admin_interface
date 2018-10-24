import ActionTypes from "_action_creators/ActionTypes";
import _ from "lodash";

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

    case ActionTypes.EDIT_CODE:
      newState = { ...state };

      newState[action.newData.Answer_UID] = _.pick(action.newData, [
        "Code",
        "Description"
      ]);

      return newState;
    default:
      return state;
  }
}

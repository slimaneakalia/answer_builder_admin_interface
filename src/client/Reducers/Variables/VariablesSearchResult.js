import ActionTypes from "_action_creators/ActionTypes";

export default function VariablesSearchResult(state = {}, action) {
  let newState;
  switch (action.type) {
    case ActionTypes.FETCH_VARIABLES:
      newState = {};
      action.data.forEach(variable => {
        newState[variable.AnswerVariable_UID] = {
          Name: variable.Name,
          Value: variable.Value,
          _Group: variable._Group,
          SubGroup: variable.SubGroup,
          Activated: variable.Activated
        };
      });
      return newState;

    default:
      return state;
  }
}

import ActionTypes from "_action_creators/ActionTypes";

export default function CommandsSearchResult(state = {}, action) {
  let newState;
  switch (action.type) {
    case ActionTypes.FETCH_COMMANDS:
      newState = {};
      action.data.forEach(command => {
        newState[command.Command_UID] = {
          Name: command.Name,
          Text: command.Text,
          Description: command.Description
        };
      });
      return newState;

    default:
      return state;
  }
}

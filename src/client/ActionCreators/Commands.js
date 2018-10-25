import { GETData, POSTData } from "_action_creators/ApiMiddleware";
import ActionTypes from "_action_creators/ActionTypes";

export default function fetchCommands(store) {
  GETData("/commands/all")
    .then(result => result.json())
    .then(result => {
      const action = { type: ActionTypes.FETCH_COMMANDS, data: result };
      store.dispatch(action);
    })
    .catch(() => {
      fetchCommands(store);
    });
}

function getCommandsCriteria(state) {
  const criterias = {};
  const { Search } = state;
  const keys = ["name", "text", "description"];

  keys.forEach(key => {
    if (Search[key]) criterias[key] = Search[key];
  });

  return criterias;
}

export function fetchCommandsByCriterias(dispatch) {
  const asyncAction = (dispatchAsync, getState) => {
    const criterias = getCommandsCriteria(getState());

    GETData("/commands/all_by_criterias", criterias)
      .then(result => result.json())
      .then(result => {
        const action = { type: ActionTypes.FETCH_COMMANDS, data: result };
        dispatch(action);
      })
      .catch(err => {
        console.log("error from fetchCommandsByCriterias");
        console.log(err);
        fetchCommandsByCriterias(dispatch);
      });
  };

  dispatch(asyncAction);
}

export function searchCommandByKey(key, value, dispatch, actionType) {
  const action = { type: actionType, [key]: value };
  dispatch(action);

  fetchCommandsByCriterias(dispatch);
}

export function editCommand(command, dispatch) {
  return new Promise((resolve, reject) => {
    POSTData("/commands/edit_command", command, true)
      .then(() => {
        resolve();
        fetchCommandsByCriterias(dispatch);
      })
      .catch(error => {
        if (typeof error === "object") reject(error.error);
        else reject(error);
      });
  });
}

export function duplicateCommand(CommandUID, dispatch) {
  return new Promise((resolve, reject) => {
    POSTData("/commands/duplicate_command", { Command_UID: CommandUID }, true)
      .then(() => {
        resolve();
        fetchCommandsByCriterias(dispatch);
      })
      .catch(error => {
        if (typeof error === "object") reject(error.error);
        else reject(error);
      });
  });
}

export function removeCommand(CommandUID, dispatch) {
  return new Promise((resolve, reject) => {
    POSTData("/commands/remove_command", { Command_UID: CommandUID }, true)
      .then(() => {
        resolve();
        fetchCommandsByCriterias(dispatch);
      })
      .catch(error => {
        if (typeof error === "object") reject(error.error);
        else reject(error);
      });
  });
}

export function createCommand(commandData, dispatch) {
  return new Promise((resolve, reject) => {
    POSTData("/commands/add_command", commandData, true)
      .then(() => {
        resolve();
        fetchCommandsByCriterias(dispatch);
      })
      .catch(error => {
        if (typeof error === "object") reject(error.error);
        else reject(error);
      });
  });
}

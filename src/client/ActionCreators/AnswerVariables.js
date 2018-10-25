import { GETData, POSTData } from "_action_creators/ApiMiddleware";
import ActionTypes from "_action_creators/ActionTypes";

export default function fetchAnswerVariables(store) {
  GETData("/answer_variables/all")
    .then(result => result.json())
    .then(result => {
      const action = { type: ActionTypes.FETCH_VARIABLES, data: result };
      store.dispatch(action);
    })
    .catch(() => {
      fetchAnswerVariables(store);
    });
}

export function fetchAnswerVariablesByText(text, dispatch) {
  GETData("/answer_variables/find", { value: text })
    .then(result => result.json())
    .then(result => {
      const action = { type: ActionTypes.FETCH_VARIABLES, data: result };
      dispatch(action);
    })
    .catch(() => {
      fetchAnswerVariablesByText(dispatch, text);
    });
}

function getAnswerVariablesCriteria(state) {
  const criterias = {};
  const { Search } = state;
  const keys = ["name", "value", "group", "subGroup"];

  keys.forEach(key => {
    if (Search[key]) criterias[key] = Search[key];
  });

  return criterias;
}

export function fetchVariablesByCriterias(dispatch) {
  const asyncAction = (dispatchAsync, getState) => {
    const criterias = getAnswerVariablesCriteria(getState());

    GETData("/answer_variables/all_by_criterias", criterias)
      .then(result => result.json())
      .then(result => {
        const action = { type: ActionTypes.FETCH_VARIABLES, data: result };
        dispatch(action);
      })
      .catch(err => {
        console.log("error from fetchVariablesByCriterias");
        console.log(err);
        fetchVariablesByCriterias(dispatch);
      });
  };

  dispatch(asyncAction);
}

export function editVariable(answerVariable, dispatch) {
  return new Promise((resolve, reject) => {
    POSTData("/answer_variables/edit_variable", answerVariable, true)
      .then(() => {
        resolve();
        fetchVariablesByCriterias(dispatch);
      })
      .catch(error => {
        if (typeof error === "object") reject(error.error);
        else reject(error);
      });
  });
}

export function duplicateVariable(answerVariableUID, dispatch) {
  return new Promise((resolve, reject) => {
    POSTData(
      "/answer_variables/duplicate_variable",
      { AnswerVariable_UID: answerVariableUID },
      true
    )
      .then(() => {
        resolve();
        fetchVariablesByCriterias(dispatch);
      })
      .catch(error => {
        if (typeof error === "object") reject(error.error);
        else reject(error);
      });
  });
}

export function removeVariable(answerVariableUID, dispatch) {
  return new Promise((resolve, reject) => {
    POSTData(
      "/answer_variables/remove_variable",
      { AnswerVariable_UID: answerVariableUID },
      true
    )
      .then(() => {
        resolve();
        fetchVariablesByCriterias(dispatch);
      })
      .catch(error => {
        if (typeof error === "object") reject(error.error);
        else reject(error);
      });
  });
}

export function searchVariableByKey(key, value, dispatch, actionType) {
  const action = { type: actionType, [key]: value };
  dispatch(action);

  fetchVariablesByCriterias(dispatch);
}

export function createVariable(answerVariableData, dispatch) {
  return new Promise((resolve, reject) => {
    POSTData("/answer_variables/add_variable", answerVariableData, true)
      .then(() => {
        resolve();
        fetchVariablesByCriterias(dispatch);
      })
      .catch(error => {
        if (typeof error === "object") reject(error.error);
        else reject(error);
      });
  });
}

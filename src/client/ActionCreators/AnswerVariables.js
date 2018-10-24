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

export function editVariable(answerVariable, dispatch) {
  return new Promise((resolve, reject) => {
    const asyncAction = (dispatchAsync, getState) => {
      POSTData("/answer_variables/edit_variable", answerVariable, true)
        .then(() => {
          resolve();
          const { Search } = getState();
          fetchAnswerVariablesByText(Search.text || "", dispatchAsync);
        })
        .catch(error => {
          if (typeof error === "object") reject(error.error);
          else reject(error);
        });
    };

    dispatch(asyncAction);
  });
}

export function duplicateVariable(answerVariableUID, dispatch) {
  return new Promise((resolve, reject) => {
    const asyncAction = (dispatchAsync, getState) => {
      POSTData(
        "/answer_variables/duplicate_variable",
        { AnswerVariable_UID: answerVariableUID },
        true
      )
        .then(() => {
          resolve();
          const { Search } = getState();
          fetchAnswerVariablesByText(Search.text || "", dispatchAsync);
        })
        .catch(error => {
          if (typeof error === "object") reject(error.error);
          else reject(error);
        });
    };

    dispatch(asyncAction);
  });
}

export function removeVariable(answerVariableUID, dispatch) {
  return new Promise((resolve, reject) => {
    const asyncAction = (dispatchAsync, getState) => {
      POSTData(
        "/answer_variables/remove_variable",
        { AnswerVariable_UID: answerVariableUID },
        true
      )
        .then(() => {
          resolve();
          const { Search } = getState();
          fetchAnswerVariablesByText(Search.text || "", dispatchAsync);
        })
        .catch(error => {
          if (typeof error === "object") reject(error.error);
          else reject(error);
        });
    };

    dispatch(asyncAction);
  });
}

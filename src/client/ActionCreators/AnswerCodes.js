import { GETData, POSTData } from "_action_creators/ApiMiddleware";
import ActionTypes from "_action_creators/ActionTypes";
import { fetchAnswerItemsByCriterias } from "_action_creators/AnswerItems";

export default function fetchAnswerCodes(store) {
  GETData("/answers/all")
    .then(result => result.json())
    .then(result => {
      const action = { type: ActionTypes.FETCH_CODES, data: result };
      store.dispatch(action);
    })
    .catch(() => {
      fetchAnswerCodes(store);
    });
}

export function fetchAnswerCodesByText(text, dispatch) {
  GETData("/answers/find", { value: text })
    .then(result => result.json())
    .then(result => {
      const action = { type: ActionTypes.FETCH_CODES, data: result };
      dispatch(action);
    })
    .catch(() => {
      fetchAnswerCodesByText(text, dispatch);
    });
}

// newData structure : { Answer_UID, Code, Description }
export function editCode(newData, dispatch) {
  POSTData("/answers/edit_all", newData, true)
    .then(() => {
      const action = { type: ActionTypes.EDIT_CODE, newData };
      dispatch(action);
    })
    .catch(err => {
      console.log("editCode error :");
      console.log(err);
      editCode(newData, dispatch);
    });
}

// request structure : { Answer_UID: String }
export function removeCode(request, dispatch) {
  POSTData("/answers/remove", request, true)
    .then(() => {
      const action = {
        type: ActionTypes.REMOVE_CODE,
        Answer_UID: request.Answer_UID
      };
      dispatch(action);
    })
    .catch(err => {
      console.log("removeCode error :");
      console.log(err);
      removeCode(request, dispatch);
    });
}

export function updateCurrentCode(newCode, dispatch) {
  const action = { type: ActionTypes.UPDATE_CURRENT_CODE, newCode };
  dispatch(action);
  const asyncAction = (dispatchAsync, getState) => {
    fetchAnswerItemsByCriterias(getState(), dispatchAsync);
  };

  dispatch(asyncAction);
}

export function createNewAnswerCode(answerCodeData, dispatch) {
  console.log("New AnswerCode to add :");
  console.log(answerCodeData);

  return new Promise((resolve, reject) => {
    const asyncAction = (dispatchAsync, getState) => {
      POSTData("/answers/add_code", answerCodeData, true)
        .then(() => {
          resolve();
          const { Search } = getState();
          fetchAnswerCodesByText(Search.text, dispatch);
        })
        .catch(error => {
          if (typeof error === "object") reject(error.error);
          else reject(error);
        });
    };

    dispatch(asyncAction);
  });
}

import { GETData, POSTData } from "_action_creators/ApiMiddleware";
import ActionTypes from "_action_creators/ActionTypes";

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

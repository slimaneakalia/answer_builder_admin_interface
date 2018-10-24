import { GETData, POSTData } from "_action_creators/ApiMiddleware";
import ActionTypes from "_action_creators/ActionTypes";
import _ from "lodash";

function extractFilteringArray(state, filterKey) {
  const filterData = state[filterKey];
  const array = Object.keys(filterData).filter(key => filterData[key].selected);

  return array;
}

function getAnswerItemCriteria(state) {
  const { Search } = state;
  const criterias =
    Search.text && Search.text.length > 0 ? _.pick(state.Search, ["text"]) : {};

  const languages = extractFilteringArray(state, "Languages");
  const channels = extractFilteringArray(state, "Channels");

  if (languages.length > 0) criterias.Language = languages.toString();
  if (channels.length > 0) criterias.Channel = channels.toString();

  return criterias;
}

export default function fetchAnswerItems(store) {
  GETData("/answer_items/all", {})
    .then(result => result.json())
    .then(result => {
      const action = { type: ActionTypes.FETCH_ITEMS, data: result };
      store.dispatch(action);
    })
    .catch(() => {
      fetchAnswerItems(store);
    });
}

export function fetchAnswerItemsByCriterias(currentState, dispatch) {
  const criterias = getAnswerItemCriteria(currentState);

  GETData("/answer_items/all_by_criterias", criterias)
    .then(result => result.json())
    .then(result => {
      const action = { type: ActionTypes.FETCH_ITEMS, data: result };
      dispatch(action);
    })
    .catch(err => {
      console.log("error");
      console.log(err);
      fetchAnswerItemsByCriterias(currentState, dispatch);
    });
}

export function fetchAnswerItemsByText(text, dispatch) {
  const actionText = { type: ActionTypes.UPDATE_SEARCH_TEXT, text };
  dispatch(actionText);

  const asyncAction = (dispatchAsync, getState) => {
    fetchAnswerItemsByCriterias(getState(), dispatchAsync);
  };

  dispatch(asyncAction);
}

// answerItemData structure : API and Database structure
export function createItem(answerItemData, dispatch) {
  return new Promise((resolve, reject) => {
    const asyncAction = (dispatchAsync, getState) => {
      POSTData("/answer_items/add_item", answerItemData, true)
        .then(() => {
          resolve();
          fetchAnswerItemsByCriterias(getState(), dispatchAsync);
        })
        .catch(error => {
          if (typeof error === "object") reject(error.error);
          else reject(error);
        });
    };

    dispatch(asyncAction);
  });
}

// answerItemData structure : API and Database structure (without Answer_UID)
export function editItem(answerItem, dispatch) {
  return new Promise((resolve, reject) => {
    const asyncAction = (dispatchAsync, getState) => {
      POSTData("/answer_items/edit_item", answerItem, true)
        .then(() => {
          resolve();
          fetchAnswerItemsByCriterias(getState(), dispatchAsync);
        })
        .catch(error => {
          if (typeof error === "object") reject(error.error);
          else reject(error);
        });
    };

    dispatch(asyncAction);
  });
}

export function duplicateItem(answerItemUID, dispatch) {
  return new Promise((resolve, reject) => {
    const asyncAction = (dispatchAsync, getState) => {
      POSTData(
        "/answer_items/duplicate_item",
        { AnswerItem_UUID: answerItemUID },
        true
      )
        .then(() => {
          resolve();
          fetchAnswerItemsByCriterias(getState(), dispatchAsync);
        })
        .catch(error => {
          if (typeof error === "object") reject(error.error);
          else reject(error);
        });
    };

    dispatch(asyncAction);
  });
}

export function removeItem(answerItemUID, dispatch) {
  return new Promise((resolve, reject) => {
    const asyncAction = (dispatchAsync, getState) => {
      POSTData(
        "/answer_items/remove_item",
        { AnswerItem_UUID: answerItemUID },
        true
      )
        .then(() => {
          resolve();
          fetchAnswerItemsByCriterias(getState(), dispatchAsync);
        })
        .catch(error => {
          if (typeof error === "object") reject(error.error);
          else reject(error);
        });
    };

    dispatch(asyncAction);
  });
}

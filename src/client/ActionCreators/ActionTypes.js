import keyMirror from "key-mirror";

const ActionTypes = keyMirror({
  FETCH_LANGUAGES: null,
  FETCH_CHANNELS: null,
  FETCH_CODES: null,
  FETCH_ITEMS: null,
  FETCH_VARIABLES: null,
  FETCH_COMMANDS: null,

  UPDATE_SEARCH_TEXT: null,
  UPDATE_SEARCH_NAME: null,
  UPDATE_SEARCH_VALUE: null,
  UPDATE_SEARCH_GROUP: null,
  UPDATE_SEARCH_SUBGROUP: null,
  UPDATE_SEARCH_DESCRIPTION: null,

  UPDATE_CHANNEL_FILTER: null,
  UPDATE_LANGUAGE_FILTER: null,

  EDIT_CODE: null,
  REMOVE_CODE: null,
  UPDATE_CURRENT_CODE: null
});

export default ActionTypes;

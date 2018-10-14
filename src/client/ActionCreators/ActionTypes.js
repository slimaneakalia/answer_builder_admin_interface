import keyMirror from "key-mirror";

const ActionTypes = keyMirror({
  FETCH_LANGUAGES: null,
  FETCH_CHANNELS: null,
  FETCH_CODES: null,
  FETCH_ITEMS: null,
  FETCH_VARIABLES: null,
  FETCH_COMMANDS: null
});

export default ActionTypes;

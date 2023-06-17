import commonState from "./Comment";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  commonState: commonState
});

export default rootReducer;

import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";

import root from "./reducers";

const configureStore = (state = {}) => {
  let middlewares = [thunkMiddleware];
  let enhancers = applyMiddleware(...middlewares);

  const composeWithDevTools = require("redux-devtools-extension")
    .composeWithDevTools;
  const logger = require("redux-logger").default;
  middlewares.push(logger);
  enhancers = composeWithDevTools(applyMiddleware(...middlewares));

  return createStore(root, state, enhancers);
};

const store = configureStore();

export default store;

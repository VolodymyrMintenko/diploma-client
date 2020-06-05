import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import logger from "redux-logger";

import root from "./reducers";

const configureStore = (state = {}) => {
  let middlewares = [thunkMiddleware];
  let enhancers = applyMiddleware(...middlewares);

  if (process.env.NODE_ENV === "development") {
    middlewares.push(logger);
    enhancers = composeWithDevTools(applyMiddleware(...middlewares));
  }

  return createStore(root, state, enhancers);
};

const store = configureStore();

export default store;

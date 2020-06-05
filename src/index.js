import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";

import store from "./redux/store";
import Spinner from "./components/Spinner";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";

const App = lazy(() => import("./App"));

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={createMuiTheme(theme)}>
      <Suspense fallback={<Spinner verticallyCentered />}>
        <App />
      </Suspense>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

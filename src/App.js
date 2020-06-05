import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import moment from "moment";
import "moment/locale/ru";

import request from "./utils/request";

import Notifier from "./components/notifier/Notifier";
import Navigation from "./components/navigation/Navigation";
import Routes from "./Routes";

import "./index.scss";

class App extends Component {
  constructor(props) {
    super(props);

    moment.locale("ru");
    request.setupInterceptors();
  }
  render() {
    return (
      <SnackbarProvider maxSnack={3} preventDuplicate>
        <BrowserRouter>
          <Notifier />
          <Navigation ignoreLocations={["/signin", "/signup"]} />
          <Routes />
        </BrowserRouter>
      </SnackbarProvider>
    );
  }
}

export default App;

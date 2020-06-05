import axios from "axios";

import store from "redux/store";

import { authLogout } from "pages/auth/reducer/actions";

class Request {
  constructor() {
    this.request = axios;

    this._setupRequest();
  }

  setupInterceptors() {
    this._setupRequestInterceptor();
    this._setupResponseInterceptor();
  }

  _setupRequestInterceptor() {
    this.request.interceptors.request.use(function(config) {
      const {
        auth: { accessToken }
      } = store.getState();

      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }

      return config;
    });
  }

  _setupResponseInterceptor() {
    this.request.interceptors.response.use(
      function(res) {
        return res;
      },
      function(err) {
        if (err.response.status === 401) {
          authLogout()(store.dispatch);
        }

        return Promise.reject(err);
      }
    );
  }

  _setupRequest() {
    this.request.defaults = {
      headers: {
        "Content-Type": "application/json"
      }
    };
  }

  get(url, options = {}) {
    return this.request.get(url, options);
  }

  post(url, body, options = {}) {
    return this.request.post(url, body, options);
  }

  put(url, body, options = {}) {
    return this.request.put(url, body, options);
  }

  delete(url, body, options = {}) {
    return this.request.delete(url, { data: body, ...options });
  }
}

const request = new Request();

export default request;

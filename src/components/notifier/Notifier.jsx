import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { removeSnackbar } from "./NotifierActions";
import { useLocation } from "react-router-dom";

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

let displayed = [];
const storeDisplayed = id => {
  displayed = [...displayed, id];
};

const removeDisplayed = id => {
  displayed = id ? displayed.filter(key => id !== key) : [];
};

function Notifier({ notifications, removeSnackbar }) {
  const location = useLocation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    removeDisplayed();
    closeSnackbar();
  }, [location, closeSnackbar]);

  useEffect(() => {
    notifications.forEach(
      ({ key, message, options = {}, dismissed = false }) => {
        if (!message) {
          message = "Что-то пошло не так! Попробуйте перезагрузить страницу.";
        }
        if (!options.action) {
          options.action = [
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={() => closeSnackbar(key)}
            >
              <CloseIcon />
            </IconButton>
          ];
        }
        if (dismissed) {
          closeSnackbar(key);
          return;
        }
        // Do nothing if snackbar is already displayed
        if (displayed.includes(key)) return;
        // Display snackbar using notistack
        enqueueSnackbar(message, {
          key,
          ...options,
          onClose: (event, reason, key) => {
            if (options.onClose) {
              options.onClose(event, reason, key);
            }
          },
          onExited: (event, key) => {
            removeSnackbar(key);
            removeDisplayed(key);
          }
        });
        // Keep track of snackbars that we've displayed
        storeDisplayed(key);
      }
    );
  }, [notifications, removeSnackbar, enqueueSnackbar, closeSnackbar]);
  return null;
}

const mapStateToProps = ({ notifier }) => ({
  notifications: notifier.notifications
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ removeSnackbar }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Notifier);

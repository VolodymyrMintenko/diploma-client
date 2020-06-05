export const ENQUEUE_SNACKBAR = "notifier/ENQUEUE_SNACKBAR";
export const CLOSE_SNACKBAR = "notifier/CLOSE_SNACKBAR";
export const REMOVE_SNACKBAR = "notifier/REMOVE_SNACKBAR";

export const enqueueSnackbar = notification => {
  const key = notification.options && notification.options.key;
  return {
    type: ENQUEUE_SNACKBAR,
    notification: {
      ...notification,
      key: key || new Date().getTime() + Math.random()
    }
  };
};

export const closeSnackbar = key => ({
  type: CLOSE_SNACKBAR,
  dismissAll: !key, // dismiss all if no key has been defined
  key
});

export const removeSnackbar = key => ({
  type: REMOVE_SNACKBAR,
  key
});

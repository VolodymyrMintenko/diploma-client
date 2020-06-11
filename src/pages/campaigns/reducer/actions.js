import urls from "utils/urls";
import request from "utils/request";
import { enqueueSnackbar } from "../../../components/notifier/NotifierActions";
import storage from "utils/storage";

export const GET_CAMPAIGNS_SUCCESS = "campaigns/GET_CAMPAIGNS_SUCCESS";
export const SELECT_CAMPAIGN = "campaigns/SELECT_CAMPAIGN";
export const SET_LOADING = "campaigns/SET_LOADING";
export const PATCH_CAMPAIGN = "campaigns/PATCH_CAMPAIGN";
export const GET_USER_SUCCESS = "campaigns/GET_USER_SUCCESS";
export const GET_USERME_SUCCESS = "campaigns/GET_USERME_SUCCESS";
export const GET_USERS_SUCCESS = "campaigns/GET_USERS_SUCCESS";
export const DELETE_ARTICLE = "campaigns/DELETE_ARTICLE";
export const SUBMIT_ARTICLE = "campaigns/SUBMIT_ARTICLE";
export const BLOG_PAGE_LOADED = "campaigns/BLOG_PAGE_LOADED";
export const SET_EDIT = "campaigns/SET_EDIT";
export const EDIT_ARTICLE = "campaigns/EDIT_ARTICLE";
export const getCampaignsSuccess = (payload) => {
  return {
    type: GET_CAMPAIGNS_SUCCESS,
    payload,
  };
};
export const deleteArticle = (payload) => {
  storage.set("selectedCampaign", payload);
  return {
    type: DELETE_ARTICLE,
    payload,
  };
};
export const submitArticle = (payload) => {
  storage.set("selectedCampaign", payload);
  return {
    type: SUBMIT_ARTICLE,
    payload,
  };
};
export const blogLoading = (payload) => {
  storage.set("selectedCampaign", payload);
  return {
    type: BLOG_PAGE_LOADED,
    payload,
  };
};
export const setEdit = (payload) => {
  storage.set("selectedCampaign", payload);
  return {
    type: SET_EDIT,
    payload,
  };
};
export const editArticle = (payload) => {
  storage.set("selectedCampaign", payload);
  return {
    type: EDIT_ARTICLE,
    payload,
  };
};
export const selectCampaign = (payload) => {
  storage.set("selectedCampaign", payload);
  return {
    type: SELECT_CAMPAIGN,
    payload,
  };
};

export const patchCampaign = (payload) => {
  return {
    type: PATCH_CAMPAIGN,
    payload,
  };
};
export const setLoading = (payload) => {
  return {
    type: SET_LOADING,
    payload,
  };
};
export const getUserSuccess = (payload) => {
  return {
    type: GET_USER_SUCCESS,
    payload,
  };
};
export const getUsersSuccess = (payload) => {
  return {
    type: GET_USERS_SUCCESS,
    payload,
  };
};
export const getUsermeSuccess = (payload) => {
  return {
    type: GET_USERME_SUCCESS,
    payload,
  };
};
export const getCampaigns = () => (dispatch) => {
  dispatch(setLoading(true));
  return request
    .get(urls.campaigns)
    .then(({ data }) => {
      if (data.status) {
        dispatch(getCampaignsSuccess(data.payload.data));
      } else {
        throw new Error(data.payload.message);
      }
    })
    .catch(({ response }) => {
      dispatch(
        enqueueSnackbar({
          message: response && response.data.payload.message,
          options: { variant: "error" },
        })
      );
    });
};
export const getUsers = () => (dispatch) => {
  dispatch(setLoading(true));
  return request
    .get(urls.users)
    .then(({ data }) => {
      if (data.status) {
        dispatch(getUsersSuccess(data.payload.data));
      } else {
        throw new Error(data.payload.message);
      }
    })
    .catch(({ response }) => {
      dispatch(
        enqueueSnackbar({
          message: response && response.data.payload.message,
          options: { variant: "error" },
        })
      );
    });
};

export const getUser = (id) => (dispatch) => {
  dispatch(setLoading(true));
  return request
    .get(urls.user + "/" + id)
    .then(({ data }) => {
      if (data.status) {
        dispatch(getUserSuccess(data.payload.data));
      } else {
        throw new Error(data.payload.message);
      }
    })
    .catch(({ response }) => {
      dispatch(
        enqueueSnackbar({
          message: response && response.data.payload.message,
          options: { variant: "error" },
        })
      );
    });
};
export const getUserme = (id) => (dispatch) => {
  dispatch(setLoading(true));
  return request
    .get(urls.userme + "/" + id)
    .then(({ data }) => {
      if (data.status) {
        dispatch(getUsermeSuccess(data.payload.data));
      } else {
        throw new Error(data.payload.message);
      }
    })
    .catch(({ response }) => {
      dispatch(
        enqueueSnackbar({
          message: response && response.data.payload.message,
          options: { variant: "error" },
        })
      );
    });
};
export const getCampaign = (id) => (dispatch) => {
  dispatch(setLoading(true));
  return request
    .get(`${urls.campaigns}/${id}`)
    .then(({ data }) => {
      if (data.status) {
        dispatch(selectCampaign(data.payload));
      } else {
        throw new Error(data.payload.message);
      }
    })
    .catch(({ response }) => {
      dispatch(
        enqueueSnackbar({
          message: response && response.data.payload.message,
          options: { variant: "error" },
        })
      );
    });
};
export const postCampaign = (data, options = {}) => (dispatch) => {
  return request
    .post(urls.campaigns, data)
    .then(({ data }) => {
      if (data.status) {
        dispatch(selectCampaign(data.payload));
        if (options.redirectAfterCreate && options.history)
          options.history.push(`/campaign/${data.payload.id}`);
        dispatch(selectCampaign(data.payload));
      } else {
        throw new Error(data.payload.message);
      }
    })
    .catch(({ response }) => {
      dispatch(
        enqueueSnackbar({
          message: response && response.data.payload.message,
          options: { variant: "error" },
        })
      );
    });
};
export const activateCampaign = (id, active) => (dispatch) => {
  return request
    .put(`${urls.campaigns}/${id}/activate`, { active })
    .then(({ data }) => {
      if (data.status) {
        dispatch(patchCampaign(data.payload));
      } else {
        throw new Error(data.payload.message);
      }
    })
    .catch(({ response }) => {
      dispatch(
        enqueueSnackbar({
          message: response && response.data.payload.message,
          options: { variant: "error" },
        })
      );
    });
};
export const deleteCampaign = (id) => (dispatch) => {
  dispatch(setLoading(true));
  return request
    .delete(`${urls.campaigns}/${id}`)
    .then(({ data }) => {
      if (data.status) {
        dispatch(setLoading(false));
      } else {
        throw new Error(data.payload.message);
      }
    })
    .catch(({ response }) => {
      dispatch(
        enqueueSnackbar({
          message: response && response.data.payload.message,
          options: { variant: "error" },
        })
      );
    });
};

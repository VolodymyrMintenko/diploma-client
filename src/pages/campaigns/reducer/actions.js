import urls from "utils/urls";
import request from "utils/request";
import { enqueueSnackbar } from "components/notifier/NotifierActions";
import storage from "utils/storage";

export const GET_CAMPAIGNS_SUCCESS = "campaigns/GET_CAMPAIGNS_SUCCESS";
export const SELECT_CAMPAIGN = "campaigns/SELECT_CAMPAIGN";
export const SET_LOADING = "campaigns/SET_LOADING";
export const PATCH_CAMPAIGN = "campaigns/PATCH_CAMPAIGN";

export const getCampaignsSuccess = (payload) => {
  return {
    type: GET_CAMPAIGNS_SUCCESS,
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

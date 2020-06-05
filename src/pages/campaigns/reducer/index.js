import {
  GET_CAMPAIGNS_SUCCESS,
  SELECT_CAMPAIGN,
  SET_LOADING,
  PATCH_CAMPAIGN
} from "./actions";
import storage from "utils/storage";

const initialState = {
  selectedCampaign: storage.get("selectedCampaign") || null,
  campaigns: [],
  isLoading: true
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CAMPAIGNS_SUCCESS:
      return { ...state, campaigns: action.payload, isLoading: false };
    case SELECT_CAMPAIGN:
      return { ...state, selectedCampaign: action.payload, isLoading: false };
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case PATCH_CAMPAIGN:
      return {
        ...state,
        campaigns: state.campaigns.map(campaign =>
          campaign.id === action.payload.id ? action.payload : campaign
        )
      };

    default:
      return state;
  }
};

export default reducer;

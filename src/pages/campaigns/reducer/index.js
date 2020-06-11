import {
  GET_CAMPAIGNS_SUCCESS,
  SELECT_CAMPAIGN,
  SET_LOADING,
  PATCH_CAMPAIGN,
  GET_USER_SUCCESS,
  GET_USERS_SUCCESS,
  GET_USERME_SUCCESS,
  SET_EDIT,
  EDIT_ARTICLE,
  DELETE_ARTICLE,
  SUBMIT_ARTICLE,
  BLOG_PAGE_LOADED,
} from "./actions";
import storage from "utils/storage";

const initialState = {
  selectedCampaign: storage.get("selectedCampaign") || null,
  campaigns: [],
  user: [],
  users: [],
  userme: [],
  isLoading: true,
  articles: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CAMPAIGNS_SUCCESS:
      return { ...state, campaigns: action.payload, isLoading: false };
    case GET_USER_SUCCESS:
      return { ...state, user: action.payload, isLoading: false };
    case GET_USERS_SUCCESS:
      console.log(action.payload);
      return { ...state, users: action.payload, isLoading: false };
    case BLOG_PAGE_LOADED:
      return { ...state, articles: action.payload };
    case SUBMIT_ARTICLE:
      return {
        ...state,
        articles: [action.data.article].concat(state.articles),
      };
    case DELETE_ARTICLE:
      return {
        ...state,
        articles: state.articles.filter(
          (article) => article._id !== action.payload
        ),
      };
    case SET_EDIT:
      return { ...state, articleToEdit: action.payload };
    case EDIT_ARTICLE:
      return {
        ...state,
        articles: state.articles.map((article) => {
          if (article._id === action.data.article._id) {
            return {
              ...action.data.article,
            };
          }
        }),
      };
    case GET_USERME_SUCCESS:
      return { ...state, userme: action.payload, isLoading: false };
    case SELECT_CAMPAIGN:
      return { ...state, selectedCampaign: action.payload, isLoading: false };
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case PATCH_CAMPAIGN:
      return {
        ...state,
        campaigns: state.campaigns.map((campaign) =>
          campaign.id === action.payload.id ? action.payload : campaign
        ),
      };

    default:
      return state;
  }
};

export default reducer;

import { combineReducers } from "redux";
import authReducer from "pages/auth/reducer";
import notifierReducer from "components/notifier/NotifierReducer";
import campaignsReducer from "pages/campaigns/reducer";

const root = combineReducers({
  notifier: notifierReducer,
  auth: authReducer,
  campaigns: campaignsReducer
});

export default root;

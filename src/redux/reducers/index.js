import { combineReducers } from "redux";

import authReducer from "./authReducer";
import themeReducer from "./themeReducer";
import cartReducer from "./cartReducer";

const rootReducer = combineReducers({
  authReducer,
  themeReducer,
  cartReducer,
});

export default rootReducer;

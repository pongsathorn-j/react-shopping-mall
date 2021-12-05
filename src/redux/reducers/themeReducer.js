import { SWITCH_THEME_MODE } from "../action/themeAction";

const initState = {
  themeMode: localStorage.getItem("mode")
    ? localStorage.getItem("mode")
    : "light",
};

const themeReducer = (state = initState, action) => {
  switch (action.type) {
    case SWITCH_THEME_MODE:
      return { ...state, themeMode: action.payload.themeMode };

    default:
      return state;
  }
};

export default themeReducer;

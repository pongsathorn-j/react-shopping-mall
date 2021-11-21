import { SWITCH_THEME_MODE, SWITCH_MENU_STYLE } from "../action/themeAction";

const initState = {
  menubarMode: 1,
  themeMode: localStorage.getItem("mode")
    ? localStorage.getItem("mode")
    : "light",
};

const themeReducer = (state = initState, action) => {
  switch (action.type) {
    case SWITCH_THEME_MODE:
      return { ...state, themeMode: action.payload.themeMode };
    case SWITCH_MENU_STYLE:
      return { ...state, menubarMode: action.payload.menubarMode };

    default:
      return state;
  }
};

export default themeReducer;

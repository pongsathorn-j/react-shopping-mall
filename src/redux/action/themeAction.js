export const SWITCH_THEME_MODE = "SWITCH_THEME_MODE";
export const SWITCH_MENU_STYLE = "SWITCH_MENU_STYLE";

export const switchThemeMode = (themeMode) => {
  // localStorage.setItem("mode", themeMode);
  return {
    type: SWITCH_THEME_MODE,
    payload: {
      themeMode: themeMode,
    },
  };
};

export const switchMenubarStyle = (menubarMode) => {
  // localStorage.setItem("mode", themeMode);
  return {
    type: SWITCH_MENU_STYLE,
    payload: {
      menubarMode: menubarMode,
    },
  };
};

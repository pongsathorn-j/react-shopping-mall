export const SWITCH_THEME_MODE = "SWITCH_THEME_MODE";

export const switchThemeMode = (themeMode) => {
  // localStorage.setItem("mode", themeMode);
  return {
    type: SWITCH_THEME_MODE,
    payload: {
      themeMode: themeMode,
    },
  };
};

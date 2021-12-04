import * as React from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import {
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  Box,
  Button,
  AppBar,
  Drawer,
  useTheme,
  useMediaQuery,
  ToggleButtonGroup,
  ToggleButton,
  Badge,
  Avatar,
  Divider,
  ListItemIcon,
} from "@mui/material";
import {
  MdAccountCircle,
  MdBrightnessHigh,
  MdBrightnessMedium,
  MdCancel,
  MdLogout,
  MdMenu,
  MdMoreVert,
  MdSettings,
  MdShoppingCart,
} from "react-icons/md";

import SearchBar from "./SearchBar";
import MenuBar from "./MenuBar";
import { useSelector, useDispatch } from "react-redux";
import { switchThemeMode } from "../redux/action/themeAction";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { signOut, authCheck } from "../redux/action/authAction";

const drawerWidth = 240;

const Navbar = () => {
  const theme = useTheme();
  const breakMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();
  const { total } = useSelector((state) => state.cartReducer);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  /** Popover Menu Profile */
  const { isAuth, expiredIn, currentUser } = useSelector(
    (state) => state.authReducer
  );
  const [popupProfile, setPopupProfile] = React.useState(null);
  const openPopupProfile = Boolean(popupProfile);
  const handleProfileClick = (event) => {
    setPopupProfile(event.currentTarget);
  };
  const handleProfileClose = () => {
    setPopupProfile(null);
  };
  const handleSignOut = () => {
    dispatch(signOut(navigate));
  };
  /** check token expired session */
  React.useEffect(() => {
    if (isAuth) {
      dispatch(authCheck(expiredIn, navigate));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /** Popover Menu signin Small Screen */
  const [popupsignin, setPopupsignin] = React.useState(null);
  const openPopupsignin = Boolean(popupsignin);
  const handlesigninClick = (event) => {
    setPopupsignin(event.currentTarget);
  };
  const handlesigninClose = () => {
    setPopupsignin(null);
  };
  /** Switch Language */
  const [lang, setLang] = React.useState(
    localStorage.getItem("i18nextLng") || "en"
  );
  const handleChangeLng = (event, newLanguage) => {
    setLang(newLanguage);
    i18next.changeLanguage(newLanguage);
  };

  /** Change Theme Mode */
  const { themeMode } = useSelector((state) => state.themeReducer);
  const toggleColorMode = () => {
    let mode = themeMode === "light" ? "dark" : "light";
    dispatch(switchThemeMode(mode));
  };

  /** Event Drawer On Drawer Small Screen */
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer - 2,
        }}
      >
        <TopToolbar theme={theme}>
          <>
            <IconButton
              size="small"
              sx={{ ml: 1 }}
              onClick={toggleColorMode}
              color="inherit"
            >
              {themeMode === "dark" ? (
                <>
                  <MdBrightnessHigh />
                  <Typography sx={{ ml: 1 }}>Light Mode</Typography>
                </>
              ) : (
                <>
                  <MdBrightnessMedium />{" "}
                  <Typography sx={{ ml: 1 }}>Dark Mode</Typography>
                </>
              )}
            </IconButton>
          </>
          <ToggleButtonGroup
            color="standard"
            value={lang}
            exclusive
            size="small"
            onChange={handleChangeLng}
          >
            <ToggleButton value="en">En</ToggleButton>
            <ToggleButton value="th">Th</ToggleButton>
          </ToggleButtonGroup>
        </TopToolbar>

        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { md: "block" },
            }}
          >
            <MdMenu />
          </IconButton>

          <Box sx={{ flexGrow: 1, display: { md: "none" } }} />

          <Box sx={{ mx: "24px" }}>
            <Link to="/" color="inherit">
              <img src="/assets/img/logo_1.png" height="50px" alt="logo" />
            </Link>
          </Box>

          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <SearchBar />
          </Box>

          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            onClick={() => navigate(`cart`)}
          >
            <Badge badgeContent={total} color="secondary">
              <MdShoppingCart />
            </Badge>
          </IconButton>

          {isAuth ? (
            <>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={handleProfileClick}
              >
                <MdAccountCircle />
              </IconButton>
              <Menu
                anchorEl={popupProfile}
                open={openPopupProfile}
                onClose={handleProfileClose}
                onClick={handleProfileClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem
                  onClick={() => {
                    navigate("profile");
                  }}
                >
                  <Avatar /> {t("menuProfile")}
                </MenuItem>

                <Divider />

                <MenuItem
                  onClick={() => {
                    navigate("setting");
                  }}
                >
                  <ListItemIcon>
                    <MdSettings fontSize="small" />
                  </ListItemIcon>
                  {t("menuSetting")}
                </MenuItem>
                <MenuItem onClick={handleSignOut}>
                  <ListItemIcon>
                    <MdLogout fontSize="small" />
                  </ListItemIcon>
                  {t("signout")}
                </MenuItem>
              </Menu>
            </>
          ) : //  isAuth = false
          breakMdUp ? (
            <>
              <MyButton
                variant="text"
                color="inherit"
                onClick={() => navigate(`signup`)}
              >
                {t("signup")}
              </MyButton>
              <MyButton
                variant="text"
                color="inherit"
                onClick={() => navigate(`signin`)}
              >
                {t("signin")}
              </MyButton>
            </>
          ) : (
            <>
              <IconButton
                size="large"
                aria-label="signin"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={handlesigninClick}
              >
                <MdMoreVert />
              </IconButton>
              <Menu
                anchorEl={popupsignin}
                open={openPopupsignin}
                onClose={handlesigninClose}
                onClick={handlesigninClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={() => navigate(`signup`)}>
                  {t("signup")}
                </MenuItem>
                <MenuItem onClick={() => navigate(`signin`)}>
                  {t("signin")}
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>

        <Toolbar sx={{ mx: "5px", display: { xs: "block", md: "none" } }}>
          <SearchBar />
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{}}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerClose}
          onBackdropClick={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              mt: 1,
            }}
          >
            <IconButton onClick={handleDrawerClose}>
              <MdCancel />
            </IconButton>
          </Box>
          <MenuBar role={currentUser?.role} />
        </Drawer>
      </Box>
    </>
  );
};

const TopToolbar = styled.div`
  background-color: #ea605d;
  color: #fff;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
  max-height: 28px;

  @media screen and (min-width: ${({ theme }) =>
      theme.breakpoints.values.md}px) {
    display: flex;
  }

  @media screen and (max-width: ${({ theme }) =>
      theme.breakpoints.values.md + 1}px) {
    display: none;
  } ;
`;

const MyButton = styled(Button)`
  overflow: hidden;
  white-space: nowrap;
  display: block;
  text-overflow: ellipsis;
  text-transform: none;
`;

export default Navbar;

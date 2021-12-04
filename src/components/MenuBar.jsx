import React from "react";
import { useNavigate } from "react-router-dom";
import {
  List,
  Divider,
  ListItemIcon,
  ListItemText,
  Toolbar,
  ToggleButtonGroup,
  ToggleButton,
  IconButton,
  ListItemButton,
  Collapse,
  ListSubheader,
  Box,
} from "@mui/material";
import styled from "styled-components";
import {
  MdBrightnessHigh,
  MdBrightnessMedium,
  MdExpandLess,
  MdExpandMore,
  MdCategory,
  MdLocalOffer,
  MdHome,
  MdForum,
  MdLiquor,
  MdBlender,
} from "react-icons/md";
import { GiFruitBowl, GiShrimp } from "react-icons/gi";

import { useSelector, useDispatch } from "react-redux";
import { switchThemeMode } from "../redux/action/themeAction";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

const Spacer = styled.div`
  margin-top: 28px;
  @media screen and (max-width: 900px) {
    margin-top: 1px;
  }
`;

const MenuBar = ({ role }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  /** Event Sub Menu */
  const [openSubMenuAdmin, setOpenSubMenuAdmin] = React.useState(false);
  const handleClickMenuAdmin = () => {
    setOpenSubMenuAdmin(!openSubMenuAdmin);
  };
  const [openSubMenu, setOpenSubMenu] = React.useState(false);
  const handleClick = () => {
    setOpenSubMenu(!openSubMenu);
  };
  /** Change Theme Mode */
  const { themeMode } = useSelector((state) => state.themeReducer);
  const toggleColorMode = () => {
    const mode = themeMode === "light" ? "dark" : "light";
    dispatch(switchThemeMode(mode));
  };
  /** Switch Language */
  const [lang, setLang] = React.useState(
    localStorage.getItem("i18nextLng") || "en"
  );
  const handleChangeLng = (event, newLanguage) => {
    setLang(newLanguage);
    i18next.changeLanguage(newLanguage);
  };

  return (
    <Box>
      <Toolbar>
        <ToggleButtonGroup
          color="standard"
          value={lang}
          exclusive
          onChange={handleChangeLng}
          sx={{ marginRight: "20px" }}
        >
          <ToggleButton value="en">En</ToggleButton>
          <ToggleButton value="th">Th</ToggleButton>
        </ToggleButtonGroup>
        <Box>{themeMode === "dark" ? "Light" : "Dark"}</Box>

        <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
          {themeMode === "dark" ? (
            <>
              <MdBrightnessHigh />
            </>
          ) : (
            <>
              <MdBrightnessMedium />
            </>
          )}
        </IconButton>
      </Toolbar>
      <Divider />

      <List
        sx={{ width: "100%", maxWidth: 360 }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Menu
          </ListSubheader>
        }
      >
        <ListItemButton onClick={() => navigate(`/`)}>
          <ListItemIcon>
            <MdHome />
          </ListItemIcon>
          <ListItemText primary={t("menuHome")} />
        </ListItemButton>

        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <MdCategory />
          </ListItemIcon>
          <ListItemText primary={t("menuCatelog")} />
          {openSubMenu ? <MdExpandLess /> : <MdExpandMore />}
        </ListItemButton>

        <Collapse in={openSubMenu} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => navigate(`product/list/beverages`)}
            >
              <ListItemIcon>
                <GiFruitBowl />
              </ListItemIcon>
              <ListItemText primary={t("beverages")} />
            </ListItemButton>
          </List>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => navigate(`product/list/fruit&vegetable`)}
            >
              <ListItemIcon>
                <MdLiquor />
              </ListItemIcon>
              <ListItemText primary={t("fruit&vegetable")} />
            </ListItemButton>
          </List>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => navigate(`product/list/meat&seafood`)}
            >
              <ListItemIcon>
                <GiShrimp />
              </ListItemIcon>
              <ListItemText primary={t("meat&seafood")} />
            </ListItemButton>
          </List>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => navigate(`product/list/homeAppliance`)}
            >
              <ListItemIcon>
                <MdBlender />
              </ListItemIcon>
              <ListItemText primary={t("homeAppliance")} />
            </ListItemButton>
          </List>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => navigate(`product/list/fashion`)}
            >
              <ListItemIcon>
                <GiFruitBowl />
              </ListItemIcon>
              <ListItemText primary={t("fashion")} />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton onClick={() => navigate(`promotion`)}>
          <ListItemIcon>
            <MdLocalOffer />
          </ListItemIcon>
          <ListItemText primary={t("menuPromotion")} />
        </ListItemButton>

        <ListItemButton onClick={() => navigate(`contact`)}>
          <ListItemIcon>
            <MdForum />
          </ListItemIcon>
          <ListItemText primary={t("menuContact")} />
        </ListItemButton>

        <ListItemButton onClick={() => navigate(`faqs`)}>
          <ListItemIcon>
            <MdForum />
          </ListItemIcon>
          <ListItemText primary={t("faqs")} />
        </ListItemButton>
      </List>
      <Divider />
      {role === "admin" && (
        <>
          <List
            sx={{ width: "100%", maxWidth: 360 }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Admin Menu
              </ListSubheader>
            }
          >
            <ListItemButton onClick={handleClickMenuAdmin}>
              <ListItemIcon>
                <MdCategory />
              </ListItemIcon>
              <ListItemText primary={t("menuAdminCatelog")} />
              {openSubMenuAdmin ? <MdExpandLess /> : <MdExpandMore />}
            </ListItemButton>

            <Collapse in={openSubMenuAdmin} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => navigate(`admin/editproduct`)}
                >
                  <ListItemIcon>
                    <GiFruitBowl />
                  </ListItemIcon>
                  <ListItemText primary={t("menuFruit")} />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </>
      )}
    </Box>
  );
};

export default MenuBar;

import React, { useState } from "react";
import styled from "styled-components";
import { MdSearch } from "react-icons/md";
import { useTranslation } from "react-i18next";
import {
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
} from "@mui/material";
import useSearch from "../utility/hooks/useSearch";

const SearchBar = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const { data, isLoading } = useSearch(query);

  const handleSearch = (e) => {
    const { value } = e.target;
    setTimeout(() => {
      if (value) setQuery(value);
    }, 500);
    console.log(data);
  };

  return (
    <div>
      <SearchContainer theme={theme}>
        <IconButton>
          <MdSearch />
        </IconButton>
        <SearchInput
          onFocus={() => setSearching(true)}
          onBlur={() => setSearching(false)}
          placeholder={t("placeholderSearch")}
          onChange={handleSearch}
        />
        {isLoading && <CircularProgress size={24} sx={{ mr: "5px" }} />}

        {data.length > 0 && !isLoading && searching && (
          <List
            className="list-item-search"
            sx={{
              position: "absolute",
              top: 48,
              left: 0,
              backgroundColor: "#fff",
              width: "100%",
              border: "1px solid transparent",
              color: "#000",
              overflow: "auto",
              maxHeight: 300,
            }}
          >
            {data.map((item, i) => {
              return (
                <ListItem disablePadding key={item._id}>
                  <ListItemButton>
                    <ListItemText primary={`${item.title}`} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        )}
      </SearchContainer>
    </div>
  );
};

const SearchContainer = styled.div`
  position: relative;
  width: 360px;
  height: 48px;
  background: #f2f2f2;
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 5px;

  @media screen and (max-width: ${({ theme }) =>
      theme.breakpoints.values.md}px) {
    width: 100%;
  }
`;

const SearchInput = styled.input`
  padding-left: 48px;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: transparent;
  outline: none;
  border: 1px solid transparent;

  &::placeholder {
    color: #575756;
  }

  &:focus,
  &:hover {
    outline: 0;
    border: 1px solid transparent;
    border-bottom: 1px solid #575756;
    border-radius: 0;
    background-position: 100% center;
  }
`;

const IconButton = styled.button`
  position: relative;
  height: 36px;
  width: 36px;
  border: none;
  cursor: pointer;
  z-index: 1;

  &:hover {
    color: white;
    &::after {
      opacity: 1;
    }
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    z-index: -1;
    background: #000;
    border-radius: 50%;
    opacity: 0;
  }
`;

export default SearchBar;

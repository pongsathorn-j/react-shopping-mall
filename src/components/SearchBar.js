import React from "react";
import styled from "styled-components";
import { MdSearch } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material";

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
  traslation: all 0.3s ease;

  @media screen and (max-width: ${({theme}) => theme.breakpoints.values.md}px) {
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

  &:focus, &:hover {
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
  backgroud: none;

  &:hover {
    color: white;
    &::after {
      opacity: 1;
      tranform: scale(1);
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
    translation: 0.2s ease;
    border-radius: 50%;
    tranform: scale(0.6);
    opacity: 0;
  }
`;

const SearchBar = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <div>
      <SearchContainer theme={theme}>
        <IconButton>
          <MdSearch />
        </IconButton>
        <SearchInput placeholder={t('placeholderSearch')} />
      </SearchContainer>
    </div>
  );
};

export default SearchBar;

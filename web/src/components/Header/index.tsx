/**
 * Default header component
 * @Author: Bobby Chao
 */
import React from "react";
import styled from "styled-components";
import InsideWrapper from "../../containers/InsideWrapper";
import styles from "./index.module.scss";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import UtilBtns from "./UtilBtns";

const Header = styled.header`
  display: flex;
  flex-direction: row;
  height: 45px;
  align-items: center;
`;

interface HeaderInterface{
  /**
   * margin-top value, optional
   * @default 0
   */
  marginTop?: number;
}

const HeaderComponent = (props:HeaderInterface) => {
  return(
    <InsideWrapper>
      <Header style={{ marginTop: props.marginTop ? props.marginTop : 0 }}>
        <Logo/>
        <SearchBar/>
        <UtilBtns/>
      </Header>
    </InsideWrapper>
  );
};

export default HeaderComponent;

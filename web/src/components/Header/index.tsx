/**
 * Default header component
 * @Author: Bobby Chao
 */
import React from "react";
import styles from "./index.module.scss";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import UtilBtns from "./UtilBtns";

interface HeaderInterface{
  /**
   * margin-top value, optional
   * @default 0
   */
  marginTop?: number;
}

const HeaderComponent = (props:HeaderInterface) => {
  return(
    <div
      className={styles.headerComponent}
      style={{ marginTop: props.marginTop ? props.marginTop : 0 }}
    >
      <Logo/>
      <SearchBar/>
      <UtilBtns/>
    </div>
  );
};

export default HeaderComponent;

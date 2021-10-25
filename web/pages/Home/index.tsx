import React from "react";
import InsideWrapper from "../../src/containers/InsideWrapper";
import TopMenus from "../../src/components/TopMenus";
import Hline from "../../src/components/Hline";
import Link from "../../src/components/Link";

import { testToken } from "../../src/data-request";
import { useSelector } from "react-redux";

const HomePage = () => {
  const getReduxStoreState = useSelector((state:any) => state);

  return(
    <>
      <InsideWrapper>
        <TopMenus marginTop={15}/>
      </InsideWrapper>
      <Hline marginTop="15px" marginBottom="15px"/>
      <InsideWrapper style={{ minHeight: 500 }}>
        Home
      </InsideWrapper>
    </>
  );
};

export default HomePage;

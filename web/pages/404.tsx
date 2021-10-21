import React from "react";
import InsideWrapper from "../src/containers/InsideWrapper";
import TopMenus from "../src/components/TopMenus";
import Hline from "../src/components/Hline";

const NotFoundPage = () => {
  return(
    <>
      <InsideWrapper>
        <TopMenus marginTop={15}/>
      </InsideWrapper>
      <Hline marginTop="15px" marginBottom="15px"/>
      <InsideWrapper style={{textAlign: 'center'}}>
        404 - Page not found
      </InsideWrapper>
    </>
  );  
};

export default NotFoundPage;

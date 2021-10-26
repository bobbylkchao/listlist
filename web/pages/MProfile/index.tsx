import React from "react";
import TopMenus from "../../src/components/TopMenus";
import Hline from "../../src/components/Hline";
import GlobalNoticeMsg from "../../src/components/GlobalNoticeMsg";
import InsideWrapper from "../../src/containers/InsideWrapper";

const MProfilePage = () => {
  return(
    <>
      <InsideWrapper>
        <TopMenus marginTop={15}/>
      </InsideWrapper>
      <Hline marginTop="15px" marginBottom="15px"/>
      <InsideWrapper style={{ minHeight: 500 }}>
        <GlobalNoticeMsg />
        <h2>My Profile Page</h2>
      </InsideWrapper>
    </>
  );
};

export default MProfilePage;

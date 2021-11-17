import React from "react";
import { useParams } from "react-router-dom";

// listlist
import GlobalNoticeMsg from "../../src/components/GlobalNoticeMsg";
import GrayBgWrapper from "../../src/containers/GrayBgWrapper";
import Hline from "../../src/components/Hline";
import InsideWrapper from "../../src/containers/InsideWrapper";

const CategoryBreadcrumbs = () => {
  return(
    <div>Home > Buy & Sell > Books > Magazines in Winnipeg</div>
  );
};

const CategoryPage = () => {
  const { id }:{ id:string } = useParams();

  return(
    <GrayBgWrapper>
      <Hline marginTop="15px" marginBottom="15px"/>
      <InsideWrapper>
        <GlobalNoticeMsg />
        <CategoryBreadcrumbs/>

      </InsideWrapper>
    </GrayBgWrapper>
  );
};

export default CategoryPage;

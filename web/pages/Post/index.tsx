import React from "react";
import { useParams } from "react-router-dom";

// listlist
import { scrollToTop } from "../../src/utils";
import InsideWrapper from "../../src/containers/InsideWrapper";
import TopMenus from "../../src/components/TopMenus";
import Hline from "../../src/components/Hline";
import Link from "../../src/components/Link";
import GlobalNoticeMsg from "../../src/components/GlobalNoticeMsg";

const PostPage = () => {
  const { id }:{ id: number } = useParams();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return(
    <>
      <InsideWrapper>
        <TopMenus marginTop={15}/>
      </InsideWrapper>
      <Hline marginTop="15px" marginBottom="15px"/>
      <InsideWrapper style={{ minHeight: 500 }}>
        <GlobalNoticeMsg />
        <h2>POST PAGE, ID: { id }</h2>
      </InsideWrapper>
    </>
  );
};

export default PostPage;

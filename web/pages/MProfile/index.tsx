import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

// listlist
import AuthorizedWrapper from "../../src/components/AuthorizedWrapper";
import TopMenus from "../../src/components/TopMenus";
import Hline from "../../src/components/Hline";
import GlobalNoticeMsg from "../../src/components/GlobalNoticeMsg";
import InsideWrapper from "../../src/containers/InsideWrapper";

const MProfilePage = () => {
  const getUserAuthState = useSelector((state:any) => state.userAuth.state);
  const router = useHistory();
  const location = useLocation();

  React.useEffect(() => {
    // If it is not authorized, then redirect to login page
    if(getUserAuthState){
      if(!getUserAuthState.auth){
        // Set 100 ms to avoid routing crossover issue (execute too fast, the URL is not changed)
        setTimeout(() => {
          router.replace({
            pathname: "/login",
            search: `?from=${encodeURIComponent(location.pathname)}`,
          });
        }, 100);
      }
    }
  }, [getUserAuthState]);
  
  return(
    <AuthorizedWrapper>
      <InsideWrapper>
        <TopMenus marginTop={15}/>
      </InsideWrapper>
      <Hline marginTop="15px" marginBottom="15px"/>
      <InsideWrapper style={{ minHeight: 500 }}>
        <GlobalNoticeMsg />
        <h2>My Profile Page</h2>
      </InsideWrapper>
    </AuthorizedWrapper>
  );
};

export default MProfilePage;

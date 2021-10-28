import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import AuthorizedWrapper from "../../src/components/AuthorizedWrapper";
import InsideWrapper from "../../src/containers/InsideWrapper";

const MessagePage = () => {
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
        <div>authed</div>
      </InsideWrapper>
    </AuthorizedWrapper>
  );
};

export default MessagePage;

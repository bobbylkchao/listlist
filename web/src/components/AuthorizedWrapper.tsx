/**
 * AuthorizedWrapper
 * @desc Container with authentication, if not valid, will redirect to login page. 
 */
import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";

const AuthorizedWrapperChild = styled.div`
  padding-top: 50px;
  text-align: center;
  color: #afafaf;
`;

const AuthorizedWrapper = (props: { children: any}) => {
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
    <>
    {
      getUserAuthState && getUserAuthState.executed 
      ? 
        getUserAuthState.auth
        ?
          <div>{ props.children }</div>
        : <AuthorizedWrapperChild>Unauthorized, redirecting to login page</AuthorizedWrapperChild>
      : <AuthorizedWrapperChild>Loading...</AuthorizedWrapperChild>
    }
    </>
  );
};

export default AuthorizedWrapper;

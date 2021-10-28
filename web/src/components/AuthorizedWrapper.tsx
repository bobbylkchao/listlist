import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const AuthorizedWrapperChild = styled.div`
  padding-top: 50px;
  text-align: center;
  color: #afafaf;
`;

const AuthorizedWrapper = (props: { children: any}) => {
  const getUserAuthState = useSelector((state:any) => state.userAuth.state);
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

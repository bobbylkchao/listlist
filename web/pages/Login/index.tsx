import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import InsideWrapper from "../../src/containers/InsideWrapper";
import LeftForm from "./LeftForm";
import RightForm from "./RightForm";
import Hline from "../../src/components/Hline";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 80%;
  margin: 3% auto;
`;

const LoginPage = () => {
  const getReduxStoreState = useSelector((state:any) => state);
  const router = useHistory();

  React.useEffect(() => {
    // If already logged, redirect to home page
    if(getReduxStoreState['userAuth']['state']){
      if(getReduxStoreState['userAuth']['state']['auth']){
        router.push("/");
      }
    }
  }, []);

  return(
    <>
      <Hline marginTop="15px" marginBottom="15px"/>
      <InsideWrapper>
        <LoginContainer>
          <LeftForm/>
          <RightForm/>
        </LoginContainer>
      </InsideWrapper>
    </>
  );
};

export default LoginPage;

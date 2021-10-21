import React from "react";
import styled from "styled-components";
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

import React from "react";
import styled from "styled-components";
import Wrapper from "../../src/containers/Wrapper/";
import LeftForm from "./LeftForm";
import RightForm from "./RightForm";
import Hline from "../../src/components/Hline";

const InsideWrapper = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 300px;
  max-width: 1000px;
  margin: 3% auto;
`;

const RegisterPage = () => {
  return(
    <>
      <Hline marginTop="15px" marginBottom="15px"/>
      <Wrapper>
        <InsideWrapper>
          <LeftForm/>
          <RightForm/>
        </InsideWrapper>
      </Wrapper>
    </>
  );
};

export default RegisterPage;

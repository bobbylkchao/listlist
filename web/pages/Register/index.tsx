import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import InsideWrapper from "../../src/containers/InsideWrapper";
import LeftForm from "./LeftForm";
import RightForm from "./RightForm";
import Hline from "../../src/components/Hline";

const RegContainer = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 80%;
  margin: 3% auto;
`;

const RegisterPage = () => {
  const getUserAuthState = useSelector((state:any) => state.userAuth.state);
  const router = useHistory();
  const location = useLocation();

  React.useEffect(() => {
    // If it is authorized, then redirect to home page
    if(getUserAuthState){
      if(getUserAuthState.auth){
        // Set 100 ms to avoid routing crossover issue (execute too fast, the URL is not changed)
        setTimeout(() => {
          router.replace({
            pathname: "/"
          });
        }, 100);
      }
    }
  }, [getUserAuthState]);

  return(
    <>
      <Hline marginTop="15px" marginBottom="15px"/>
      <InsideWrapper>
        <RegContainer>
          <LeftForm/>
          <RightForm/>
        </RegContainer>
      </InsideWrapper>
    </>
  );
};

export default RegisterPage;

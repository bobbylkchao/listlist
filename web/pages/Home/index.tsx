import React from "react";
import Wrapper from "../../src/containers/Wrapper/";
import TopMenus from "../../src/components/TopMenus";
import Hline from "../../src/components/Hline";

const HomePage = () => {
  return(
    <>
      <Wrapper>
        <TopMenus marginTop={15}/>
      </Wrapper>
      <Hline marginTop="15px" marginBottom="15px"/>
      <Wrapper>
        Home
      </Wrapper>
    </>
  );  
};

export default HomePage;

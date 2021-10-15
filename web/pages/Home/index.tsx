import React from "react";

// Containers and Components
import Wrapper from "../../src/containers/Wrapper";
import HeaderComponent from "../../src/components/Header";
import TopMenus from "../../src/components/TopMenus";
import Hline from "../../src/components/Hline";

const HomePage = () => {
  return(
    <>
      <Wrapper>
        <HeaderComponent marginTop={15}/>
        <TopMenus marginTop={15}/>
      </Wrapper>
      <Hline marginTop="15px" marginBottom="15px"/>	
    </>
  );
};

export default HomePage;

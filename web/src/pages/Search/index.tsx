import React from "react";
import { useParams } from "react-router-dom";
import Wrapper from "../../containers/Wrapper";

const SearchPage = () => {
  const { key }:{ key: string } = useParams();

  return(
    <Wrapper>
      Search Page, keyword is: { key }
    </Wrapper>
  );
};

export default SearchPage;

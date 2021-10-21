import React from "react";
import { useParams } from "react-router-dom";
import InsideWrapper from "../../src/containers/InsideWrapper";

const SearchPage = () => {
  const { key }:{ key: string } = useParams();
  return(
    <InsideWrapper>
      Search Page, keyword is: { key }
    </InsideWrapper>
  );
};

export default SearchPage;

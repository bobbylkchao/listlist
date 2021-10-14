import React from "react";
import { useParams } from "react-router-dom";

const SearchPage = () => {
  const { key }:{ key: string } = useParams();

  return(
    <>
      <div>
        Search Page, keyword is: { key }
      </div>
    </>
  );
};

export default SearchPage;

import React from "react";
import { useParams } from "react-router-dom";
import Wrapper from "../../containers/Wrapper";

const CategoryPage = () => {
  const { id }:{ id:string } = useParams();

  return(
    <>
      <Wrapper>
        Category Page, param is: { id }
      </Wrapper>
    </>
  );
};

export default CategoryPage;

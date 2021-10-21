import React from "react";
import { useParams } from "react-router-dom";
import InsideWrapper from "../../src/containers/InsideWrapper";

const CategoryPage = () => {
  const { id }:{ id:string } = useParams();

  return(
    <InsideWrapper>
      Category Page, param is: { id }
    </InsideWrapper>
  );
};

export default CategoryPage;

import React from "react";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const { id }:{ id:string } = useParams();

  return(
    <>
      <div>
        Category Page, param is: { id }
      </div>
    </>
  );
};

export default CategoryPage;

import React from "react";
import "./index.scss";
import SearchInput from "./SearchInput";
import CategorySelect from "./CategorySelect";
import AddressInput from "./AddressInput";
import SearchBtn from "./SearchBtn";

const SearchBar = () => {
  const [keyword, setKeyword] = React.useState<string>('');

  return(
    <div className="header-component-searchbar">
      <SearchInput width={2.5} getData={setKeyword}/>
      <CategorySelect width={1.5}/>
      <AddressInput width={1.5}/>
      <SearchBtn width={0.4} passData={keyword}/>
    </div>
  );
};

export default SearchBar;
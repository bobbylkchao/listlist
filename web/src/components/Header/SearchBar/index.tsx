import React from "react";
import { useLocation } from "react-router-dom";

// listlist
import styles from "./index.module.scss";
import SearchInput from "./SearchInput";
import CategorySelect from "./CategorySelect";
import AddressInput from "./AddressInput";
import SearchBtn from "./SearchBtn";

const SearchBar = () => {
  const location = useLocation();
  const [keyword, setKeyword] = React.useState<string>('');
  const [visible, setVisible] = React.useState<boolean>(true);

  // config pages that need to hide searchbar
  const hideInWhichPages = [
    '/add-post',
    '/m-profile',
  ];

  React.useEffect(() => {
    // hide search-bar if page pathname matches config
    if(hideInWhichPages.indexOf(location.pathname) !== -1){
      setVisible(false);
    }else{
      setVisible(true);
    }
  }, [location]);

  return(
    <div
      className={styles.header_component_searchbar}
      style={{ visibility: visible ? 'visible' : 'hidden' }}
    >
      <SearchInput width={2.5} getData={setKeyword}/>
      <CategorySelect width={1.5}/>
      <AddressInput width={1.5}/>
      <SearchBtn width={0.4} passData={keyword}/>
    </div>
  );
};

export default SearchBar;

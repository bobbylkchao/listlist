import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from "./index.module.scss";

const CategoryItem = () => {
  const getReduxStoreState = useSelector((state:any) => state);
  const dispatchRedux = useDispatch();

  React.useEffect(() => {
    console.log(`CategoryItem Loaded...`);
  }, []);

  const setSelectedCategory = (id:number, name:string) => {
    dispatchRedux({
      type: 'setCategorySelected',
      value: {
        id: id,
        name: name,
      },
    });
  };

  return(
    <>
      <Dropdown.Item
        id={`${!getReduxStoreState['categorySelected']['state'] || getReduxStoreState['categorySelected']['state']['id'] === 0 ? 'searchBarCategoryItemActive' : ''}`}
        className={styles.searchBar_category_item}
        onClick={() => setSelectedCategory(0, 'All Categories')}>
          <span><FontAwesomeIcon icon="ellipsis-h"/></span>
          <span>All Categories</span>
          <span style={{ visibility: !getReduxStoreState['categorySelected']['state'] || getReduxStoreState['categorySelected']['state']['id'] === 0 ? 'visible' : 'hidden' }}><FontAwesomeIcon icon="check"/></span>
      </Dropdown.Item>
      {
        getReduxStoreState['categoryList']['state'] instanceof Array ?
        getReduxStoreState['categoryList']['state'].map(
          (item:any, key:number) =>
            (
              <Dropdown.Item
                key={key}
                id={`${getReduxStoreState['categorySelected']['state'] && getReduxStoreState['categorySelected']['state']['id'] === item.id ? 'searchBarCategoryItemActive' : ''}`}
                className={styles.searchBar_category_item}
                onClick={() => setSelectedCategory(item.id, item.name)}>
                  <span><FontAwesomeIcon icon={item.icon}/></span>
                  <span>{ item.name }</span>
                  <span style={{ visibility: getReduxStoreState['categorySelected']['state'] && getReduxStoreState['categorySelected']['state']['id'] === item.id ? 'visible' : 'hidden' }}><FontAwesomeIcon icon="check"/></span>
              </Dropdown.Item>
            ),
        ) : <></>
      }
    </>
  );
};

export default CategoryItem;

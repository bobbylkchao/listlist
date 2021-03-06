import React from 'react';
import { useSelector } from "react-redux";
import Dropdown from 'react-bootstrap/Dropdown';

import styles from "./index.module.scss";
import { getGraphQL } from '../../../../utils';
import CategoryItem from './CategoryItem';

const CategorySelect = (props:{width?: number}) => {
  const getReduxStoreState = useSelector((state:any) => state);
  return(
    <Dropdown
      className={styles.searchBar_category_wrapper}
      style={{
        flex: props.width ? props.width : 1,
      }}
    >
      <Dropdown.Toggle
        variant="success"
        style={{ flex: props.width ? props.width : 1 }}
        className={ styles.searchBar_category_select }
      >
        <div>{ getReduxStoreState['categorySelected']['state'] ? getReduxStoreState['categorySelected']['state']['name'] : 'All Categories' }</div>
      </Dropdown.Toggle>
      <Dropdown.Menu className={styles.searchBar_category_menu}>
        <CategoryItem/>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CategorySelect;

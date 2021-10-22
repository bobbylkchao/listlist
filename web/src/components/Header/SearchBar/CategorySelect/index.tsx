import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import Dropdown from 'react-bootstrap/Dropdown';

import styles from "./index.module.scss";
import { getGraphQL } from '../../../../utils';
import CategoryItem from './CategoryItem';

const CategorySelect = (props:{width?: number}) => {
  const [categories, setCategories] = React.useState<object>({});
  const getReduxStoreState = useSelector((state:any) => state);
  const dispatchRedux = useDispatch();

  React.useEffect(() => {
    // When load, get data
    if(getReduxStoreState['categoryList']['state'] instanceof Array) return;

    getGraphQL(`
      query{
        category{
          id,
          name,
          icon,
          items{
            id,
            name,
            items{
              id,
              name
            }
          }
        }
      }
    `, (r:any) => {
      setCategories(r.data.category);
      // Pass data to redux to store
      dispatchRedux({
        type: 'saveCategories',
        value: r.data.category,
      });
    });
  }, []);

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
        <CategoryItem items={categories}/>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CategorySelect;

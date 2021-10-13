import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CategoryItem = (props:{items: any}) => {
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
      }
    });
  };

  return(
    <>
      <Dropdown.Item
        className={`searchBar-category-item ${!getReduxStoreState['categorySelected']['state'] || getReduxStoreState['categorySelected']['state']['id'] === 0 ? 'active' : ''}`} 
        onClick={() => setSelectedCategory(0, 'All Categories')}>
          <span><FontAwesomeIcon icon="ellipsis-h"/></span>
          <span>All Categories</span>
          <span style={{visibility: !getReduxStoreState['categorySelected']['state'] || getReduxStoreState['categorySelected']['state']['id'] === 0 ? 'visible' : 'hidden'}}><FontAwesomeIcon icon="check"/></span>
      </Dropdown.Item>
      {
        props.items instanceof Array ?
        props.items.map(
          (item:any, key:number) => 
            <Dropdown.Item
              key={key}
              className={`searchBar-category-item ${getReduxStoreState['categorySelected']['state'] && getReduxStoreState['categorySelected']['state']['id'] === item.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(item.id, item.name)}>
                <span><FontAwesomeIcon icon={item.icon}/></span>
                <span>{ item.name }</span>
                <span style={{visibility: getReduxStoreState['categorySelected']['state'] && getReduxStoreState['categorySelected']['state']['id'] === item.id ? 'visible' : 'hidden'}}><FontAwesomeIcon icon="check"/></span>
            </Dropdown.Item>
        ) : <></>
      }
    </>
  );
};

export default CategoryItem;

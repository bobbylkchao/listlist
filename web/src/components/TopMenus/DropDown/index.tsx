import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavDropdown from "react-bootstrap/NavDropdown";
import { useHistory } from 'react-router-dom';

// interfaces
import { DropDownInterface, NavDropDownItemInterface } from "./interface";
// cutom styles
import "./index.scss";
// styled components
import { DropDownMain, DropDownLeft, DropDownRight, DropDownRightLink } from "./styled";

const DropDown = (props:DropDownInterface|any) => {
  let history = useHistory();

  const [dropDownVisible, setDropDownVisible] = React.useState<boolean>(false);
  const [currentHoverdCategory, setCurrentHoverdCategory] = React.useState<{id:number, name:string}>({id: 0, name: 'Choose a category'});
  const [categoryList, setCategoryList] = React.useState<{id:number, name:string}[]>([]);

  const setCategoryListHandle = (subitems:any) => {
    // Avoid repeat
    if(JSON.stringify(categoryList) === JSON.stringify(subitems)) return;
    setCategoryList(subitems);
  };

  const NavDropDownItem = (props:NavDropDownItemInterface) => (
    <NavDropdown.Item
      onClick={() => {
        // hide sub menu
        setDropDownVisible(false);
        // go to page
        history.push(`/category/${props.id}`);
      }}
      className="MenuDropDownLeftItem"
      onMouseEnter={(e:any) => {
        e.target.style.backgroundColor = "#ececee";
        setCurrentHoverdCategory({id:props.id, name:props.name});
        setCategoryListHandle(props.subitems);
      }}
    >
      <div>{ props.name }</div>
      <div><FontAwesomeIcon icon="chevron-right"/></div>
    </NavDropdown.Item>
  );

  return(
    <NavDropdown
      title={props.name}
      className="MenuDropDownWrapper"
      show={dropDownVisible}
      onMouseEnter={(e:any) => {
        // show sub menu
        setDropDownVisible(true);
        // reset states when hover to menu
        setCurrentHoverdCategory({id: 0, name: 'Choose a category'});
        // reset category list
        setCategoryList([]);
      }}
      onMouseLeave={(e:any) => {
        // hide sub menu
        setDropDownVisible(false);
      }}
    >
      <DropDownMain
        className="MenuDropDown"
        onMouseLeave={() => setDropDownVisible(false)}
      >

        <DropDownLeft>
          {
            props.categories instanceof Array ? props.categories.map((item:any, key:number) => (
              <NavDropDownItem key={key} name={item.name} id={item.id} subitems={item.items}/>
            )) : <></>
          }
        </DropDownLeft>

        <DropDownRight>
          <DropDownRightLink onClick={() => {
            // hide sub menu
            setDropDownVisible(false);
            // go to page
            history.push(`/category/${currentHoverdCategory.id}`)
          }} bold={true}>
            { currentHoverdCategory.id === 0 ? `${currentHoverdCategory.name}` : `See all in ${ currentHoverdCategory.name}`}
          </DropDownRightLink>
          {
            categoryList && categoryList.length > 0 ? categoryList.map((item:any, key:number) => <DropDownRightLink key={key} onClick={() => {
              // hide sub menu
              setDropDownVisible(false);
              // go to page
              history.push(`/category/${item.id}`);
            }}>{ item.name }</DropDownRightLink>) : <></>
          }
        </DropDownRight>

      </DropDownMain>
    </NavDropdown>
  );
};

export default DropDown;
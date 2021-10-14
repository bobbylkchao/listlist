import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavDropdown from "react-bootstrap/NavDropdown";
import styled from "styled-components";
import "./index.scss";

const DropDownMain = styled.div`
  width: 630px;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
`;

const DropDownLeft = styled.div`
  flex: 2;
  width: 100%;
  height: 350px;
  overflow-y: auto;
  padding: 0;
  box-sizing: border-box;

  scrollbar-width: auto;
  scrollbar-color: #757575 #ffffff;
  &::-webkit-scrollbar {
    width: 13px;
  }
  &::-webkit-scrollbar-track {
    background: #ffffff;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #757575;
    border-radius: 10px;
    border: 3px solid #ffffff;
  }
`;

const DropDownRight = styled.div`
  flex: 3;
  height: 350px;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  box-sizing: border-box;
  border-left: 1px solid rgb(226, 226, 226)
`;

interface DropDownRightLinkInterface{
  bold?: boolean;
}

const DropDownRightLink = styled.a<DropDownRightLinkInterface>`
  display: block;
  text-decoration: none;
  color:  ${(props:any) => props.bold ? '#067ae9' : '#000000'};
  height: 30px;
  font-weight: ${(props:any) => props.bold ? 'bold' : 'normal'};

  &:hover{
    cursor: pointer;
  }
`;

const DropDown = (props:{title: string}) => {
  const [dropDownVisible, setDropDownVisible] = React.useState<boolean>(false);
  const [currentHoverdCategory, setCurrentHoverdCategory] = React.useState<{id:number, title:string}>({id: 0, title: 'Choose a category'});
  const [categoryList, setCategoryList] = React.useState<{id:number, title:string}[]>([]);

  const setCategoryListHandle = (subitems:any) => {
    // Avoid repeat
    if(JSON.stringify(categoryList) === JSON.stringify(subitems)) return;
    setCategoryList(subitems);
  };

  interface NavDropDownItemInterface{
    id: number;
    title: string;
    subitems:{id:number, title:string}[];
  }

  const NavDropDownItem = (props:NavDropDownItemInterface) => (
    <NavDropdown.Item
      href={`/category/${props.id}`}
      className="MenuDropDownLeftItem"
      onMouseEnter={(e:any) => {
        e.target.style.backgroundColor = "#ececee";
        setCurrentHoverdCategory({id:props.id, title:props.title});
        setCategoryListHandle(props.subitems);
      }}
    >
      <div>{ props.title }</div>
      <div><FontAwesomeIcon icon="chevron-right"/></div>
    </NavDropdown.Item>
  );

  return(
    <NavDropdown
      title={props.title}
      className="MenuDropDownWrapper"
      show={dropDownVisible}
      onMouseEnter={() => {
        setDropDownVisible(true);
        // reset states when hover to menu
        setCurrentHoverdCategory({id: 0, title: 'Choose a category'});
        setCategoryList([]);
      }}
    >
      <DropDownMain
        className="MenuDropDown"
        onMouseLeave={() => setDropDownVisible(false)}
      >

        <DropDownLeft>
          <NavDropDownItem
            title="Submenu 1"
            id={1}
            subitems={[
              {'id':1,'title':'submenu1'},
              {'id':2,'title':'submenu2'},
              {'id':3,'title':'submenu3'},
              {'id':4,'title':'submenu4'},
            ]}
          />
        </DropDownLeft>

        <DropDownRight>
          <DropDownRightLink href={`/category/`} bold={true}>
            { currentHoverdCategory.id === 0 ? `${currentHoverdCategory.title}` : `See all in ${ currentHoverdCategory.title}`}
          </DropDownRightLink>
          {
            categoryList && categoryList.length > 0 ? categoryList.map((item:any, key:number) => <DropDownRightLink key={key} href={`/category/${item.id}`}>{ item.title }</DropDownRightLink>) : <></>
          }
        </DropDownRight>

      </DropDownMain>
    </NavDropdown>
  );
};

export default DropDown;
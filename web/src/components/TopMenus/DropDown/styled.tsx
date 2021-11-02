import styled from "styled-components";
import { withRouter } from "react-router-dom";

const DropDownMain = styled.div`
  width: 700px;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
`;

const DropDownLeft = styled.div`
  flex: 3;
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
  flex: 4;
  height: 350px;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  box-sizing: border-box;
  border-left: 1px solid rgb(226, 226, 226)
`;

interface DropDownRightLinkInterface{
  /**
   * font weight bold
   * @default normal
   */
  bold?: boolean;
}
const DropDownRightLink = styled.a<DropDownRightLinkInterface>`
  display: block;
  text-decoration: none;
  color:  ${(props:any) => props.bold ? '#067ae9' : '#000000'};
  height: 30px;
  font-weight: ${(props:any) => props.bold ? 500 : 'normal'};

  &:hover{
    cursor: pointer;
  }
`;

export {
  DropDownMain,
  DropDownLeft,
  DropDownRight,
  DropDownRightLink,
};

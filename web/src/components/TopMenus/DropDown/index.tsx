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
  overflow-y: scroll;
  padding: 0 10px;
  box-sizing: border-box;

  scrollbar-width: auto;
  scrollbar-color: #757575 #ffffff;
  &::-webkit-scrollbar {
    width: 16px;
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
  background-color: aliceblue;
  flex: 3;
  height: 350px;
  overflow-y: hidden;
`;

const DropDownRightLink = styled.a`
`;

const DropDown = () => {
  return(
    <NavDropdown title="Menu1" className="MenuDropDownWrapper">
      <DropDownMain className="MenuDropDown">

        <DropDownLeft>
          <NavDropdown.Item href="#action/3.1" className="MenuDropDownLeftItem">Action</NavDropdown.Item>
        </DropDownLeft>

        <DropDownRight>
          <DropDownRightLink>Link1</DropDownRightLink>
          <DropDownRightLink>Link2</DropDownRightLink>
        </DropDownRight>

      </DropDownMain>
    </NavDropdown>
  );
};

export default DropDown;
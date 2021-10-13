import styled from "styled-components";
import { useHistory } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import "./index.scss";

const Logo = () => {
  let history = useHistory();

  const LogoImg = styled.img`
    &:hover{
      cursor: pointer;
    }
  `;
  return(
    <div className="header-component-logo">
      <LogoImg
        src={logo}
        alt="ListList.ca"
        onClick={() => history.push('/')}
      />
    </div>
  );
};

export default Logo;

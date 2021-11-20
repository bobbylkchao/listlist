import styled from "styled-components";
import Link from "./Link";

const FooterStyled = styled.footer`
  text-align: center;
  margin-bottom: 10px;
`;

const Footer = () => {
  return(
    <FooterStyled>
      <Link href="https://github.com/bobbylkchao/listlist" target="_blank">Github</Link>
    </FooterStyled>
  );
};

export default Footer;
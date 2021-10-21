import styled from "styled-components";
import { buttonColor, buttonColorHover } from "../../theme";

interface ButtonInterface{
  /**
   * width
   * @default 'auto'
   */
  width?: string;
  /**
   * height
   * @default 'auto'
   */
  height?: string;
  /**
   * fontWeight
   * @default 'bold'
   */
  fontWeight?: string;
}

const Button = styled.button`
  cursor: pointer;
  background-color: ${buttonColor};
  width: ${(props:any) => props.width || 'auto'};
  height: ${(props:any) => props.height || 0};
  line-height: ${(props:any) => props.height || 0};
  font-weight: ${(props:any) => props.fontWeight || 'normal'};
  color: #ffffff;
  text-align: center;
  vertical-align: middle;
  border-radius: 5px;
  display: inline-block;
  border: 0;
  outline: none;

  &:hover{
    background-color: ${buttonColorHover};
    color: #ffffff;
  }
`;

export default Button;
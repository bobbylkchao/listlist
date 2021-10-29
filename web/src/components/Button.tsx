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
  /**
   * background color
   */
  bgColor?: string;
  /**
   * font color
   */
  color?: string;
}

const Button = styled.button<ButtonInterface>`
  cursor: pointer;
  background-color: ${(props:any) => props.bgColor || buttonColor};
  width: ${(props:any) => props.width || 'auto'};
  height: ${(props:any) => props.height || 0};
  /*line-height: ${(props:any) => props.height || 0};*/
  font-weight: ${(props:any) => props.fontWeight || 'normal'};
  color: ${(props:any) => props.color || '#ffffff'};
  text-align: center;
  vertical-align: middle;
  border-radius: 5px;
  display: inline-block;
  border: ${(props:any) => props.bgColor ? '1px solid #d7d7d7' : 0};
  outline: none;

  &:hover{
    background-color: ${buttonColorHover};
    color: #ffffff;
  }
`;

export default Button;

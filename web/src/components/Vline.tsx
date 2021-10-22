/**
 * Vertical line component
 * @param {string} height The height of this component. @default 65%.
 * @param {string} bgcolor The background color of this component. @default #ebebed.
 */
import styled from 'styled-components';

interface VlineProps{
  height?: string;
  bgcolor?: string;
}

const Vline = styled.div<VlineProps>`
  height: ${(props:any) =>  props.height || '65%'};
  background-color: ${(props:any) => props.bgcolor || '#ebebed'};
  width: 1px;
`;

export default Vline;

import styled from "styled-components";

interface HlineProps{
  width?: string;
  height?: string;
  marginTop?: string | number;
  marginBottom?: string | number;
}

const Hline = styled.div<HlineProps>`
  width: ${(props:any) => props.width || '100%'};
  height: ${(props:any) => props.height || '1px'};
  margin-top: ${(props:any) => props.marginTop || 0};
  margin-bottom: ${(props:any) => props.marginBottom || 0};
  background-color: #e5e5e5;
`;

export default Hline;
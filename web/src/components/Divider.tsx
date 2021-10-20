import styled from "styled-components";

interface DividerInterface{
  height?: string;
};

const Divider = styled.div`
  height: ${(props:any) => props.height ? props.height : '10px'};
`;

export default Divider;

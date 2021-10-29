import { defaultTextColor } from "../../theme";
import styled from "styled-components";

const StyledWrapper = styled.div`
  min-width: 1024px;
  margin: 0 auto;
  color: ${defaultTextColor};
  height: 100%;
`;

const Wrapper = (props: { children: any }) => {
  return <StyledWrapper>{ props.children }</StyledWrapper>
};

export default Wrapper;

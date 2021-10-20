import styled from "styled-components";
import RightTop from "./RightTop";
import RightBottom from "./RightBottom";
import Divider from "../../src/components/Divider";

const RightFormWrapper = styled.div`
  display: flex;
  flex: 1;
  margin-left: 20px;
  flex-direction: column;
`;

const RightForm = () => {
  return(
    <RightFormWrapper>
      <RightTop/>
      <Divider height="30px"/>
      <RightBottom/>
    </RightFormWrapper>
  );
};

export default RightForm;

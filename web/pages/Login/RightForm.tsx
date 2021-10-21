import styled from "styled-components";
import RightTop from "./RightTop";

const RightFormWrapper = styled.div`
  margin-left: 20px;
  width: 35%;
`;

const RightForm = () => {
  return(
    <RightFormWrapper>
      <RightTop/>
    </RightFormWrapper>
  );
};

export default RightForm;

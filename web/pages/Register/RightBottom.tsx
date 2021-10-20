import styled from "styled-components";
import { H4 } from "../../src/components/Heading";

const RightBottomWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
  background-color: #f3f3f3;

  >h4,>div,>ul{
    margin-bottom: 10px;
  }
`;

const NoticeText = styled.div`
  color: gray;
`;

const RightBottom = () => {
  return(
    <RightBottomWrapper>
      <H4>Why Register?</H4>
      <NoticeText>
        To enhance your Kijiji experience and help you stay safe and secure, you now need to register to:
      </NoticeText>
    </RightBottomWrapper>
  );
};

export default RightBottom;

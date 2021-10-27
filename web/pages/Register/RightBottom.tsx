import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { defaultTextColor } from "../../theme";
import { H4 } from "../../src/components/Heading";

const RightBottomWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  border: 1px solid #ececec;
  border-radius: 5px;
`;

const NoticeText = styled.div`
  color: ${defaultTextColor};
  margin: 20px 0;
  font-size: 13px;
`;

const UList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 13px;

  li:not(:last-child){
    margin-bottom: 20px;
  }

  li>svg{
    color: #4bc183;
    margin-right: 5px;
  }
`;

const RightBottom = () => {
  return(
    <RightBottomWrapper>
      <H4>Why Register?</H4>
      <NoticeText>
        To enhance your ListList experience and help you stay safe and secure, you now need to register to:
      </NoticeText>
      <UList>
        <li>
          <FontAwesomeIcon icon="check-circle"/> Post, edit and manage ads
        </li>
        <li>
          <FontAwesomeIcon icon="check-circle"/> Access saved ads in your Favourites from all of your devices
        </li>
        <li>
          <FontAwesomeIcon icon="check-circle"/> Easily promote multiple ads to gain more visibility and view order history
        </li>
        <li>
          <FontAwesomeIcon icon="check-circle"/> Reserve your own nickname
        </li>
        <li>
          <FontAwesomeIcon icon="check-circle"/> And much more!
        </li>
      </UList>
    </RightBottomWrapper>
  );
};

export default RightBottom;

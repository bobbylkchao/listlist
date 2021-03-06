import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { H4 } from "../../src/components/Heading";
import Button from "../../src/components/Button";

const RightTopWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
  border: 1px solid #ececec;
  border-radius: 5px;

  h4,div,a{
    margin-bottom: 10px;
  }
`;

const NoticeTextWrapper = styled.div`
  color: gray;
  font-size: 13px;
`;

const RightTop = () => {
  const history = useHistory();

  return(
    <RightTopWrapper>
      <H4>Already registered?</H4>
      <NoticeTextWrapper>Sign in to post your ad.</NoticeTextWrapper>
      <Button
        height="30px"
        width="40%"
        onClick={() => history.push('/login')}
      >Sign In</Button>
    </RightTopWrapper>
  );
};

export default RightTop;

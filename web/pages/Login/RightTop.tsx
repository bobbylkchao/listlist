import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { H4 } from "../../src/components/Heading";
import Button from "../../src/components/Button";
import { defaultTextColor } from "../../theme";

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
  color: ${defaultTextColor};
  padding: 10px 30px;
  text-align: center;
`;

const RightTop = () => {
  const history = useHistory();

  return(
    <RightTopWrapper>
      <H4>Not registered yet?</H4>
      <NoticeTextWrapper>Register now to post, edit, and manage ads. It’s quick, easy, and free!</NoticeTextWrapper>
      <Button
        height="35px"
        width="50%"
        onClick={() => history.push('/register')}
      >Register Now</Button>
    </RightTopWrapper>
  );
};

export default RightTop;

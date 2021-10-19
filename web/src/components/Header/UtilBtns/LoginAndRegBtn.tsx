import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "../../Link";

const LoginAndRegBtnWrapper = styled.div`
  display: flex;
  flex: 2;
`;

const LoginAndRegBtn = () => {
  const router = useHistory();

  return(
    <LoginAndRegBtnWrapper>
      <Link onClick={() => router.push('/register')}>Register</Link>
      <span style={{marginLeft: 5, marginRight: 5}}>or</span>
      <Link onClick={() => router.push('/login')}>Sign In</Link>
    </LoginAndRegBtnWrapper>
  );
};

export default LoginAndRegBtn;

import styled from 'styled-components';
import styles from "./index.module.scss";

const PostAdBtn = styled.a`
  display: flex;
  text-decoration: none;
  cursor: pointer;
  background-color: #067ae9;
  height: 100%;
  width: 82px;
  color: #ffffff;
  justify-content: center;
  align-items: center;
  border-radius: 5px;

  &:hover{
    background-color: #3189db;
    color: #ffffff;
  }
`;

const UtilBtns = () => {
  return(
    <div className={styles.header_component_utilbtns}>
      <PostAdBtn
        onClick={e => console.log(e)}
      >Post Ad</PostAdBtn>
    </div>
  );
};

export default UtilBtns;
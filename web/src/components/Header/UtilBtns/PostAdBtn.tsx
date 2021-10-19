import styled from "styled-components";

const PostAdBtn = styled.a`
  display: flex;
  flex: 1;
  text-decoration: none;
  cursor: pointer;
  background-color: #067ae9;
  height: 80%;
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

export default PostAdBtn;
import styled from "styled-components";
import { defaultTextColor } from "../../theme";

export const BreadCrumbsWrapper = styled.div`
  margin-bottom: 15px;
  >span:nth-child(2){
    ::before{
      margin-left: 10px;
      margin-right: 10px;
      content: ">";
    }
  }
  >span:nth-child(3){
    ::before{
      margin-left: 10px;
      margin-right: 10px;
      content: ">";
    }
  }
  >span:nth-child(4){
    ::before{
      margin-left: 10px;
      margin-right: 10px;
      content: ">";
    }
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;

  >div{
    display: flex;
  }
`;

export const Left = styled.div`
  background-color: #fff;
  flex: 1;
  flex-direction: column;
`;

export const LeftFilterItemWrapper = styled.div`
  color: ${defaultTextColor};
  box-sizing: border-box;
  margin-bottom: 10px;

  >.title{
    padding: 10px;
    background-color: #f7f7f7;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    
    >span{
      pointer-events: none;
    }

    &:hover{
      cursor: pointer;
    }
  }

  >.content{
    padding: 0 10px;
    >div{
      height: 40px;
    }

    >div:last-child{
      margin-bottom: 5px;
    }

    >ul,li{
      padding: 0;
      margin: 0;
      list-style: none;
    }
    li{
      max-width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      height: 40px;
      line-height: 40px;
    }
  }
`;

export const Right = styled.div`
  background-color: #fff;
  flex: 3;
  flex-direction: column;
  margin-left: 20px;
  min-height: 768px;
`;

export const RightFilterWrapper = styled.div`
  display: flex;
  justify-content: end;
`;
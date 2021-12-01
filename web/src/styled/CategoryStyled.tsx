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
  margin-bottom: 15px;
`;

export const RightListWrapper = styled.div`

`;

export const RightListItem = styled.div`
  display: flex;
  flex-direction: row;
  height: 160px;
  border-radius: 5px 5px 0 0;

  img{
    border-radius: 5px;
  }

  &:hover{
    cursor: pointer;
    background-color: #f8f9f9;
  }

  >div:first-child{
    display: flex;
    flex: 1;
    align-items: center;
    position: relative;
  }

  >div:nth-child(2){
    display: flex;
    flex: 4;
    padding: 10px 15px;
    box-sizing: border-box;
    flex-direction: column;

    {/* title area */}
    >div:first-child{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      height: 20%;
      font-weight: 500;
      font-size: 17px;

      {/* title */}
      >div:first-child{
        flex: 4;
        max-width: 500px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      {/* price */}
      >div:nth-child(2){
        display: flex;
        color: #37a864;
        margin-left: 5px;
      }

    }

    {/* short infos area */}
    >div:nth-child(2){
      display: flex;
      align-items: center;
      height: 20%;
      color: #b9b9b9;
      
      >span:first-child{
        &:after{
          content: "|";
          margin-left: 10px;
          margin-right: 10px;
        }
      }

    }

    {/* content area */}
    >div:nth-child(3){
      height: 60%;
      padding-top: 5px;
      box-sizing: border-box;
      align-items: start;
      overflow: hidden;
      line-height: 1.8;
    }

  }
`;

export const RightListItemDivider = styled.div`
  height: 1px;
  width: 100%;
  background-color: #e8e8e8;
  margin: 10px 0;
`;
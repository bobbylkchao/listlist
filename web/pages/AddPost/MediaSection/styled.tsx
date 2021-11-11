import styled from "styled-components";

export const AddImageWrapper = styled.div`
  height: 150px;
  width: 18.5%;
  min-width: 18.5%;
  max-width: 18.5%;
  border: 1px solid #ced4da;
  border-radius: 5px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-right: 10px;
  margin-bottom: 20px;
  overflow: hidden;

  > span{
    font-size: 80px;
    font-weight: lighter;
    color: #ced4da;
  }

  > svg{
    font-size: 50px;
    color: white;
  }

  > img{
    width: 200px;
    height: 150px;
    object-fit: contain;
  }
`;

export const AddPostFileUploadPureBtn = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 150px;
  height: 150px;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
  -moz-opacity: 0.0;
  -khtml-opacity: 0.0;
  opacity: 0.0;

  &:hover{
    cursor: pointer;
  }
`;

export const Title = styled.div`
  color: #999999;
  font-size: 13px;
  margin: 5px 0 20px 0;
  padding-left: 0;
  word-break: break-word;
  font-weight: 300;
`;

export const RemoveBtn = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 5px;
  background-color: #fff;
  border-top: 1px solid #ced4da;
`;

export const RemoveBtnIcon = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;

  >svg{
    font-size: 13px;
    color: #2681db;
    
    &:hover{
      cursor: pointer;
    }
  }
`;

export const SetMainBtn = styled.a`
  display: flex;
  flex: 2;
  font-size: 13px;
  justify-content: flex-start;
  color: #2681db;
  text-decoration: none;

  &:hover{
    cursor: pointer;
    color: #2681db;
  }
`;

export const MainPhoto = styled.div`
  position: absolute;
  height: 20px;
  line-height: 20px;
  width: 100%;
  text-align: center;
  background-color: #2681db;
  color: #fff;
  font-size: 13px;
  top: 0;
`;

export const YoutubeVideoRemarkWrapper = styled.div`
  color: #999;
  font-size: 13px;
  font-weight: 300;
  margin-top: 5px;
`;

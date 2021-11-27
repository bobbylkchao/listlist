import styled from "styled-components";

export const LocationSectionWrapper = styled.div`
  display: flex;
`;

export const InsideLeft = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%
`;

export const InsideRight= styled.div`
  display: flex;
  width: 50%;
`;

export const MapShow = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  color: #929292;
  font-weight: 300;
  font-size: 13px;
`;

export const RemarkWrapper = styled.div`
  color: #999;
  font-size: 13px;
  font-weight: 300;
  margin-top: 5px;
`;

export const OrSpan = styled.span`
  color: #a1a1a1;
  font-weight: 300;
  font-style: italic;
  font-size: 13;
  
  &::before{
    content: " ";
  }
`;

export const GoogleMapPlaceholderWrapper = styled.div`
  position: relative;
  >button{
    width: 150px;
    height: 40px;
    position: absolute;
    top: 50%;
    top: 41%;
    z-index: 2;
    left: 30%;
    background-color: #fff;
    color: #1e78fd;
}
`;

import styled from "styled-components";

export const LocationSectionWrapper = styled.div`
  display: flex;
`;

export const InsideLeft = styled.div`
  display: flex;
  width: 60%
`;

export const InsideRight= styled.div`
  display: flex;
  width: 40%;
`;

export const MapShow = styled.div`
  width: 100%;
  height: 120px;
  margin: 0 10px;
  border-radius: 5px;
  background-color: #eeeeee;
  display: flex;
  justify-content: center;
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

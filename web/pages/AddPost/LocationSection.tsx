import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';

// listlist
import styles from './styles.module.scss';
import { regexLetterNumberSpace } from '../../src/utils';

const LocationSectionWrapper = styled.div`
  display: flex;
`;

const InsideLeft = styled.div`
  display: flex;
  width: 60%
`;

const InsideRight= styled.div`
  display: flex;
  width: 40%;
`;

const MapShow = styled.div`
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

const RemarkWrapper = styled.div`
  color: #999;
  font-size: 13px;
  font-weight: 300;
  margin-top: 5px;
`;

const OrSpan = styled.span`
  color: #a1a1a1;
  font-weight: 300;
  font-style: italic;
  font-size: 13;
  
  &::before{
    content: " ";
  }
`;

const LocationSection = () => {
  return(
    <LocationSectionWrapper>
      <InsideLeft>
        <Form.Group
          as={Row}
          className={`mb-3 ${styles.alignTopWithoutGap}`}
          controlId="addPost_contact_phonenumber"
        >
          <Form.Label column sm={3}>
            Address
            <OrSpan>or</OrSpan>
            <br/>
            Postal Code
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              maxLength="200"
              onBlur={(e: any) => e.target.value = regexLetterNumberSpace(e.target.value)}
              onDrop={(e: any) => setTimeout(() => {e.target.value = regexLetterNumberSpace(e.target.value)}, 50)}
            />
            <RemarkWrapper>Address autocomplete has not yet completed development </RemarkWrapper>
          </Col>
        </Form.Group>
      </InsideLeft>
      <InsideRight>
        <MapShow>Google Map will be here</MapShow>
      </InsideRight>
    </LocationSectionWrapper>
  );
};

export default LocationSection;

import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';

// listlist
import styles from '../styles.module.scss';
import { regexLetterNumberSpace } from '../../../src/utils';
import {
  LocationSectionWrapper,
  InsideLeft,
  InsideRight,
  MapShow,
  RemarkWrapper,
  OrSpan,
} from './styled';

// callback
const addressCallback = (value: string, params: {callback: (res: any) => void}) => {
  params.callback((previousData:any) => ({
    ...previousData,
    address: value === '' ? null : value,
  }));
};

const LocationSection = (params: {onRef: any, callback: (res: any) => void}) => {
  const [valid, setValid] = React.useState<{
    status: boolean,
    message: string,
  }>({
    status: true,
    message: '',
  });

  // create interfaces to main form component to set validation via ref
  React.useImperativeHandle(params.onRef, () => {
    return{
      valid: {
        validAddress: (valid: boolean, message?: string) => {
          setValid({
            status: valid,
            message: message ?? '',
          });
        },
      }
    }
  });

  return(
    <LocationSectionWrapper>
      <InsideLeft>
        <Form.Group
          as={Row}
          className={`mb-3 ${styles.alignTopWithoutGap}`}
          controlId="addPost_location_address"
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
              maxLength={50}
              onBlur={(e: any) => e.target.value = e.target.value.trim()}
              onChange={(e: any) => {
                if(e.target.value){
                  e.target.value = regexLetterNumberSpace(e.target.value);
                  addressCallback(e.target.value, params);
                  setValid({
                    status: true,
                    message: '',
                  });
                }else{
                  addressCallback(e.target.value, params);
                  setValid({
                    status: false,
                    message: 'Please enter a valid postal code or street address',
                  });
                }
              }}
              onDrop={(e: any) => {
                setTimeout(() => {
                  e.target.value = regexLetterNumberSpace(e.target.value);
                  addressCallback(e.target.value, params);
                }, 50);
              }}
              isInvalid={!valid.status}
            />
            <Form.Control.Feedback type="invalid">{ valid.message }</Form.Control.Feedback>
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

import React from "react";
import styled from "styled-components";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { FormCheck } from "react-bootstrap";

// listlist
import styles from './styles.module.scss';
import { priceNumberCheck } from '../../src/utils';

const PriceSectionWrapper = styled.div`
  padding-right: 10%;
`;

const PriceOptionValueWrapper = styled.div`
  display: flex;
  align-items: center;

  input{
    margin-left: 10px;
    width: 100px;
  }
`;

// callback
const priceCallback = (value: number, params: {callback: (res: any) => void}) => {
  params.callback((previousData:any) => ({
    ...previousData,
    price: value,
  }));
};

const priceValueCallback = (value: null | number, params: {callback: (res: any) => void}) => {
  params.callback((previousData:any) => ({
    ...previousData,
    price_value: value === '' || !value ? null : parseInt(value),
  }));
};

const PriceSection = (params: {onRef: any, callback: (res: any) => void}) => {
  const [currentChecked, setCurrentChecked] = React.useState<number>(1);
  const [priceValue, setPriceValue] = React.useState<number | string>('');
  const [bidStartPriceValue, setBidStartPriceValue] = React.useState<number | string>('');

  // validation
  const [valid, setValid] = React.useState<{
    status: boolean,
    message: string,
  }>({
    status: true,
    message: '',
  });

  //  create interfaces to main form component to set validation via ref
  React.useImperativeHandle(params.onRef, () => {
    return{
      valid: {
        validPrice: (status: boolean, message?: string) => {
          setValid({
            status: status,
            message: message ?? '',
          });
        }
      }
    }
  });

  return(
    <PriceSectionWrapper>
      <fieldset>
        <Form.Group as={Row} className={`mb-3 ${styles.alignTopWithoutGap}`}>
          <Form.Label as="legend" column sm={3} style={{paddingTop: 5}}>
            Price
          </Form.Label>
          <Col sm={9}>

            {/**option: price */}
            <FormCheck style={{marginBottom: 20}}>
              <FormCheck.Input
                type="radio"
                name="addPost_price_option"
                id="addPost_price_option_1"
                value={1}
                checked={currentChecked === 1 ? true : false}
                onChange={(e: any) => {
                  if(e.target.checked && currentChecked !== 1){
                    setCurrentChecked(1);
                    setPriceValue('');
                    setBidStartPriceValue('');
                    priceCallback(1, params);
                    priceValueCallback(null, params);
                  }
                }}
                
              />
              <PriceOptionValueWrapper>
                <FormCheck.Label>$</FormCheck.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  name="addPost_price_value"
                  value={priceValue}
                  onChange={(e:any) => {
                    const value = priceNumberCheck(e.target.value);
                    setPriceValue(value);
                    if(value === 0 || value === "0"){
                      priceValueCallback(null, params);
                      setValid({
                        status: false,
                        message: 'Price cannot be 0',
                      });
                    }else{
                      priceValueCallback(value, params);
                      setValid({
                        status: true,
                        message: '',
                      });
                    }
                  }}
                  disabled={currentChecked === 1 ? false : true}
                  isInvalid={!valid.status && currentChecked === 1}
                />
                <Form.Control.Feedback type="invalid" style={{marginLeft: 10}}>{ valid.message }</Form.Control.Feedback>
              </PriceOptionValueWrapper>
            </FormCheck>
            
            {/**option: bid */}
            <FormCheck style={{marginBottom: 10}}>
              <FormCheck.Input
                type="radio"
                name="addPost_price_option"
                id="addPost_price_option_2"
                value={2}
                checked={currentChecked === 2 ? true : false}
                onChange={(e: any) => {
                  if(e.target.checked && currentChecked !== 2){
                    setCurrentChecked(2);
                    setPriceValue('');
                    setBidStartPriceValue('');
                    priceCallback(2, params);
                    priceValueCallback(null, params);
                  }
                }}
              />
              <PriceOptionValueWrapper>
                <FormCheck.Label
                  style={{cursor: 'default'}}
                  onClick={() => {
                    if(currentChecked !== 2){
                      setCurrentChecked(2);
                      setPriceValue('');
                      setBidStartPriceValue('');
                      priceCallback(2, params);
                      priceValueCallback(null, params);
                    }
                  }}
                >Bid, starting from $</FormCheck.Label>
                <Form.Control
                  type="text"
                  name="addPost_price_bidstartfrom"
                  value={bidStartPriceValue}
                  onChange={(e:any) => {
                    const value = priceNumberCheck(e.target.value);
                    setBidStartPriceValue(value);
                    if(value === 0 || value === "0"){
                      priceValueCallback(null, params);
                      setValid({
                        status: false,
                        message: 'Price cannot be 0',
                      });
                    }else{
                      priceValueCallback(value, params);
                      setValid({
                        status: true,
                        message: '',
                      });
                    }
                  }}
                  disabled={currentChecked === 2 ? false : true}
                  isInvalid={!valid.status && currentChecked === 2}
                />
                <Form.Control.Feedback type="invalid" style={{marginLeft: 10}}>{ valid.message }</Form.Control.Feedback>
              </PriceOptionValueWrapper>
            </FormCheck>

            {/**option: contact */}
            <FormCheck style={{marginBottom: 10}}>
              <FormCheck.Input
                type="radio"
                name="addPost_price_option"
                id="addPost_price_option_3"
                value={3}
                checked={currentChecked === 3 ? true : false}
                onChange={(e: any) => {
                  if(e.target.checked && currentChecked !== 3){
                    setCurrentChecked(3);
                    setPriceValue('');
                    setBidStartPriceValue('');
                    priceCallback(3, params);
                    priceValueCallback(null, params);
                  }
                }}
                
              />
              <FormCheck.Label
                onClick={() => {
                  if(currentChecked !== 3){
                    setCurrentChecked(3);
                    setPriceValue('');
                    setBidStartPriceValue('');
                    priceCallback(3, params);
                    priceValueCallback(null, params);
                  }
                }}
              >Please Contact</FormCheck.Label>
            </FormCheck>

            {/**option: swap/trade */}
            <FormCheck style={{marginBottom: 10}}>
              <FormCheck.Input
                type="radio"
                name="addPost_price_option"
                id="addPost_price_option_4"
                value={4}
                checked={currentChecked === 4 ? true : false}
                onChange={(e: any) => {
                  if(e.target.checked && currentChecked !== 4){
                    setCurrentChecked(4);
                    setPriceValue('');
                    setBidStartPriceValue('');
                    priceCallback(4, params);
                    priceValueCallback(null, params);
                  }
                }}
                
              />
              <FormCheck.Label
                onClick={() => {
                  if(currentChecked !== 4){
                    setCurrentChecked(4);
                    setPriceValue('');
                    setBidStartPriceValue('');
                    priceCallback(4, params);
                    priceValueCallback(null, params);
                  }
                }}
              >Swap/Trade</FormCheck.Label>
            </FormCheck>

             {/**option: free */}
            <FormCheck style={{marginBottom: 10}}>
              <FormCheck.Input
                type="radio"
                name="addPost_price_option"
                id="addPost_price_option_5"
                value={5}
                checked={currentChecked === 5 ? true : false}
                onChange={(e: any) => {
                  if(e.target.checked && currentChecked !== 5){
                    setCurrentChecked(5);
                    setPriceValue('');
                    setBidStartPriceValue('');
                    priceCallback(5, params);
                    priceValueCallback(null, params);
                  }
                }}
                
              />
              <FormCheck.Label
                onClick={() => {
                  if(currentChecked !== 5){
                    setCurrentChecked(5);
                    setPriceValue('');
                    setBidStartPriceValue('');
                    priceCallback(5, params);
                    priceValueCallback(null, params);
                  }
                }}
              >Free</FormCheck.Label>
            </FormCheck>

          </Col>
        </Form.Group>
      </fieldset>
    </PriceSectionWrapper>
  );
};

export default PriceSection;

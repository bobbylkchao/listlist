import React from "react";
import styled from "styled-components";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { FormCheck } from "react-bootstrap";

// listlist
import styles from './styles.module.scss';

const PriceSectionWrapper = styled.div`
  padding-right: 10%;
`;

const PriceOptionValueWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;

  input{
    margin-left: 10px;
    width: 100px;
  }
`;

const PriceSection = () => {
  const [currentChecked, setCurrentChecked] = React.useState<number>(1);

  return(
    <PriceSectionWrapper>
      <fieldset>
        <Form.Group as={Row} className={`mb-3 ${styles.alignTopWithoutGap}`}>
          <Form.Label as="legend" column sm={3} style={{paddingTop: 5}}>
            Price
          </Form.Label>
          <Col sm={9}>

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
                  }
                }}
              />
              <PriceOptionValueWrapper>
                <span>$</span>
                <Form.Control
                  type="number"
                  placeholder=""
                  name="addPost_price_value"
                  disabled={currentChecked === 1 ? false : true}
                />
              </PriceOptionValueWrapper>
            </FormCheck>

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
                  }
                }}
              />
              <PriceOptionValueWrapper>
                <span
                  style={{cursor: 'default'}}
                  onClick={() => {
                    if(currentChecked !== 2){
                      setCurrentChecked(2);
                    }
                  }}
                >Bid, starting from $</span>
                <Form.Control
                  type="number"
                  placeholder=""
                  name="addPost_price_bidstartfrom"
                  disabled={currentChecked === 2 ? false : true}
                />
              </PriceOptionValueWrapper>
            </FormCheck>

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
                  }
                }}
              />
              <FormCheck.Label
                onClick={() => {
                  if(currentChecked !== 3){
                    setCurrentChecked(3);
                  }
                }}
              >Please Contact</FormCheck.Label>
            </FormCheck>

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
                  }
                }}
              />
              <FormCheck.Label
                onClick={() => {
                  if(currentChecked !== 4){
                    setCurrentChecked(4);
                  }
                }}
              >Swap/Trade</FormCheck.Label>
            </FormCheck>

          </Col>
        </Form.Group>
      </fieldset>
    </PriceSectionWrapper>
  );
};

export default PriceSection;

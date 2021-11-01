import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';

// listlist
import styles from './styles.module.scss';
import Button from '../../src/components/Button';
import Link from '../../src/components/Link';

const AdDetailsSectionWrapper = styled.div`
  padding-right: 10%;
`;

const Gap = styled.div`
  height: 10px;
`;

const AdDetailsSection = () => {
  return(
    <AdDetailsSectionWrapper>
      {/**category */}
      <Form.Group as={Row} className="mb-3" controlId="addPost_category">
        <Form.Label column sm={3}>
          Select Category
        </Form.Label>
        <Col sm={9} className={styles.add_post_form_category_flex}>
          <span>Buy & Sell</span>
          <span>></span>
          <span>Clothing</span>
          <Link>Change category</Link>
        </Col>
      </Form.Group>

      <Gap/>

      {/**ad title */}
      <Form.Group as={Row} className="mb-3" controlId="addPost_adtitle">
        <Form.Label column sm={3}>
          Ad title
        </Form.Label>
        <Col sm={9}>
          <Form.Control type="text" placeholder="" />
        </Col>
      </Form.Group>

      <Gap/>

      {/**ad type */}
      <fieldset>
        <Form.Group as={Row} className="mb-3">
          <Form.Label as="legend" column sm={3}>
            Ad Type
          </Form.Label>
          <Col sm={9} className={styles.add_post_form_adtype}>
            <Form.Check
              type="radio"
              label="I'm offering"
              name="addPost_adtype"
              id="addPost_adtype_offering"
            />
            <Form.Check
              type="radio"
              label="I want to find"
              name="addPost_adtype"
              id="addPost_adtype_buy"
            />
          </Col>
        </Form.Group>
      </fieldset>
      
      <Gap/>

      {/**for sale by */}
      <fieldset>
        <Form.Group as={Row} className="mb-3">
          <Form.Label as="legend" column sm={3}>
            For Sale By
          </Form.Label>
          <Col sm={9}>
            <Form.Check
              type="radio"
              label="Owner"
              name="addPost_forsaleby"
              id="addPost_forsaleby_owner"
            />
            <Form.Check
              type="radio"
              label="Business"
              name="addPost_forsaleby"
              id="addPost_forsaleby_business"
            />
          </Col>
        </Form.Group>
      </fieldset>

      <Gap/>

      {/**description */}
      <Form.Group as={Row} className="mb-3" controlId="addPost_description">
        <Form.Label column sm={3}>
          Description
        </Form.Label>
        <Col sm={9}>
          <Form.Control as="textarea" type="text" placeholder="" size="lg" style={{height: 180}}/>
        </Col>
      </Form.Group>

      <Gap/>

      {/**fulfillment */}
      <fieldset>
        <Form.Group as={Row} className="mb-3">
          <Form.Label as="legend" column sm={3}>
            <div>Fulfillment</div>
            <div className={styles.add_post_form_optional_title}>(optional)</div>
          </Form.Label>
          <Col
            sm={9}
            className={styles.add_post_form_row_v_center}
          >
            <Form.Check
              type="checkbox"
              label="Willing to drop-off / deliver"
              name="addPost_fulfillment"
              id="addPost_fulfillment_1"
            />
            <Form.Check
              type="checkbox"
              label="Willing to ship the item"
              name="addPost_fulfillment"
              id="addPost_fulfillment_2"
            />
            <Form.Check
              type="checkbox"
              label="Offer curbside pick up"
              name="addPost_fulfillment"
              id="addPost_fulfillment_3"
            />
          </Col>
        </Form.Group>
      </fieldset>

      <Gap/>

      {/**payment */}
      <fieldset>
        <Form.Group as={Row} className="mb-3">
          <Form.Label as="legend" column sm={3}>
            <div>Payment</div>
            <div className={styles.add_post_form_optional_title}>(optional)</div>
          </Form.Label>
          <Col
            sm={9}
            className={styles.add_post_form_row_v_center}
          >
            <Form.Check
              type="checkbox"
              label="Offer cashless payment"
              name="addPost_payment"
              id="addPost_payment"
            />
          </Col>
        </Form.Group>
      </fieldset>

      <Gap/>

      {/**condition */}
      <Form.Group as={Row} className="mb-3" controlId="addPost_condition">
        <Form.Label column sm={3}>
          <div>Condition</div>
          <div className={styles.add_post_form_optional_title}>(optional)</div>
        </Form.Label>
        <Col
          sm={9}
          className={styles.add_post_form_row_v_center}
        >
          <Form.Control
            as="select"
            style={{ width: 180 }}
          >
            <option>- Select -</option>
            <option value="1">New</option>
            <option value="2">Used - Like new</option>
            <option value="3">Used - Good</option>
            <option value="4">Used - Fair</option>
          </Form.Control>
        </Col>
      </Form.Group>

      <Gap/>

      {/**tags */}
      <Form.Group as={Row} className="mb-3" controlId="addPost_tags">
        <Form.Label column sm={3}>
          <div>Tags</div>
          <div className={styles.add_post_form_optional_title}>(optional)</div>
        </Form.Label>
        <Col sm={9}>
          <div className={styles.add_post_form_tags_remark}>
            Increase your ad exposure. Enter up to 5 keywords someone could search to find your ad.
          </div>
          <Row>
            <Col xs="auto">
              <Form.Control type="text" placeholder="" />
            </Col>
            <Col xs="auto">
              <Button
                height="100%"
                width="60px"
              >
                Add
              </Button>
            </Col>
          </Row>
        </Col>
      </Form.Group>  

    </AdDetailsSectionWrapper>
  );
};

export default AdDetailsSection;

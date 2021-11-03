import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import styled from "styled-components";
import { useSelector } from "react-redux";

// listlist
import styles from "./styles.module.scss";
import { phonNumberTransform } from "../../src/utils";

const ContactSectionWrapper = styled.div`
  padding-right: 10%;
`;

const RemarkWrapper = styled.div`
  color: #999;
  font-size: 13px;
  font-weight: 300;
  margin-top: 5px;
`;

const ContactSection = () => {
  const userReducerState = useSelector((state:any) => state.userAuth.state);

  return(
    <ContactSectionWrapper>
      <Form.Group
        as={Row}
        className={`mb-3 ${styles.alignTopWithoutGap}`}
        controlId="addPost_contact_phonenumber"
      >
        <Form.Label column sm={3}>
          <div>Phone Number</div>
          <div className={styles.add_post_form_optional_title}>(optional)</div>
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="text"
            maxLength="12"
            onKeyUp={(e: any) => e.target.value = phonNumberTransform(e.target.value)}
            onDrop={(e: any) => setTimeout(() => {e.target.value = phonNumberTransform(e.target.value)}, 50)}
          />
          <RemarkWrapper>Your phone number will show up on your Ad.</RemarkWrapper>
        </Col>
      </Form.Group>

      <Form.Group
        as={Row}
        className={`mb-3 ${styles.alignTopWithoutGap}`}
        controlId="addPost_contact_email"
      >
        <Form.Label column sm={3}>
          Email
        </Form.Label>
        <Col sm={9}>
          <Form.Control type="email" value={userReducerState.email} readOnly={true}/>
          <RemarkWrapper>Your email address will not be shared with others.</RemarkWrapper>
        </Col>
      </Form.Group>

    </ContactSectionWrapper>
  );
};

export default ContactSection;

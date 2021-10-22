import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from 'react-bootstrap/Form';

import styles from "./styles.module.scss";
import Button from "../../src/components/Button";
import { H3 } from "../../src/components/Heading";
import Link from "../../src/components/Link";

const LeftFormWrapper = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
  padding-right: 3%;
`;

const BottomDiv = styled.div`
  margin: 10px 0;
  font-size: 13px;
  text-align: center;
  color: gray;
`;

const ForgotPwdWrapper = styled.div`
  margin-bottom: 10px;
`;

const LeftForm = () => {
  const [validated, setValidated] = React.useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  return(
    <LeftFormWrapper>
      <H3 style={{ marginBottom: 20 }}>Login</H3>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className={styles.login_form}
      >

        <Form.Group className="mb-3" controlId="email">
          <FontAwesomeIcon icon="envelope"/>
          <Form.Control type="email" placeholder="Email" className={styles.loginInput} required/>
          <Form.Control.Feedback type="invalid">Please enter email.</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <FontAwesomeIcon icon="lock"/>
          <Form.Control type="password" placeholder="Password" className={styles.loginInput} required/>
          <Form.Control.Feedback type="invalid">Please enter password.</Form.Control.Feedback>
        </Form.Group>

        <ForgotPwdWrapper>
          <Link href="#">Forgot password?</Link>
        </ForgotPwdWrapper>

        <Button
          height="40px"
          width="100%"
          fontWeight="bold"
          type="submit"
        >
          Sign In
        </Button>
      </Form>
    </LeftFormWrapper>
  );
};

export default LeftForm;

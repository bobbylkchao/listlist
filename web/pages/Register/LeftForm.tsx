import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Link from "../../src/components/Link";

import styles from "./styles.module.scss";

const LeftFormWrapper = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
`;

const FormTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  color: #0d6efd;
  margin-bottom: 20px;
`;

const BottomDiv = styled.div`
  margin: 10px 0;
  font-size: 13px;
  text-align: center;
  color: gray;
`;

const LeftForm = () => {
  return(
    <LeftFormWrapper>
      <FormTitle>Register</FormTitle>
      <Form className={styles.register_form}>
        <Form.Group className="mb-3" controlId="name">
          <FontAwesomeIcon icon="user"/>
          <Form.Control type="text" placeholder="Name"/>
          <Form.Text className="text-muted">
            Your name will be displayed on your public profile.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <FontAwesomeIcon icon="envelope"/>
          <Form.Control type="email" placeholder="Email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <FontAwesomeIcon icon="lock"/>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="passwordReenter">
          <FontAwesomeIcon icon="lock"/>
          <Form.Control type="password" placeholder="Re-enter Password" />
        </Form.Group>

        <BottomDiv>
          By clicking Register, you agree to our <Link>Terms of Use</Link> and <Link>Privacy Policy</Link>
        </BottomDiv>

        <Button variant="primary" type="submit" className={styles.form_submit_button}>
          Create Account
        </Button>
      </Form>
    </LeftFormWrapper>
  );
};

export default LeftForm;

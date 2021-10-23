import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

import styles from "./styles.module.scss";
import Button from "../../src/components/Button";
import Link from "../../src/components/Link";
import { H3 } from "../../src/components/Heading";
import { emailValidation, usernameValidation, passwordValidation, passwordRepeatValidation } from "../../src/utils";
import { userRegisterReq } from "../../src/data-request";

const LeftFormWrapper = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
  padding-right: 3%;
`;

const BottomDiv = styled.div`
  margin: 20px 0;
  font-size: 13px;
  text-align: center;
  color: gray;
`;

const LeftForm = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [alertInfos, setAlertInfos] = React.useState({
    variant: '',
    message: '',
    visible: false,
  });
  const [formValid, setFormValid] = React.useState({
    name: {
      value: '',
      isInvalid: false,
      message: '',
    },
    email: {
      value: '',
      isInvalid: false,
      message: '',
    },
    password: {
      value: '',
      isInvalid: false,
      message: '',
    },
    password_repeat: {
      value: '',
      isInvalid: false,
      message: '',
    },
  });

  const handleValidition = (event) => {
    const vaildName = usernameValidation(name);
    if(!vaildName.status){
      setAlertInfos({ variant: 'warning', message: vaildName.message, visible: true });
      return;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    /**
     * Validation Check
     */
    for(const formValidItem in formValid){
      if(formValid[formValidItem].isInvalid) return;
      if(!formValid[formValidItem].value){
        if(formValidItem === 'name'){
          setFormValid(prevState => ({
            ...prevState,
            name: {
              isInvalid: true,
              message: 'Please enter the name',
            },
          }));
        }

        if(formValidItem === 'email'){
          setFormValid(prevState => ({
            ...prevState,
            email: {
              isInvalid: true,
              message: 'Please enter the email',
            },
          }));
        }

        if(formValidItem === 'password'){
          setFormValid(prevState => ({
            ...prevState,
            password: {
              isInvalid: true,
              message: 'Please enter the password',
            },
          }));
        }

        if(formValidItem === 'password_repeat'){
          setFormValid(prevState => ({
            ...prevState,
            password_repeat: {
              isInvalid: true,
              message: 'Please re-enter the password',
            },
          }));
        }
        return;
      }
    }

    const name = event.currentTarget.elements.name.value;
    const email = event.currentTarget.elements.email.value;
    const password = event.currentTarget.elements.password.value;

    userRegisterReq({
      email: email,
      name: name,
      password: password
    },(result: { id: any, error: any }) => {
      setIsSubmitting(false);
      if(result.error){
        setAlertInfos({ variant: 'warning', message: result.error, visible: true });
      }else{
        // LISTLIST-TODO: login, jwtToken, redirect to from page or profile page.
        setAlertInfos({ variant: 'success', message: `Registration success, User ID is ${result.id}`, visible: true });
      }
    });
  };

  return(
    <LeftFormWrapper>
      <H3 style={{ marginBottom: 20 }}>Register</H3>
      <Alert
        variant={alertInfos.variant}
        show={alertInfos.visible}
        transition={false}
      >
        <FontAwesomeIcon icon="exclamation-circle"/>&nbsp;&nbsp;{ alertInfos.message }
      </Alert>
      <Form
        noValidate
        onSubmit={!isSubmitting ? handleSubmit : null}
        className={styles.register_form}
      >
        <Form.Group className="mb-3">
          <FontAwesomeIcon icon="user"/>
          <Form.Control
            onBlur={(e:any) => {
              const valid = usernameValidation(e.target.value);
              setFormValid(prevState => ({
                ...prevState,
                name: {
                  value: e.target.value,
                  isInvalid: !valid.status,
                  message: valid.message,
                },
              }));
            }}
            type="text"
            name="name"
            placeholder="Name"
            isInvalid={formValid.name.isInvalid}
            autoComplete="off"
            required
          />
          <Form.Text className="text-muted">
            Your name will be displayed on your public profile.
          </Form.Text>
          <Form.Control.Feedback type="invalid">{formValid.name.message}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <FontAwesomeIcon icon="envelope"/>
          <Form.Control
            onBlur={(e:any) => {
              const valid = emailValidation(e.target.value);
              setFormValid(prevState => ({
                ...prevState,
                email: {
                  value: e.target.value,
                  isInvalid: !valid.status,
                  message: valid.message,
                },
              }));
            }}
            type="email"
            name="email"
            placeholder="Email"
            isInvalid={formValid.email.isInvalid}
            autoComplete="off"
            required
          />
          <Form.Control.Feedback type="invalid">{formValid.email.message}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <FontAwesomeIcon icon="lock"/>
          <Form.Control
            onBlur={(e:any) => {
              const valid = passwordValidation(e.target.value);
              setFormValid(prevState => ({
                ...prevState,
                password: {
                  value: e.target.value,
                  isInvalid: !valid.status,
                  message: valid.message,
                },
              }));
            }}
            type="password"
            name="password"
            placeholder="Password"
            isInvalid={formValid.password.isInvalid}
            autoComplete="off"
            required
          />
          <Form.Control.Feedback type="invalid">{formValid.password.message}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <FontAwesomeIcon icon="lock"/>
          <Form.Control
            onBlur={(e:any) => {
              const valid = passwordRepeatValidation(formValid.password.value, e.target.value);
              setFormValid(prevState => ({
                ...prevState,
                password_repeat: {
                  value: e.target.value,
                  isInvalid: !valid.status,
                  message: valid.message,
                },
              }));
            }}
            type="password"
            name="password_repeat"
            placeholder="Re-enter Password"
            isInvalid={formValid.password_repeat.isInvalid}
            autoComplete="off"
            required
          />
          <Form.Control.Feedback type="invalid">{formValid.password_repeat.message}</Form.Control.Feedback>
        </Form.Group>

        <BottomDiv>
          {/*LISTLIST-TODO: create terms of use and privacy policy pages*/}
          By clicking Register, you agree to our <Link>Terms of Use</Link> and <Link>Privacy Policy</Link>
        </BottomDiv>

        <Button
          height="40px"
          width="100%"
          fontWeight="bold"
          type="submit"
          disabled={isSubmitting}
        >
          { isSubmitting ? 'Submitting...' : 'Create Account' }
        </Button>
      </Form>
    </LeftFormWrapper>
  );
};

export default LeftForm;

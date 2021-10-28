import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import styles from "./styles.module.scss";
import Button from "../../src/components/Button";
import { H3 } from "../../src/components/Heading";
import Link from "../../src/components/Link";
import { emailValidation, passwordValidation, userAuthLSInfos } from "../../src/utils";
import { userLoginReq } from "../../src/data-request";

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
  const reduxDispatch = useDispatch();
  const router = useHistory();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [alertInfos, setAlertInfos] = React.useState({
    variant: '',
    message: '',
    visible: false,
  });
  const [formValid, setFormValid] = React.useState({
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

        return;
      }
    }

    const email = event.currentTarget.elements.email.value;
    const password = event.currentTarget.elements.password.value;

    setIsSubmitting(true);
    userLoginReq({
      email: email,
      password: password,
    }, (result: any) => {
      if(result.errors){
        setAlertInfos({ variant: 'danger', message: `Oops! Something went wrong, please try again later. (${result.errors[0] ? result.errors[0].message : '' })`, visible: true });
      }else{
        if(result.data.auth.code === 200){
          const resUserInfos = JSON.parse(result.data.auth.message);
         
          userAuthLSInfos.set({
            executed: true,
            auth: true,
            token: result.data.auth.token,
            name: resUserInfos.name,
            email: resUserInfos.email,
            userID: resUserInfos.userID,
            headnav: resUserInfos.headnav,
            createdAt: resUserInfos.createdAt,
            reduxDispatch: reduxDispatch,
          });

          reduxDispatch({
            type: "setGlobalNoticeMessage",
            value: {
              'type': 'success',
              'message': 'You\'ve successfully signed into ListList.',
            }
          });

          setTimeout(() => {
            setIsSubmitting(false);
            router.replace("/m-profile");
          }, 500);

        }else{
          setAlertInfos({ variant: 'warning', message: result.data.auth.message, visible: true });
        }
      }

      setIsSubmitting(false);

    });
  };

  return(
    <LeftFormWrapper>
      <H3 style={{ marginBottom: 20 }}>Login</H3>
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
        className={styles.login_form}
      >

        <Form.Group className="mb-3" controlId="email">
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
            onKeyDown={(e:any) => {
              if(e.keyCode === 13) {
                const valid = emailValidation(e.target.value);
                setFormValid(prevState => ({
                  ...prevState,
                  email: {
                    value: e.target.value,
                    isInvalid: !valid.status,
                    message: valid.message,
                  },
                }));
              }
            }}
            type="email"
            placeholder="Email"
            className={styles.loginInput}
            isInvalid={formValid.email.isInvalid}
            autoComplete="off"
            required
          />
          <Form.Control.Feedback type="invalid">{formValid.email.message}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
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
            onKeyDown={(e:any) => {
              if(e.keyCode === 13) {
                const valid = passwordValidation(e.target.value);
                setFormValid(prevState => ({
                  ...prevState,
                  password: {
                    value: e.target.value,
                    isInvalid: !valid.status,
                    message: valid.message,
                  },
                }));
              }
            }}
            type="password"
            placeholder="Password"
            className={styles.loginInput}
            isInvalid={formValid.password.isInvalid}
            autoComplete="new-password"
            required
          />
          <Form.Control.Feedback type="invalid">{formValid.password.message}</Form.Control.Feedback>
        </Form.Group>

        <ForgotPwdWrapper>
          <Link href="#">Forgot password?</Link>
        </ForgotPwdWrapper>

        <Button
          height="40px"
          width="100%"
          fontWeight="bold"
          type="submit"
          disabled={isSubmitting}
        >
          { isSubmitting ? 'Processing...' : 'Sign In' }
        </Button>

      </Form>
    </LeftFormWrapper>
  );
};

export default LeftForm;

import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

// 3rd login
import GoogleLogin from "react-google-login";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

// listlist
import config from "../../src/web.config";
import styles from "./styles.module.scss";
import Button from "../../src/components/Button";
import { H3 } from "../../src/components/Heading";
import Link from "../../src/components/Link";
import { emailValidation, passwordValidation, userAuthLSInfos, getQueryVariable } from "../../src/utils";
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

const OthersLoginWrapper = styled.div`
  border-top: 1px solid #ececec;
  margin-top: 30px;
  padding-top: 30px;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
`;

const FacebookBtn = styled.a`
  display: flex;
  height: 40px;
  text-decoration: none;
  justify-content: center;
  align-items: center;
  background-color: #0070cc;
  color: #fff;
  font-size: 14px;
  border-radius: 5px;
  font-weight: 500;
  padding: 0 10px;
  margin-left: 20px;

  >span{
    margin-left: 15px;
  }

  &:hover{
    text-decoration: none;
    color: #fff;
    cursor: pointer;
  }
`;

const LeftForm = () => {
  const fromWhichPage = getQueryVariable("from");
  const reduxDispatch = useDispatch();
  const router = useHistory();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [alertInfos, setAlertInfos] = React.useState({
    variant: '',
    message: '',
    visible: false,
  });
  const [formValid, setFormValid] = React.useState<{
    [key: string]: {
      value?: string,
      isInvalid: boolean,
      message: string,
    }
  }>({
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

  const handleSubmit = (event:any, othersLogin?: {from: string, email: string, name: string, headnav: string, channelID: string}) => {
    let email = "";
    let password = "";
    let channel = "listlist";
    let channelName = "";
    let channelHeadNav = "";
    let channelID = "";

    if(othersLogin){
      
      channel = othersLogin.from;
      email = othersLogin.email;
      channelName = othersLogin.name;
      channelHeadNav = othersLogin.headnav;
      channelID = othersLogin.channelID;

    }else{
      /**
       * LISTLIST WEB LOGIN LOGICS
       */
      event.preventDefault();
      event.stopPropagation();
  
      /**
       * Validation Check
       */
      let formValidItem: string;
      for(formValidItem in formValid){
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
  
      email = event.currentTarget.elements.email.value;
      password = event.currentTarget.elements.password.value;
    }

    setIsSubmitting(true);
    userLoginReq({
      email: email,
      password: password,
      channel: channel,
      channelName: channelName,
      channelHeadNav: channelHeadNav,
      channelID: channelID,
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
            fromWhichPage ? router.replace(fromWhichPage) : router.replace("/m-profile");
          }, 500);

        }else{
          setAlertInfos({ variant: 'warning', message: result.data.auth.message, visible: true });
        }
      }

      setIsSubmitting(false);

    });
  };

  const responseGoogle = (res: any) => {
    if(res.profileObj){
      handleSubmit(null, {
        from: 'google',
        email: res.profileObj.email,
        name: res.profileObj.name,
        headnav: res.profileObj.imageUrl ?? 'default',
        channelID: res.profileObj.googleId,
      });
    }
  };

  const responseFacebook = (res:any) => {
    if(res){
      handleSubmit(null, {
        from: 'facebook',
        email: res.email,
        name: res.name,
        headnav: res.picture.data.url ?? 'default',
        channelID: res.userID,
      });
    }
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
        onSubmit={!isSubmitting ? handleSubmit : () => {}}
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

      <OthersLoginWrapper>
        <GoogleLogin
          clientId={config.googleLoginClientID}
          onSuccess={responseGoogle}
          onFailure={(res: any) => {
            console.error(res);
          }}
          cookiePolicy={'single_host_origin'}
          style={{
            borderRadius: 5
          }}
        />
        
        <FacebookLogin
          appId={config.facebookAppID}
          autoLoad={false}
          fields="name,email,picture"
          icon="fa-facebook"
          callback={responseFacebook}
          render={(renderProps:any) => (
            <FacebookBtn onClick={renderProps.onClick}>
              <FontAwesomeIcon icon={['fab', 'facebook-f']} />
              <span>Sign in with Facebook</span>
            </FacebookBtn>
          )}
        />
      </OthersLoginWrapper>

    </LeftFormWrapper>
  );
};

export default LeftForm;

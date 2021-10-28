import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "react-bootstrap/Form";
import styles from "./styles.module.scss";

// listlist
import AuthorizedWrapper from "../../src/components/AuthorizedWrapper";
import InsideWrapper from "../../src/containers/InsideWrapper";
import TopMenus from "../../src/components/TopMenus";
import Hline from "../../src/components/Hline";
import Link from "../../src/components/Link";
import GlobalNoticeMsg from "../../src/components/GlobalNoticeMsg";

const AddPostWrapper = styled.div`
  background-color: yelow;
`;

const AddPostPage = () => {
  const getUserAuthState = useSelector((state:any) => state.userAuth.state);
  const router = useHistory();
  const location = useLocation();

  React.useEffect(() => {
    // If it is not authorized, then redirect to login page
    if(getUserAuthState){
      if(!getUserAuthState.auth){
        // Set 100 ms to avoid routing crossover issue (execute too fast, the URL is not changed)
        setTimeout(() => {
          router.replace({
            pathname: "/login",
            search: `?from=${encodeURIComponent(location.pathname)}`,
          });
        }, 100);
      }
    }
  }, [getUserAuthState]);

  return(
    <AuthorizedWrapper>
      <InsideWrapper>
        <TopMenus marginTop={15}/>
      </InsideWrapper>
      <Hline marginTop="15px" marginBottom="15px"/>
      <InsideWrapper style={{ minHeight: 500 }}>
        <GlobalNoticeMsg />
        <h2>Add POST Page</h2>

        <Form
          noValidate
          onSubmit={() => console.log(1)}
          className={styles.add_post_form}
        >
          <Form.Group className="mb-3" controlId="email">
            <FontAwesomeIcon icon="envelope"/>
            <Form.Control
              onBlur={(e:any) => {
                
              }}
              onKeyDown={(e:any) => {
                if(e.keyCode === 13) {
                  
                }
              }}
              type="email"
              placeholder="Email"
              className={styles.Input}
              autoComplete="off"
              required
            />
            <Form.Control.Feedback type="invalid">{}</Form.Control.Feedback>
          </Form.Group>
        </Form>

      </InsideWrapper>
    </AuthorizedWrapper>
  );
};

export default AddPostPage;

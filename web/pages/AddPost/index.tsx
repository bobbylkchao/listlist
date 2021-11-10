import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "react-bootstrap/Form";
import styles from "./styles.module.scss";

// listlist
import GrayBgWrapper from "../../src/containers/GrayBgWrapper";
import AuthorizedWrapper from "../../src/components/AuthorizedWrapper";
import InsideWrapper from "../../src/containers/InsideWrapper";
import TopMenus from "../../src/components/TopMenus";
import Hline from "../../src/components/Hline";
import Link from "../../src/components/Link";
import GlobalNoticeMsg from "../../src/components/GlobalNoticeMsg";
import Button from "../../src/components/Button";

// each section component
import SectionComponent from "./SectionComponent";
import AdDetailsSection from "./AdDetailsSection";
import MediaSection from "./MediaSection";
import LocationSection from "./LocationSection";
import PriceSection from "./PriceSection";
import ContactSection from "./ContactSection";

const PageTitle = styled.h2`
  font-size: 15px;
`;

const BottomBtnsWrapper = styled.div`
  padding-bottom: 50px;
`;

const AgreementWrapper = styled.div`
  margin: 20px 0;
  font-size: 13px;
  color: gray;
  font-weight: 300;
`;

const AddPostPage = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formData, setFormData] = React.useState<{
    userID: null | number,
    categoryID: null | number,
    adtype: number,
    forsaleby:number,
    title: null | string,
    description: null | string,
    price: null | number,
    price_value: null | number,
    address: null | string,
    fulfillment: null | number,
    cashless_pay: null | number,
    condition: null | number,
    tags: null | string,
    youtube: null | string,
    websitelink: null | string,
    phonenumber: null | number,
    uploadImages: null | [{
      img: string,
      main: boolean,
    }],
  }>({
    userID: null,
    categoryID: null,
    adtype: 1,
    forsaleby: 1,
    title: null,
    description: null,
    price: null,
    price_value: null,
    address: null,
    fulfillment: null,
    cashless_pay: null,
    condition: null,
    tags: null,
    youtube: null,
    websitelink: null,
    phonenumber: null,
    uploadImages: null,
  })
  
  const handleSubmit = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    alert('submitted...');
  };

  return(
    <GrayBgWrapper>
      <AuthorizedWrapper>
        <Hline marginTop="15px" marginBottom="15px"/>
        <InsideWrapper
          bgcolor="#000"
          style={{ maxWidth: 900 }}
        >
          <GlobalNoticeMsg />

          {
            JSON.stringify(formData)
          }

          <Form
            noValidate
            onSubmit={!isSubmitting ? handleSubmit : null}
            className={styles.add_post_form}
          >
            <SectionComponent no={1} title="Ad Details">
              <AdDetailsSection callback={setFormData}/>
            </SectionComponent>
            
            <SectionComponent no={2} title="Media">
              <MediaSection/>
            </SectionComponent>

            <SectionComponent no={3} title="Location">
              <LocationSection/>
            </SectionComponent>

            <SectionComponent no={4} title="Price">
              <PriceSection/>
            </SectionComponent>

            <SectionComponent no={5} title="Contact Information">
              <ContactSection/>
            </SectionComponent>

            <AgreementWrapper>
              <div>By posting your ad, you are agreeing to our <Link>terms of use</Link>, <Link>privacy policy</Link> and <Link>site policies</Link>.</div>
              <div>Please do not post duplicate ads.</div>
            </AgreementWrapper>

            <BottomBtnsWrapper>
              <Button
                height="40px"
                width="150px"
                fontWeight="bold"
                type="submit"
                style={{ marginRight: 20}}
              >
                Post Your Ad
              </Button>

              <Button
                height="40px"
                width="150px"
                bgColor="#ffffff"
                color="#006bc2"
              >
                Preview
              </Button>
            </BottomBtnsWrapper>
          </Form>

        </InsideWrapper>
      </AuthorizedWrapper>
    </GrayBgWrapper>
  );
};

export default AddPostPage;

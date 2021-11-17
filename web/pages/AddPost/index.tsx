import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
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
import { scrollToTop, scrollToEle, priceNumberCheck, urlValidation } from "../../src/utils";
import { submitAddPost } from "../../src/data-request";

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
  const router = useHistory();
  const reduxDispatch = useDispatch();
  const userAuthState = useSelector((state:any) => state.userAuth.state);
  const userGeoState = useSelector((state:any) => state.userGeo.state);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formData, setFormData] = React.useState<{
    country: string,
    region: string,
    city: string,
    userID: null | number,
    categoryID: null | number,
    adtype: number,
    forsaleby:number,
    title: null | string,
    description: null | string,
    price: number,
    price_value: null | number,
    address: null | string,
    fulfillment: null | string,
    cashless_pay: null | number,
    condition: null | number,
    tags: null | string,
    youtube: null | string,
    websitelink: null | string,
    phonenumber: null | string,
    uploadImages: [] | [{
      img: string,
      thumbnail: string,
      main: boolean,
    }],
  }>({
    country: userGeoState?.country,
    region: userGeoState?.region,
    city: userGeoState?.city,
    userID: null,
    categoryID: null,
    adtype: 1,
    forsaleby: 1,
    title: null,
    description: null,
    price: 1,
    price_value: null,
    address: null,
    fulfillment: [],
    cashless_pay: null,
    condition: null,
    tags: [],
    youtube: null,
    websitelink: null,
    phonenumber: null,
    uploadImages: [],
  });

  // Ref from child components
  const adDetailsSectionRef = React.createRef<any>();
  const locationSectionRef = React.createRef<any>();
  const priceSectionRef = React.createRef<any>();
  const mediaSectionRef = React.createRef<any>();

  React.useEffect(() => {
    if(userAuthState){
      setFormData((previous: any) => ({
        ...previous,
        userID: userAuthState.userID,
      }));
    }
  }, [userAuthState]);
  
  // handle form submit
  const handleSubmit = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    // UserID validation
    if(!formData.userID){
      router.replace({
        pathname: "/login",
        search: `?from=${encodeURIComponent(location.pathname)}`,
      });
      return;
    }

    // categoryID validation
    if(!formData.categoryID){
      reduxDispatch({
        type: "setGlobalNoticeMessage",
        value: {
          'type': 'danger',
          'message': 'Please select the category',
        }
      });
      scrollToTop();
      return;
    }

    // title validation
    formData.title = formData.title?.trim();
    if(!formData.title?.trim()){
      adDetailsSectionRef.current.valid.validTitle(false, "Please input your ad title");
      scrollToTop();
      return;
    }

    if(formData.title && formData.title?.trim().length <= 4){
      adDetailsSectionRef.current.valid.validTitle(false, "Your ad title length is too short");
      scrollToTop();
      return;
    }

    // description validation
    formData.description = formData.description?.trim();
    if(!formData.description?.trim()){
      adDetailsSectionRef.current.valid.validDesc(false, "Please input your ad description");
      scrollToTop();
      return;
    }

    if(formData.description && formData.description?.trim().length <= 10){
      adDetailsSectionRef.current.valid.validDesc(false, "Description must be 10 or more characters");
      scrollToTop();
      return;
    }

    // address validation
    if(!formData.address?.trim()){
      locationSectionRef.current.valid.validAddress(false, "Please enter a valid postal code or street address");
      scrollToEle('addPost_location_address');
      return;
    }

    // price validation
    if(formData.price === 1 || formData.price === 2){
      if(!formData.price_value || formData.price_value === "" || isNaN(formData.price_value) || formData.price_value === "null"){
        priceSectionRef.current.valid.validPrice(false, 'Please enter a price without decimals');
        return;
      }else{
        if(formData.price_value === 0 || formData.price_value === "0"){
          priceSectionRef.current.valid.validPrice(false, 'Price cannot be 0');
          return;
        }else{
          priceSectionRef.current.valid.validPrice(true, '');
        }
      }
    }

    // youtube url validation
    if(formData.youtube && !urlValidation(formData.youtube)){
      mediaSectionRef.current.valid.validYoutubeURL(false);
      scrollToEle('AddImageWrapper');
      return;
    }else{
      mediaSectionRef.current.valid.validYoutubeURL(true);
    }

    // website url validation
    if(formData.websitelink && !urlValidation(formData.websitelink)){
      mediaSectionRef.current.valid.validWebsiteURL(false);
      scrollToEle('AddImageWrapper');
      return;
    }else{
      mediaSectionRef.current.valid.validWebsiteURL(true);
    }

    // escape by using `encodeURIComponent()`
    formData.title = encodeURIComponent(formData.title);
    formData.description = encodeURIComponent(formData.description);
    formData.websitelink = formData.websitelink ? encodeURIComponent(formData.websitelink) : formData.websitelink;
    formData.youtube = formData.youtube ? encodeURIComponent(formData.youtube) : formData.youtube;

    // geo validation
    // LISTLIST-TODO: enable below three comments before launch
    //if(!formData.country){formData.country = "CA";}
    //if(!formData.region){formData.region = "MB";}
    //if(!formData.city){formData.city = "Winnipeg";}

    // submit
    setIsSubmitting(true);
    submitAddPost(formData, (res:any) => {
      if(res.data && res.data.addPost){
        if(res.data.addPost.code === 200){
          // published successfully
          reduxDispatch({
            type: "setGlobalNoticeMessage",
            value: {
              'type': 'success',
              'message': 'You ad has been published successfully!',
            }
          });
          setTimeout(() => {
            router.push(`/post/${parseInt(res.data.addPost.message)}`);
          }, 500);
          return;
        }else if(res.data.addPost.code === 400){
          reduxDispatch({
            type: "setGlobalNoticeMessage",
            value: {
              'type': 'danger',
              'message': 'Sorry, your ad publish failed, please try again later.',
            }
          });
          scrollToTop();
        }else{
          router.replace({
            pathname: "/login",
            search: `?from=${encodeURIComponent(location.pathname)}`,
          });
        }
      }else{
        reduxDispatch({
          type: "setGlobalNoticeMessage",
          value: {
            'type': 'danger',
            'message': 'Sorry, your ad publish failed, please try again later.',
          }
        });
        scrollToTop();
      }
      setIsSubmitting(false);
    });
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
          <Form
            noValidate
            onSubmit={!isSubmitting ? handleSubmit : null}
            className={styles.add_post_form}
          >
            <SectionComponent no={1} title="Ad Details">
              <AdDetailsSection
                callback={setFormData}
                onRef={adDetailsSectionRef}
              />
            </SectionComponent>
            
            <SectionComponent no={2} title="Media">
              <MediaSection
                callback={setFormData}
                onRef={mediaSectionRef}
              />
            </SectionComponent>

            <SectionComponent no={3} title="Location">
              <LocationSection
                callback={setFormData}
                onRef={locationSectionRef}
              />
            </SectionComponent>

            <SectionComponent no={4} title="Price">
              <PriceSection
                callback={setFormData}
                onRef={priceSectionRef}
              />
            </SectionComponent>

            <SectionComponent no={5} title="Contact Information">
              <ContactSection callback={setFormData}/>
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
                disabled={isSubmitting}
              >
                { isSubmitting ?  "Processing..." : "Post Your Ad"}
              </Button>

              <Button
                height="40px"
                width="150px"
                bgColor="#ffffff"
                color="#006bc2"
              >
                Preview {/**LISTLIST-TODO: post preview */}
              </Button>
            </BottomBtnsWrapper>
          </Form>

        </InsideWrapper>
      </AuthorizedWrapper>
    </GrayBgWrapper>
  );
};

export default AddPostPage;

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

const AddPostPage = () => {
  return(
    <GrayBgWrapper>
      <AuthorizedWrapper>
      <Hline marginTop="15px" marginBottom="15px"/>
      <InsideWrapper bgcolor="#000">
        <GlobalNoticeMsg />

        <SectionComponent no={1} title="Ad Details">
          <AdDetailsSection/>
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

      </InsideWrapper>
      </AuthorizedWrapper>
    </GrayBgWrapper>
  );
};

export default AddPostPage;

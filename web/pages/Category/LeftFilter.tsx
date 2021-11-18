import React from "react";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LeftFilterItemWrapper } from "./styled";
import Link from "../../src/components/Link";

const LeftFilterItem = (params:{ title: string, children: any }) => {
  const [visible, setVisible] = React.useState<boolean>(true);
  return(
    <LeftFilterItemWrapper>
      <div
        className="title disableSelect"
        onMouseOver={(e:any) => {
          e.target.style.backgroundColor = "#ebebeb";
        }}
        onMouseOut={(e:any) => {
          e.target.style.backgroundColor = "#f7f7f7";
        }}
        onMouseDown={(e:any) => {
          e.target.style.backgroundColor = "#d3d3d3";
        }}
        onMouseUp={(e:any) => {
          e.target.style.backgroundColor = "#f7f7f7";
        }}
        onClick={() => {
          setVisible(!visible);
        }}
      >
        <span>{ params.title }</span>
        <span>
          <FontAwesomeIcon icon={visible ? "chevron-up" : "chevron-down"}/>
        </span>
      </div>
      <div
        className="content"
        style={{ display: visible ? 'block' : 'none'}}
      >{ params.children }</div>
    </LeftFilterItemWrapper>
  );
};

const LeftFilter = () => {
  return(
    <>
      <LeftFilterItem title="Offer Type">
        <Form.Check
          type="radio"
          label="Offering"
          name="leftFilterOfferType"
          id="leftFilterOfferType_Offer"
        />
        <Form.Check
          type="radio"
          label="Wanted"
          name="leftFilterOfferType"
          id="leftFilterOfferType_Wanted"
        />
      </LeftFilterItem>

      <LeftFilterItem title="Payment">
        <Form.Check
          type="checkbox"
          label="Cashless payment"
          name="leftFilterPayment"
          id="leftFilterPayment_1"
        />
      </LeftFilterItem>

      <LeftFilterItem title="Fulfillment">
        <Form.Check
          type="checkbox"
          label="Willing to drop-off / deliver"
          name="leftFilterFulfillment"
          id="leftFilterFulfillment_1"
        />
        <Form.Check
          type="checkbox"
          label="Willing to ship the item"
          name="leftFilterFulfillment"
          id="leftFilterFulfillment_2"
        />
        <Form.Check
          type="checkbox"
          label="Offer curbside pick up"
          name="leftFilterFulfillment"
          id="leftFilterFulfillment_3"
        />
      </LeftFilterItem>
    </>
  );
};

export default LeftFilter;

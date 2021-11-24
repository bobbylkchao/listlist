import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByPlaceId } from 'react-google-places-autocomplete';

// listlist
import webConfig from '../../../src/web.config';
import styles from '../styles.module.scss';
import Link from '../../../src/components/Link';
import { regexAddress } from '../../../src/utils';
import {
  LocationSectionWrapper,
  InsideLeft,
  InsideRight,
  MapShow,
  RemarkWrapper,
  OrSpan,
} from '../../../src/styled/LocationSectionStyled';

// callback
const addressCallback = (value: string, params: {callback: (res: any) => void}) => {
  params.callback((previousData:any) => ({
    ...previousData,
    address: value ? value : null,
  }));
};

const latLngCallback = (lat: number | null, long: number | null, params: {callback: (res: any) => void}) => {
  params.callback((previousData:any) => ({
    ...previousData,
    lat: lat,
    long: long
  }));
};

const regionCityCallback = (city: string, region: string, params: {callback: (res: any) => void}) => {
  if(region && city){
    params.callback((previousData:any) => ({
      ...previousData,
      city: city,
      region: region
    }));
  }
};

const LocationSection = (params: {onRef: any, callback: (res: any) => void}) => {
  const geoState = useSelector((state:any) => state.userGeo.state);
  const [showGoogleInput, setShowGoogleInput] = React.useState<boolean>(false);
  const [valid, setValid] = React.useState<{
    status: boolean,
    message: string,
  }>({
    status: true,
    message: '',
  });
  const [address, setAddress] = React.useState<string | null>(null);
  const [googleMapInputValue, setGoogleMapInputValue] = React.useState<string | null>(null);
  const [adPostedInCity, setAdPostedInCity] = React.useState<string | null>(null);

  React.useEffect(() => {
    if(geoState){
      if(geoState.city && geoState.zipcode){
        setAdPostedInCity(geoState.city);
        setAddress(`${geoState.city}, ${geoState.zipcode}`);
        setGoogleMapInputValue(`${geoState.city}, ${geoState.zipcode}`);
        addressCallback(`${geoState.city}, ${geoState.zipcode}`, params);
      }
    }
  }, [geoState]);

  // create interfaces to main form component to set validation via ref
  React.useImperativeHandle(params.onRef, () => {
    return{
      valid: {
        validAddress: (valid: boolean, message?: string) => {
          setValid({
            status: valid,
            message: message ?? '',
          });
        },
      }
    }
  });

  const StaticAddressShow = () => {
    return address ? (
      <div className={styles.locationStaticAddress}>
        <span>{ address }</span>
        <Link onClick={() => {
          setShowGoogleInput(true);
          setGoogleMapInputValue(address);
          setValid({status: false, message: ''});
        }}>Change</Link>
      </div>
    ) : null;
  };

  const AdPostedInShow = () => {
    return adPostedInCity ? (
      <div className={styles.adPostedInShow}>
        <div>
          <FontAwesomeIcon
            icon="map-marker-alt"
            style={{color: 'rgb(223, 223, 223)'}}
          />
        </div>
        <div>
          <div>Your ad will be posted in</div>
          <div>{ adPostedInCity }</div>
        </div>
      </div>
    ) : null;
  };

  const NotCityPostedInQuestion = () => {
    return(
      <div className={styles.notCityPostedInQuestion}>
        <span>Not the city you want to post in?</span>
        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Try changing your postal code or address to within your desired city.</Tooltip>}>
          <FontAwesomeIcon icon="question-circle"/>
        </OverlayTrigger>
      </div>
    );
  };

  const GoogleMapInput = () => {
    return(
      <div className={styles.googleMapInputWrapper}>
        <div><span>Postal code or street address</span></div>
        <GooglePlacesAutocomplete
          apiKey={webConfig.googleMapsJavaScriptAPIKey}
          selectProps={{
            defaultInputValue: googleMapInputValue,
            placeholder: '',
            isClearable: true,
            onChange: (e:any) => {
              if(e && e.value.description){
                setGoogleMapInputValue(e.value.description);
                setAddress(e.value.description);
                addressCallback(e.value.description, params);

                // check the city and region
                if(e.value.description.split(',').length >= 3){
                  let region = e.value.description.split(',')[e.value.description.split(',').length-2];
                  let city = e.value.description.split(',')[e.value.description.split(',').length-3];
                  setAdPostedInCity(city);
                  regionCityCallback(city, region, params);
                }
                
                // get geocode infos
                geocodeByPlaceId(e.value.place_id)
                .then((res:any) => {
                  if(res && res[0] && res[0].geometry.location){
                    latLngCallback(
                      res[0].geometry.location.lat(),
                      res[0].geometry.location.lng(),
                      params
                    );
                  }
                });
              }
            },
            onBlur: (e:any) => {
              if(e.target.value){
                setAddress(e.target.value);
                addressCallback(e.target.value, params);
              }else{
                setGoogleMapInputValue(null);
                setValid({
                  status: false,
                  message: 'Please enter a valid postal code or street address'
                });
              }
            }
          }}
          autocompletionRequest={{
            componentRestrictions: {country: ['ca']}
          }}
        />
        <Form.Control.Feedback
          style={{display: 'block'}}
          type="invalid"
        >{ valid.message }</Form.Control.Feedback>
        <div>
          <Link onClick={() => setShowGoogleInput(false)}>Close</Link>
        </div>
      </div>
    );
  };

  return(
    <LocationSectionWrapper>
      <InsideLeft>
        {
          showGoogleInput
          ? 
          <GoogleMapInput/>
          :
          <>
            <StaticAddressShow/>
            <AdPostedInShow/>
            <NotCityPostedInQuestion/>
          </>
        }
      </InsideLeft>
      <InsideRight>
        <MapShow>Google Map will be here</MapShow>
      </InsideRight>
    </LocationSectionWrapper>
  );
};

export default LocationSection;

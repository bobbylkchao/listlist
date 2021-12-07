import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import Image from 'next/image';

// google map related
import GooglePlacesAutocomplete, { geocodeByPlaceId } from 'react-google-places-autocomplete';

// listlist
import webConfig from '../../src/web.config';
import styles from './styles.module.scss';
import Link from '../../src/components/Link';
import Button from '../../src/components/Button';
//import googleMapPlaceholder from '../../../src/assets/images/googleMapPlaceholder.png';
import { regexAddress } from '../../src/utils';
import {
  LocationSectionWrapper,
  InsideLeft,
  InsideRight,
  MapShow,
  RemarkWrapper,
  OrSpan,
  GoogleMapPlaceholderWrapper,
} from '../../src/styled/LocationSectionStyled';
import ListListGoogleMap from '../../src/components/ListListGoogleMap';
import {
  addressCallback,
  latLngCallback,
  regionCityCallback,
  exactAddressCallback,
} from '../../src/utils/callbacks/LocationSectionCallback';

const LocationSection = (params: {onRef: any, callback: (res: any) => void}) => {
  // get geo state from redux
  const geoState = useSelector((state:any) => state.userGeo.state);

  // hook to store google autocomplete input visible
  const [showGoogleInput, setShowGoogleInput] = React.useState<boolean>(false);

  // hook to store input validation
  const [valid, setValid] = React.useState<{ status: boolean,message: string }>({ status: true,message: '' });

  // hook to store address that been selected
  const [address, setAddress] = React.useState<string | null>(null);

  // hook to store google autocomplete input value
  const [googleMapInputValue, setGoogleMapInputValue] = React.useState<string | null>(null);

  // hook to store which city this post will be posted at
  const [adPostedInCity, setAdPostedInCity] = React.useState<string | null>(null);

  // hook to store `exactLocation` checkbox checked status
  const [exactLocationChecked, setExactLocationChecked] = React.useState<boolean>(false);

  // hook to store lat and long of current selected address
  const [latAndLong, setLatAndLong] = React.useState<{lat: number, long: number}>({lat: 0, long: 0});

  React.useEffect(() => {
    if(geoState){
      if(geoState.city && geoState.zipcode){
        setAdPostedInCity(geoState.city);
        setAddress(`${geoState.city}, ${geoState.zipcode}`);
        setGoogleMapInputValue(`${geoState.city}, ${geoState.zipcode}`);
        addressCallback(`${geoState.city}, ${geoState.zipcode}`, params);
        setLatAndLong({lat: geoState.lat, long: geoState.long});
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
                    setLatAndLong({
                      lat: res[0].geometry.location.lat(),
                      long: res[0].geometry.location.lng(),
                    });
                  }
                });
              }
            },
            onBlur: () => { return; }
          }}
          autocompletionRequest={{
            componentRestrictions: {country: ['ca']}
          }}
          onLoadFailed={(error: any) => console.log(error)}
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

  const ShowMyExactLocation = () => {
    return(
      <Form.Check
        type="checkbox"
        label="Show my exact location"
        name="addPost_showmyexact_location"
        id="addPost_showmyexact_location"
        style={{marginTop: 15}}
        value={1}
        checked={exactLocationChecked}
        onChange={(e:any) => {
          setExactLocationChecked(e.target.checked);
          exactAddressCallback(e.target.checked, params);
        }}
      />
    );
  };

  /*const GoogleMapPlaceholder = () => {
    return(
      <GoogleMapPlaceholderWrapper>
        <Button>Preview Map</Button>
        <Image
          src={googleMapPlaceholder}
          alt="Show Map"
          placeholder="blur"
          blurDataURL={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAALCAYAAABGbhwYAAABQGlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSCwoyGFhYGDIzSspCnJ3UoiIjFJgf8rAzSAJxBIMbInJxQWOAQE+QCUMMBoVfLvGwAiiL+uCzHq2dGXMVsXV87W2vpaY5qqjh6keBXClpBYnA+k/QJyUXFBUwsDAmABkK5eXFIDYLUC2SBHQUUD2DBA7HcJeA2InQdgHwGpCgpyB7CtAtkByRmIKkP0EyNZJQhJPR2JD7QUBDmdjIzdjS0MCTiUdlKRWlIBo5/yCyqLM9IwSBUdgCKUqeOYl6+koGBkYAa0EhTdE9ecb4HBkFONAiOWfZGCwZGdgYG5AiCWZMDBsd2BgkGhHiKncZGDg3wkUVytILEqEO4DJ2Lg4zdgIzGbk3s7AwDrt///P4QwM7JoMDH+v////e/v//3+XAc2/xcBw4BsAZ8xdKoA3UjkAAAA4ZVhJZk1NACoAAAAIAAGHaQAEAAAAAQAAABoAAAAAAAKgAgAEAAAAAQAAAAqgAwAEAAAAAQAAAAsAAAAAJdCzfwAAAB1JREFUGBlj/PTt138GIgATEWrASkYV4g0p6gcPAOEZA/cBXPsnAAAAAElFTkSuQmCC`}
          width={390}
          height={256}
        />
      </GoogleMapPlaceholderWrapper>
    );
  };*/

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
            <ShowMyExactLocation/>
            <AdPostedInShow/>
            <NotCityPostedInQuestion/>
          </>
        }
      </InsideLeft>
      <InsideRight>
        <MapShow>
          <ListListGoogleMap
            showExactLocation={exactLocationChecked}
            lat={latAndLong.lat}
            lng={latAndLong.long}
            style={{
              width: 390,
              height: 256
            }}
          />
        </MapShow>
      </InsideRight>
    </LocationSectionWrapper>
  );
};

export default LocationSection;
